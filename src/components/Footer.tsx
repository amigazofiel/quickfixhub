import Link from "next/link";
import { Wrench, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-slate-950 stroke-[2.2]" />
              </div>
              <span className="text-lg font-extrabold text-white">
                QuickFix<span className="text-cyan-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified OS Commands
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Zero-Fluff Guides
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Updated Daily
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              OS & Platforms
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {SITE_CONFIG.categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-cyan-300 transition"
                  >
                    {cat.name} Troubleshooting
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust (E-E-A-T + Ad Network Compliance) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition">
                  About & Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-300 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition">
                  Contact & Report an Error
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Built for US & Global Tech Users.
          </p>
          <p className="text-center sm:text-right">
            Windows, macOS, iOS, and Android are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
