import type { Metadata } from "next";
import { MessageSquareWarning, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Submit an Error Code",
  description: `Report a stubborn OS error code or request a new 60-second troubleshooting guide for Windows, Mac, iOS, Android, or apps.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-3xl p-6 sm:p-12 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-xs font-semibold text-cyan-200 mb-4">
          <MessageSquareWarning className="w-3.5 h-3.5 text-cyan-400" />
          <span>Error Code &amp; Bug Intake Hub</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Report an Error Code &amp; Request a Fix
        </h1>
        <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8">
          Encountered a stubborn Windows, Mac, iOS, or Android error code we haven&apos;t covered yet? Submit the error code below. Our editorial and automated engineering pipelines evaluate requested errors daily to generate verified 60-second solutions.
        </p>

        {/* Interactive Error Code Submission Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/70 border border-white/10 mb-8">
          <ContactForm />
        </div>

        {/* Trust & Verification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">Safe Command Verification</strong>
              <span>All commands are lab-tested against official Microsoft and Apple documentation.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">Daily Pipeline Updates</strong>
              <span>New guides are compiled and published automatically twice every day.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">Privacy Guaranteed</strong>
              <span>No user accounts or personal tracking required to submit error reports.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
