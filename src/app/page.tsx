import { Zap, Terminal, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { SITE_CONFIG } from "@/lib/site-config";
import ArticleExplorer from "@/components/ArticleExplorer";
import MonetagAdSlot from "@/components/MonetagAdSlot";

export default function HomePage() {
  const articles = getAllArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-cyan-200 mb-5">
          <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          <span>Zero-Fluff Tech Troubleshooting • Direct Copy-Paste Fixes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
          Fix Everyday OS &amp; App Errors in{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Under 60 Seconds.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
          No 1,000-word backstories. Every guide starts with an instant{" "}
          <strong className="text-white">Quick Fix Box</strong>, ready-to-copy{" "}
          <strong className="text-cyan-300">PowerShell / Terminal commands</strong>, and verified step-by-step solutions for Windows, Mac, iOS, and Android.
        </p>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs sm:text-sm text-slate-200">
          <div className="glass-panel rounded-xl px-4 py-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant Answer Box First</span>
          </div>
          <div className="glass-panel rounded-xl px-4 py-3 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>1-Click Copy Commands</span>
          </div>
          <div className="glass-panel rounded-xl px-4 py-3 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Safe, Verified OS Steps</span>
          </div>
        </div>
      </section>

      <MonetagAdSlot position="home-feed" />

      {/* Interactive Search & Category Explorer */}
      <ArticleExplorer articles={articles} />
    </div>
  );
}
