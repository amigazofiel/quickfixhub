import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Cpu,
  ChevronRight,
  CheckCircle2,
  ListChecks,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { SITE_CONFIG, getCategoryMeta } from "@/lib/site-config";
import QuickFixBox from "@/components/QuickFixBox";
import ArticleBody from "@/components/ArticleBody";
import FaqAccordion from "@/components/FaqAccordion";
import HelpfulFeedback from "@/components/HelpfulFeedback";
import MonetagAdSlot from "@/components/MonetagAdSlot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Fix Not Found" };
  }

  const canonicalUrl = `${SITE_CONFIG.url}/fix/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: [
      ...article.tags,
      article.category,
      article.errorCode || "",
      "how to fix",
      "troubleshooting guide",
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const catMeta = getCategoryMeta(article.categorySlug);
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aSameCat = a.categorySlug === article.categorySlug ? 1 : 0;
      const bSameCat = b.categorySlug === article.categorySlug ? 1 : 0;
      return bSameCat - aSameCat;
    })
    .slice(0, 4);

  const canonicalUrl = `${SITE_CONFIG.url}/fix/${article.slug}`;

  // Google Rich Snippets: TechArticle + FAQPage + BreadcrumbList
  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    proficiencyLevel: article.difficulty,
    dependencies: article.osVersion,
  };

  const faqJsonLd =
    article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category,
        item: `${SITE_CONFIG.url}/category/${article.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-300 mb-6"
      >
        <Link href="/" className="hover:text-cyan-300 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <Link
          href={`/category/${article.categorySlug}`}
          className="hover:text-cyan-300 transition"
        >
          {article.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-100 font-medium line-clamp-1">
          {article.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Article Column */}
        <article className="lg:col-span-8">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Link
                href={`/category/${article.categorySlug}`}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border ${catMeta.badgeColor}`}
              >
                {article.category}
              </Link>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-200 border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Solution
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-slate-300 ml-auto">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {article.readTime}
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5">
              {article.title}
            </h1>

            {/* Technical Specs Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950/65 border border-white/10 text-xs text-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                    Applies To
                  </span>
                  <span className="font-semibold text-white">
                    {article.osVersion}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                    Difficulty
                  </span>
                  <span className="font-semibold text-white">
                    {article.difficulty} (Step-by-Step)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                    Last Verified
                  </span>
                  <time dateTime={article.updatedAt} className="font-semibold text-white">
                    {article.updatedAt}
                  </time>
                </div>
              </div>
            </div>

            {/* 1. ZERO-FLUFF 60-SECOND QUICK FIX BOX */}
            <QuickFixBox
              quickFix={article.quickFix}
              errorCode={article.errorCode}
            />

            {/* Ad Slot Below Quick Fix */}
            <MonetagAdSlot position="below-quickfix" />

            {/* 2. STEP-BY-STEP NUMBERED METHODS & COPYABLE COMMANDS */}
            <ArticleBody htmlContent={article.htmlContent} />

            {/* Mid-Article Ad Slot */}
            <MonetagAdSlot position="mid-article" />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
                  Topics:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Feedback */}
          <HelpfulFeedback />

          {/* 3. SEO-OPTIMIZED FAQ ACCORDION */}
          <FaqAccordion faqs={article.faqs} />
        </article>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Table of Contents */}
          {article.headings.length > 0 && (
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white mb-4">
                <ListChecks className="w-4 h-4 text-cyan-400" />
                <span>Jump to Method</span>
              </div>
              <ul className="space-y-2.5 text-sm">
                {article.headings
                  .filter((h) => h.level === 2)
                  .map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="block text-slate-200 hover:text-cyan-300 transition leading-snug py-0.5"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Sidebar Ad Slot */}
          <MonetagAdSlot position="sidebar" />

          {/* Related Fixes */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Related Troubleshooting Guides
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/fix/${rel.slug}`}
                  className="block p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-white/10 hover:border-cyan-400/40 transition group"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                    {rel.category} • {rel.readTime}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 mt-1 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-300 mt-2 font-medium">
                    Read Fix <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
