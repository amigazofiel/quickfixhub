import type { Metadata } from "next";
import { Mail, MessageSquareWarning, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us & Submit an Error Code",
  description: `Contact the ${SITE_CONFIG.name} editorial team or request a new troubleshooting guide.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-3xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Contact &amp; Report an Error Code
        </h1>
        <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8">
          Encountered a stubborn Windows, Mac, iOS, or Android error code we haven&apos;t covered yet? Or noticed a step that changed after a recent OS update? Let our engineering team know.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10">
            <Mail className="w-6 h-6 text-cyan-400 mb-3" />
            <h2 className="text-lg font-bold text-white mb-1">
              Editorial &amp; Support
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              For guide corrections, press inquiries, or partnership questions:
            </p>
            <span className="font-mono text-sm text-cyan-300">
              support@quickfixhub.vercel.app
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10">
            <MessageSquareWarning className="w-6 h-6 text-amber-400 mb-3" />
            <h2 className="text-lg font-bold text-white mb-1">
              Request a New Error Fix
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Include your exact OS version and error code string for priority testing:
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              Reviewed Daily by Our Automated &amp; Editorial Pipeline
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
