"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, Terminal, Sparkles, X } from "lucide-react";
import { Article } from "@/lib/articles";
import { SITE_CONFIG, getCategoryMeta } from "@/lib/site-config";

interface ArticleExplorerProps {
  articles: Article[];
  initialCategory?: string;
}

export default function ArticleExplorer({
  articles,
  initialCategory = "all",
}: ArticleExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" ||
        article.categorySlug.toLowerCase() === selectedCategory.toLowerCase();

      if (!query.trim()) return matchesCategory;

      const q = query.toLowerCase();
      const inTitle = article.title.toLowerCase().includes(q);
      const inDesc = article.description.toLowerCase().includes(q);
      const inError = article.errorCode?.toLowerCase().includes(q) || false;
      const inTags = article.tags.some((t) => t.toLowerCase().includes(q));
      const inCommand = article.quickFix.command?.toLowerCase().includes(q) || false;

      return matchesCategory && (inTitle || inDesc || inError || inTags || inCommand);
    });
  }, [articles, query, selectedCategory]);

  return (
    <section id="search-fixes" className="scroll-mt-24">
      {/* Search & Category Filter Glass Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-8 border border-white/15">
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by error code (e.g., DNS_PROBE_FINISHED_NXDOMAIN, 0x80070005), OS, or app..."
            aria-label="Search troubleshooting guides"
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-slate-950/85 border border-white/15 text-slate-100 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
              selectedCategory === "all"
                ? "bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                : "bg-slate-950/60 text-slate-300 border-white/10 hover:text-white hover:border-white/25"
            }`}
          >
            All Platforms ({articles.length})
          </button>

          {SITE_CONFIG.categories.map((cat) => {
            const count = articles.filter(
              (a) => a.categorySlug.toLowerCase() === cat.slug
            ).length;
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                  active
                    ? "bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-sm shadow-cyan-500/20"
                    : "bg-slate-950/60 text-slate-300 border-white/10 hover:text-white hover:border-white/25"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      {filteredArticles.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            No matching error guide found for &ldquo;{query}&rdquo;
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Try searching a shorter keyword (like &ldquo;DNS&rdquo;, &ldquo;Wi-Fi&rdquo;, &ldquo;Discord&rdquo;, or &ldquo;Windows 11&rdquo;).
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const catMeta = getCategoryMeta(article.categorySlug);
            return (
              <Link
                key={article.slug}
                href={`/fix/${article.slug}`}
                className="glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r border ${catMeta.badgeColor}`}
                    >
                      {article.category}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {article.readTime}
                    </span>
                  </div>

                  {article.errorCode && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/90 border border-amber-400/30 font-mono text-[11px] text-amber-300">
                        <Terminal className="w-3 h-3" />
                        {article.errorCode}
                      </span>
                    </div>
                  )}

                  <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug mb-2.5">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {article.quickFix.summary || article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-mono">
                    {article.osVersion}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-cyan-300 group-hover:translate-x-1 transition-transform">
                    View Quick Fix
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
