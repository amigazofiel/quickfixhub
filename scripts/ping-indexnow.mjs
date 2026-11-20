/**
 * IndexNow Instant Indexing Ping (Bing, DuckDuckGo, Yahoo, Yandex)
 * Notifies search engines immediately whenever a new troubleshooting guide goes live.
 */

import fs from "fs";
import path from "path";

const HOST = "thequickfixhub.vercel.app";
const SITE_URL = `https://${HOST}`;
const INDEXNOW_KEY = "7f3c9b2e4d8a1f6c5e0b9a2d4f8e1c3a";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function getArticleUrls(mode = "latest") {
  if (!fs.existsSync(ARTICLES_DIR)) return [SITE_URL];

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const fullPath = path.join(ARTICLES_DIR, f);
      return {
        slug: f.replace(/\.md$/, ""),
        mtime: fs.statSync(fullPath).mtimeMs,
      };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (mode === "all") {
    return [
      SITE_URL,
      `${SITE_URL}/category/windows`,
      `${SITE_URL}/category/macos`,
      `${SITE_URL}/category/ios`,
      `${SITE_URL}/category/android`,
      `${SITE_URL}/category/apps`,
      ...files.map((f) => `${SITE_URL}/fix/${f.slug}`),
    ];
  }

  // Default: latest 2 articles + homepage
  return [
    SITE_URL,
    ...files.slice(0, 2).map((f) => `${SITE_URL}/fix/${f.slug}`),
  ];
}

async function pingIndexNow() {
  const mode = process.argv.includes("--all") ? "all" : "latest";
  const urlList = getArticleUrls(mode);

  console.log(`📡 Sending IndexNow ping (${mode}) for ${urlList.length} URL(s)...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow accepted! HTTP ${res.status} (${urlList.length} URLs submitted to Bing/DuckDuckGo/Yahoo).`);
    } else {
      const text = await res.text();
      console.warn(`⚠️ IndexNow returned HTTP ${res.status}: ${text}`);
    }
  } catch (err) {
    console.warn(`⚠️ IndexNow ping failed (non-blocking): ${err.message}`);
  }
}

pingIndexNow();
