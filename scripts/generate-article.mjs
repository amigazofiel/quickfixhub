/**
 * QuickFixHub - 100% Autopilot Article Generator (Google Gemini 2.5 Flash)
 * Runs via GitHub Actions cron or manual trigger (`npm run generate:article`).
 * Zero external dependencies required: uses native Node.js fetch & fs.
 */

import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
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

async function pickOrGenerateTopic(existingSlugs) {
  let queue = [];
  if (fs.existsSync(QUEUE_PATH)) {
    queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  }

  const nextItem = queue.find(
    (item) => !item.published && !existingSlugs.has(item.slug)
  );

  if (nextItem) {
    return { topicItem: nextItem, queue };
  }

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
  return { topicItem: generatedTopic, queue };
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

async function main() {
  const existingSlugs = getExistingSlugs();
  const { topicItem, queue } = await pickOrGenerateTopic(existingSlugs);

  console.log(`🚀 Generating article for: "${topicItem.topic}" (${topicItem.slug})...`);

  const articlePrompt = `You are a Principal Systems Engineer and Technical SEO Writer for QuickFixHub, writing for a United States audience in crisp, authoritative US English.
Write a complete, zero-fluff troubleshooting guide for:
Topic: "${topicItem.topic}"
Category: "${topicItem.category}"
Error Code: "${topicItem.errorCode}"
Target OS: "${topicItem.osVersion}"

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

  // Mark topic as published in queue
  const queueIndex = queue.findIndex((q) => q.slug === topicItem.slug);
  if (queueIndex !== -1) {
    queue[queueIndex].published = true;
    queue[queueIndex].publishedAt = todayStr;
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");
    console.log(`✅ Updated content/topics-queue.json`);
  }
}

main().catch((err) => {
  console.error("❌ Article generation failed:", err);
  process.exit(1);
});
