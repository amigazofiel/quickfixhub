"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

export default function HelpfulFeedback() {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  return (
    <div className="my-8 glass-panel rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
      {vote ? (
        <div className="flex items-center gap-2.5 text-emerald-300 font-medium text-sm sm:text-base">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            {vote === "yes"
              ? "Awesome! Glad this quick fix resolved your issue."
              : "Thanks for the feedback! Our engineering team reviews error reports daily."}
          </span>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-base font-semibold text-white">
              Did this guide fix your problem?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Your feedback helps us keep commands and OS steps up to date.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setVote("yes")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-sm font-medium transition cursor-pointer"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Yes, fixed it!</span>
            </button>
            <button
              type="button"
              onClick={() => setVote("no")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-sm font-medium transition cursor-pointer"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Still stuck</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
