/**
 * QuickFixHub - 100% Autopilot Article Generator (Google Gemini 2.5 Flash)
 * Runs via GitHub Actions cron or manual trigger (`npm run generate:article`).
 *
 * INTELLIGENT EDITORIAL PIPELINE:
 * 1. Checks if a real user submitted an error report via /contact that has
 *    matured (e.g. >= 72 hours / 3 days ago).
 *    If YES: Sacrifices 1 daily publication slot to answer this real user's
 *    exact problem, publishes the article, and closes the GitHub issue.
 * 2. If NO matured user requests exist: Continues with the high-intent
 *    trending queue or asks Gemini for a fresh US tech troubleshooting topic.
 */

import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || "amigazofiel/quickfixhub";
const MATURATION_HOURS = parseInt(process.env.USER_REQUEST_MATURATION_HOURS || "72", 10);
const MODEL_NAME = "gemini-2.5-flash";
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const QUEUE_PATH = path.join(process.cwd(), "content", "topics-queue.json");

if (!GEMINI_API_KEY) {
  console.error(
    "❌ ERROR: GEMINI_API_KEY environment variable is missing. Add it in GitHub -> Settings -> Secrets and variables -> Actions."
  );
  process.exit(1);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 75);
}

function mapCategory(osString = "") {
  const s = osString.toLowerCase();
  if (s.includes("mac") || s.includes("apple silicon")) return "macOS";
  if (s.includes("ios") || s.includes("iphone") || s.includes("ipad")) return "iOS";
  if (s.includes("android") || s.includes("samsung") || s.includes("pixel")) return "Android";
  if (s.includes("app") || s.includes("software") || s.includes("chrome") || s.includes("discord") || s.includes("steam")) return "Apps & Software";
  return "Windows";
}

function getExistingSlugs() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    return new Set();
  }
  return new Set(
    fs
      .readdirSync(ARTICLES_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""))
  );
}

async function callGeminiJson(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(rawText);
}

/**
 * Checks for user-submitted issues that have reached maturity (e.g. >= 72 hours).
 */
async function checkForMaturedUserRequest(existingSlugs) {
  if (!GITHUB_TOKEN) {
    return null;
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues?state=open&labels=user-request&sort=created&direction=asc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "QuickFixHub-Engine",
      },
    });

    if (!res.ok) {
      console.warn(`Could not check GitHub issues (${res.status}). Skipping user queue.`);
      return null;
    }

    const issues = await res.json();
    if (!Array.isArray(issues) || issues.length === 0) {
      return null;
    }

    for (const issue of issues) {
      const createdAt = new Date(issue.created_at).getTime();
      const hoursOld = (Date.now() - createdAt) / (1000 * 60 * 60);

      // Check if this user request has matured (e.g. >= 3 days)
      if (hoursOld >= MATURATION_HOURS) {
        console.log(
          `🎯 Found MATURED user-submitted issue #${issue.number} (submitted ${hoursOld.toFixed(1)} hours ago). Prioritizing for publication!`
        );

        // Parse issue body metadata comment if present
        let parsed = {
          os: "Windows",
          app: "",
          errorCode: "",
          description: "",
        };

        const metadataMatch = issue.body?.match(/<!-- METADATA\s*([\s\S]*?)\s*-->/);
        if (metadataMatch && metadataMatch[1]) {
          try {
            parsed = JSON.parse(metadataMatch[1]);
          } catch (e) {
            console.warn("Could not parse issue metadata json, falling back to regex.");
          }
        }

        const category = mapCategory(parsed.os);
        const errorOrApp = parsed.errorCode || parsed.app || "System Error";
        let slug = slugify(`fix-${errorOrApp}-${parsed.os}`);
        if (existingSlugs.has(slug)) {
          slug = `${slug}-${issue.number}`;
        }

        return {
          isUserRequest: true,
          issueNumber: issue.number,
          hoursOld,
          topicItem: {
            slug,
            topic: `How to Fix ${errorOrApp} on ${parsed.os}`,
            category,
            errorCode: parsed.errorCode || errorOrApp,
            osVersion: parsed.os,
            userDescription: parsed.description,
          },
        };
      } else {
        console.log(
          `⏳ User-submitted issue #${issue.number} is ${hoursOld.toFixed(1)}h old (waiting to reach ${MATURATION_HOURS}h maturity).`
        );
      }
    }

    return null;
  } catch (err) {
    console.warn("Error checking for user requests:", err.message);
    return null;
  }
}

