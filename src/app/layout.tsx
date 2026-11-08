import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonetagScripts from "@/components/MonetagScripts";
import { SITE_CONFIG } from "@/lib/site-config";

const monetagVerification =
  process.env.NEXT_PUBLIC_MONETAG_VERIFICATION || "1b8f3f07a6d86969dd5b3aaf21596515";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Windows 11 error fix",
    "macOS troubleshooting",
    "iOS battery drain fix",
    "Android app crashing fix",
    "DNS_PROBE_FINISHED_NXDOMAIN fix",
    "copy paste terminal commands",
    "tech troubleshooting guides",
    "QuickFixHub",
  ],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    ...(monetagVerification ? { monetag: monetagVerification } : {}),
    ...(googleVerification
      ? { "google-site-verification": googleVerification }
      : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="monetag" content="1b8f3f07a6d86969dd5b3aaf21596515" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#060911] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-100 relative">
        {/* Accessible Dark Dynamic Ambient Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 left-1/4 w-[38rem] h-[38rem] rounded-full bg-cyan-500/[0.08] blur-[130px]" />
          <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full bg-indigo-600/[0.08] blur-[140px]" />
          <div className="absolute -bottom-48 left-10 w-[30rem] h-[30rem] rounded-full bg-emerald-500/[0.05] blur-[130px]" />
        </div>

        <MonetagScripts />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
