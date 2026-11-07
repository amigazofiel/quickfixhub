import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { SITE_CONFIG, getCategoryMeta } from "@/lib/site-config";
import ArticleExplorer from "@/components/ArticleExplorer";
import MonetagAdSlot from "@/components/MonetagAdSlot";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catMeta = getCategoryMeta(category);

  return {
    title: `${catMeta.name} Troubleshooting & Quick Fixes`,
    description: catMeta.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/category/${catMeta.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const validCategory = SITE_CONFIG.categories.find(
    (c) => c.slug.toLowerCase() === category.toLowerCase()
  );

  if (!validCategory) {
    notFound();
  }

  const allArticles = getAllArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 mb-6"
      >
        <Link href="/" className="hover:text-cyan-300 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-white font-medium">{validCategory.name}</span>
      </nav>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-10">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border mb-3 ${validCategory.badgeColor}`}
        >
          {validCategory.name} Fixes
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          {validCategory.name} Error Codes &amp; Quick Fixes
        </h1>
        <p className="text-slate-200 text-base sm:text-lg max-w-3xl">
          {validCategory.description}
        </p>
      </div>

      <MonetagAdSlot position="home-feed" />

      <ArticleExplorer
        articles={allArticles}
        initialCategory={validCategory.slug}
      />
    </div>
  );
}