async function pickOrGenerateTopic(existingSlugs) {
  // 1. First priority: Matured user request from /contact
  const userRequest = await checkForMaturedUserRequest(existingSlugs);
  if (userRequest) {
    return {
      topicItem: userRequest.topicItem,
      queue: [],
      isUserRequest: true,
      issueNumber: userRequest.issueNumber,
      hoursOld: userRequest.hoursOld,
    };
  }

  // 2. Second priority: Pre-curated queue
  let queue = [];
  if (fs.existsSync(QUEUE_PATH)) {
    queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  }

  const nextItem = queue.find(
    (item) => !item.published && !existingSlugs.has(item.slug)
  );

  if (nextItem) {
    return { topicItem: nextItem, queue, isUserRequest: false };
  }

  // 3. Third priority: Infinite AI generation
  console.log("Queue exhausted! Asking Gemini 2.5 Flash for a fresh US Tech Troubleshooting topic...");
  const existingList = Array.from(existingSlugs).slice(-40).join(", ");
  const topicPrompt = `You are a Principal SEO Strategist for a US tech troubleshooting website ("QuickFixHub").
Suggest ONE high-search-volume, specific everyday software or OS error topic in US English that users frequently search on Google (Windows 11, macOS, iOS, Android, or popular apps like Chrome, Discord, Steam, Outlook, Zoom, Wi-Fi).
Do NOT repeat any of these existing slugs: ${existingList}

Return ONLY a JSON object with this exact shape:
{
  "slug": "fix-example-error-windows-11",
  "topic": "How to Fix [Specific Error] on [Platform]",
  "category": "Windows" | "macOS" | "iOS" | "Android" | "Apps & Software",
  "errorCode": "Exact Error Code or Short Error Name",
  "osVersion": "e.g., Windows 11/10 or iOS 18"
}`;

  const generatedTopic = await callGeminiJson(topicPrompt);
  generatedTopic.slug = slugify(generatedTopic.slug || generatedTopic.topic);
  generatedTopic.published = false;
  queue.push(generatedTopic);
  return { topicItem: generatedTopic, queue, isUserRequest: false };
}

function buildMarkdownFile(articleData, todayStr) {
  const safeString = (val) => JSON.stringify(String(val || "").trim());

  const tagsYaml = (articleData.tags || ["Troubleshooting", articleData.category])
    .map((t) => safeString(t))
    .join(", ");

  const stepsYaml = (articleData.quickFix?.steps || [])
    .map((s) => `    - ${safeString(s)}`)
    .join("\n");

  const faqsYaml = (articleData.faqs || [])
    .map(
      (f) =>
        `  - question: ${safeString(f.question)}\n    answer: ${safeString(f.answer)}`
    )
    .join("\n");

  return `---
title: ${safeString(articleData.title)}
description: ${safeString(articleData.description)}
date: "${todayStr}"
updatedAt: "${todayStr}"
category: ${safeString(articleData.category)}
tags: [${tagsYaml}]
errorCode: ${safeString(articleData.errorCode)}
osVersion: ${safeString(articleData.osVersion)}
readTime: ${safeString(articleData.readTime || "3 min read")}
difficulty: ${safeString(articleData.difficulty || "Easy")}
quickFix:
  summary: ${safeString(articleData.quickFix?.summary)}
  steps:
${stepsYaml}
  command: ${safeString(articleData.quickFix?.command || "")}
  commandLabel: ${safeString(articleData.quickFix?.commandLabel || "Quick Terminal / CMD Fix")}
faqs:
${faqsYaml}
---

${String(articleData.markdownBody || "").trim()}
`;
}

async function closeFulfilledIssue(issueNumber, slug) {
  if (!GITHUB_TOKEN || !issueNumber) return;

  try {
    const articleUrl = `https://thequickfixhub.vercel.app/fix/${slug}`;

    // 1. Post fulfillment comment
    await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issueNumber}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "QuickFixHub-Engine",
        },
        body: JSON.stringify({
          body: `### ✅ Guide Published & Resolved!\nOur technical engineering pipeline has investigated this issue and published the official 60-second troubleshooting guide:\n👉 **[Read Guide: ${articleUrl}](${articleUrl})**\n\n*Closing this request as completed.*`,
        }),
      }
    );

    // 2. Close issue
    await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${issueNumber}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "QuickFixHub-Engine",
        },
        body: JSON.stringify({
          state: "closed",
          state_reason: "completed",
        }),
      }
    );

    console.log(`✅ Closed user request issue #${issueNumber} with published article link.`);
  } catch (err) {
    console.warn(`Failed to close issue #${issueNumber}:`, err.message);
  }
}

