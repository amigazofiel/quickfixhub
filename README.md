# QuickFixHub (`quickfixhub`)

**Instant, Zero-Fluff Tech Troubleshooting & OS Fixes for Windows, macOS, iOS, Android & Everyday Apps.**

## Architecture Highlights
- **100% Static Export (`Next.js 15` + `output: 'export'`)**: Ultra-fast static HTML generation hosted at zero cost on Vercel's global Edge CDN.
- **Zero External Databases**: All articles live as structured Markdown (`.md`) files inside `content/articles/`.
- **100% Autopilot Content Engine**: Powered by GitHub Actions (`.github/workflows/auto-publish.yml`) + **Google Gemini (`gemini-2.5-flash`)** (`scripts/generate-article.mjs`), automatically publishing new US-English SEO troubleshooting guides twice daily.
- **Day-1 Monetag Integration**: Built-in support for Monetag MultiTag, In-Page Push, Vignette, Native Banners, and site verification meta tags via Vercel Environment Variables.
- **Accessible Dark Glassmorphism UI**: High-contrast (`WCAG AA/AAA`) frosted glass interface built with Tailwind CSS, featuring a **60-Second Quick Fix Box**, 1-click copyable terminal/PowerShell commands, instant client-side search, and Google `FAQPage` + `TechArticle` JSON-LD Rich Snippets.
