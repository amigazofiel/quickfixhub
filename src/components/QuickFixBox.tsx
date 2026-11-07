import { Zap, Terminal, CheckCircle2 } from "lucide-react";
import { QuickFixData } from "@/lib/articles";
import CopyCommandButton from "./CopyCommandButton";

interface QuickFixBoxProps {
  quickFix: QuickFixData;
  errorCode?: string;
}

export default function QuickFixBox({ quickFix, errorCode }: QuickFixBoxProps) {
  return (
    <section
      aria-label="60-Second Quick Fix Summary"
      className="glass-quickfix rounded-2xl p-6 sm:p-7 my-6 relative overflow-hidden"
    >
      {/* Subtle ambient highlight */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-300/30 text-cyan-200 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
          <span>60-Second Quick Fix</span>
        </div>

        {errorCode && (
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-white/15 font-mono text-xs text-amber-300">
            Error: {errorCode}
          </span>
        )}
      </div>

      <p className="text-slate-100 font-medium text-base sm:text-lg leading-relaxed mb-5">
        {quickFix.summary}
      </p>

      <div className="space-y-3 mb-5">
        {quickFix.steps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-slate-950/55 border border-white/10 rounded-xl p-3.5"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-bold shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <p className="text-slate-100 text-sm sm:text-base leading-snug">
              {step}
            </p>
          </div>
        ))}
      </div>

      {quickFix.command && (
        <div className="rounded-xl bg-slate-950/90 border border-cyan-400/30 p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300">
              <Terminal className="w-3.5 h-3.5" />
              <span>{quickFix.commandLabel || "Instant Repair Command"}</span>
            </span>
            <CopyCommandButton command={quickFix.command} />
          </div>
          <pre className="text-xs sm:text-sm font-mono text-cyan-100 overflow-x-auto py-1">
            <code>{quickFix.command}</code>
          </pre>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Need deeper steps? Scroll down for full method-by-method instructions with screenshots & command breakdowns.
        </span>
      </div>
    </section>
  );
}