async function main() {
  const existingSlugs = getExistingSlugs();
  const { topicItem, queue, isUserRequest, issueNumber } = await pickOrGenerateTopic(existingSlugs);

  console.log(`🚀 Generating article for: "${topicItem.topic}" (${topicItem.slug})...`);
  if (isUserRequest) {
    console.log(`📋 This article directly addresses user-submitted issue #${issueNumber}!`);
  }

  const userContextPrompt = topicItem.userDescription
    ? `\nIMPORTANT: A real user submitted this exact issue report: "${topicItem.userDescription}". Make sure Method 1 directly addresses these reported symptoms.`
    : "";

  const articlePrompt = `You are a Principal Systems Engineer and Technical SEO Writer for QuickFixHub, writing for a United States audience in crisp, authoritative US English.
Write a complete, zero-fluff troubleshooting guide for:
Topic: "${topicItem.topic}"
Category: "${topicItem.category}"
Error Code: "${topicItem.errorCode}"
Target OS: "${topicItem.osVersion}"${userContextPrompt}

STRICT EDITORIAL RULES:
1. ZERO FLUFF: Do NOT write generic filler introductions ("We all know how frustrating it is when..."). Jump straight into exact technical causes and actionable steps.
2. QUICK FIX BOX: Provide a 2-sentence root-cause summary, 3 ultra-clear bullet steps, and (if applicable to the OS) a ready-to-copy one-line PowerShell, CMD, or macOS Terminal repair command.
3. MARKDOWN BODY ("markdownBody" field):
   - Organize into 3 to 4 numbered methods using "## Method 1: ...", "## Method 2: ...", "## Method 3: ...", "## Method 4: ...".
   - Use numbered lists (1., 2., 3.) with bold UI click paths (e.g., **Settings > Network & Internet > Wi-Fi**).
   - Include fenced code blocks (\`\`\`bat, \`\`\`powershell, \`\`\`bash, or \`\`\`text) with real, safe, verified commands ready to copy.
   - Do NOT repeat the title (# H1) or the FAQ section inside markdownBody (FAQs are rendered separately from the JSON faqs array).
4. SEO FAQs: Provide 4 specific, high-intent questions and direct answers optimized for Google Featured Snippets.

Return ONLY a valid JSON object matching this exact schema:
{
  "title": "60-70 char SEO title starting with How to Fix...",
  "description": "145-158 char high-CTR meta description in US English",
  "category": "${topicItem.category}",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "errorCode": "${topicItem.errorCode}",
  "osVersion": "${topicItem.osVersion}",
  "readTime": "3 min read",
  "difficulty": "Easy",
  "quickFix": {
    "summary": "Direct 2-sentence explanation of why the error occurs and what fixes it fastest.",
    "steps": [
      "Step 1 summary...",
      "Step 2 summary...",
      "Step 3 summary..."
    ],
    "command": "Optional 1-line terminal/cmd command (or empty string if mobile-only)",
    "commandLabel": "Short label for the command e.g. Windows Admin CMD: Reset Network"
  },
  "faqs": [
    {
      "question": "Question 1?",
      "answer": "Direct, factual answer."
    }
  ],
  "markdownBody": "## Method 1: ...\\n\\n1. Step one...\\n\\n\`\`\`bat\\ncommand\\n\`\`\`\\n\\n## Method 2: ..."
}`;

  const articleData = await callGeminiJson(articlePrompt);
  const todayStr = new Date().toISOString().slice(0, 10);
  const markdownContent = buildMarkdownFile(articleData, todayStr);

  const outputPath = path.join(ARTICLES_DIR, `${topicItem.slug}.md`);
  fs.writeFileSync(outputPath, markdownContent, "utf8");
  console.log(`✅ Saved new article: content/articles/${topicItem.slug}.md`);

  if (isUserRequest && issueNumber) {
    // Fulfill and close GitHub issue
    await closeFulfilledIssue(issueNumber, topicItem.slug);
  } else if (Array.isArray(queue) && queue.length > 0) {
    // Mark topic as published in queue
    const queueIndex = queue.findIndex((q) => q.slug === topicItem.slug);
    if (queueIndex !== -1) {
      queue[queueIndex].published = true;
      queue[queueIndex].publishedAt = todayStr;
      fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");
      console.log(`✅ Updated content/topics-queue.json`);
    }
  }
}

main().catch((err) => {
  console.error("❌ Article generation failed:", err);
  process.exit(1);
});
