import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { getCategoryMeta } from "./site-config";

export interface QuickFixData {
  summary: string;
  steps: string[];
  command?: string;
  commandLabel?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  category: string;
  categorySlug: string;
  tags: string[];
  errorCode?: string;
  osVersion: string;
  readTime: string;
  difficulty: "Easy" | "Medium" | "Advanced" | string;
  quickFix: QuickFixData;
  faqs: FaqItem[];
  content: string;
  htmlContent: string;
  headings: TocHeading[];
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarkdownWithEnhancements(markdown: string): {
  html: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    const id = slugifyHeading(cleanText);
    if (depth === 2 || depth === 3) {
      headings.push({ id, text: cleanText, level: depth });
    }
    const tag = `h${depth}`;
    return `<${tag} id="${id}" class="scroll-mt-28 group relative">${text}</${tag}>`;
  };

  renderer.code = ({ text, lang }) => {
    const languageLabel = (lang || "terminal").toUpperCase();
    const encodedCommand = encodeURIComponent(text.trim());
    return `
      <div class="code-glass-block my-5 rounded-xl overflow-hidden border border-cyan-500/25 bg-slate-950/90 shadow-lg">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-white/10 text-xs font-mono text-slate-300">
          <span class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>${escapeHtml(languageLabel)}</span>
          </span>
          <button
            type="button"
            data-copy-code="${encodedCommand}"
            class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 transition cursor-pointer font-sans font-medium text-xs"
            aria-label="Copy command to clipboard"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span class="copy-btn-text">Copy Command</span>
          </button>
        </div>
        <pre class="p-4 overflow-x-auto text-sm font-mono text-cyan-100 leading-relaxed"><code>${escapeHtml(text.trim())}</code></pre>
      </div>
    `;
  };

  const html = marked.parse(markdown, {
    renderer,
    gfm: true,
    breaks: false,
  }) as string;

  return { html, headings };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"));

  const articles = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getArticleBySlug(slug);
    })
    .filter((a): a is Article => a !== null);

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(ARTICLES_DIR, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const catMeta = getCategoryMeta(data.category || "Windows");
    const { html, headings } = renderMarkdownWithEnhancements(content);

    const quickFix: QuickFixData = {
      summary:
        data.quickFix?.summary ||
        data.description ||
        "Follow the verified steps below to resolve this issue immediately.",
      steps: Array.isArray(data.quickFix?.steps)
        ? data.quickFix.steps
        : [
            "Restart the affected application or system service with elevated privileges.",
            "Run the diagnostic command below or reset the cached configuration.",
            "Verify your system update status and apply the permanent registry/settings fix.",
          ],
      command: data.quickFix?.command || undefined,
      commandLabel: data.quickFix?.commandLabel || "Quick Terminal / CMD Fix",
    };

    const faqs: FaqItem[] = Array.isArray(data.faqs)
      ? data.faqs.filter((f: FaqItem) => f && f.question && f.answer)
      : [];

    return {
      slug,
      title: data.title || slug.replace(/-/g, " "),
      description:
        data.description ||
        `Step-by-step guide to fix ${ data.title || slug } quickly on ${catMeta.name}.`,
      date: data.date ? String(data.date).slice(0, 10) : "2026-11-07",
      updatedAt: data.updatedAt
        ? String(data.updatedAt).slice(0, 10)
        : data.date
        ? String(data.date).slice(0, 10)
        : "2026-11-07",
      category: catMeta.name,
      categorySlug: catMeta.slug,
      tags: Array.isArray(data.tags) ? data.tags : [catMeta.name, "Troubleshooting"],
      errorCode: data.errorCode || undefined,
      osVersion: data.osVersion || `${catMeta.name} (Latest Versions)`,
      readTime: data.readTime || "3 min read",
      difficulty: data.difficulty || "Easy",
      quickFix,
      faqs,
      content,
      htmlContent: html,
      headings,
    };
  } catch (error) {
    console.error(`Error parsing article ${slug}:`, error);
    return null;
  }
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const all = getAllArticles();
  return all.filter(
    (article) => article.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}
