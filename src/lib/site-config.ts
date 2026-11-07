export const SITE_CONFIG = {
  name: "QuickFixHub",
  tagline: "60-Second Fixes for Windows, Mac, iOS, Android & Everyday Apps",
  description:
    "Direct, zero-fluff troubleshooting guides for Windows 11/10, macOS, iPhone, Android, and popular software. Copy-paste commands, instant quick-fix summaries, and verified step-by-step solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thequickfixhub.vercel.app",
  locale: "en_US",
  author: "QuickFixHub Engineering Team",
  categories: [
    {
      name: "Windows",
      slug: "windows",
      description: "BSOD error codes, PowerShell repairs, network resets, and Windows 11/10 system fixes.",
      badgeColor: "from-sky-500/20 to-blue-600/20 text-sky-300 border-sky-400/30",
    },
    {
      name: "macOS",
      slug: "macos",
      description: "Terminal commands, Apple Silicon fixes, Wi-Fi drops, Spotlight, and macOS Sonoma/Sequoia solutions.",
      badgeColor: "from-purple-500/20 to-indigo-600/20 text-purple-300 border-purple-400/30",
    },
    {
      name: "iOS",
      slug: "ios",
      description: "iPhone & iPad battery drain, CarPlay glitches, Face ID, iCloud sync, and iOS update repairs.",
      badgeColor: "from-pink-500/20 to-rose-600/20 text-rose-300 border-rose-400/30",
    },
    {
      name: "Android",
      slug: "android",
      description: "Google Play Services errors, Samsung/Pixel connectivity fixes, storage cleanup, and app crashes.",
      badgeColor: "from-emerald-500/20 to-teal-600/20 text-emerald-300 border-emerald-400/30",
    },
    {
      name: "Apps & Software",
      slug: "apps",
      description: "Fixes for Chrome, Discord, Steam, Zoom, Spotify, Outlook, and everyday productivity apps.",
      badgeColor: "from-amber-500/20 to-orange-600/20 text-amber-300 border-amber-400/30",
    },
  ],
};

export function getCategoryMeta(categoryNameOrSlug: string) {
  const normalized = (categoryNameOrSlug || "").toLowerCase().trim();
  const match = SITE_CONFIG.categories.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.name.toLowerCase() === normalized ||
      (normalized.includes("app") && c.slug === "apps") ||
      (normalized.includes("mac") && c.slug === "macos") ||
      (normalized.includes("iphone") && c.slug === "ios")
  );
  return (
    match || {
      name: categoryNameOrSlug || "Windows",
      slug: "windows",
      description: "Verified step-by-step troubleshooting guides and quick fixes.",
      badgeColor: "from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-400/30",
    }
  );
}
