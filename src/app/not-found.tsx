import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="glass-panel rounded-3xl p-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 mb-4">
          <Terminal className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Error 404: Guide Not Found
        </h1>
        <p className="text-slate-300 mb-6">
          The troubleshooting page you requested may have been moved or merged into an updated OS guide.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/25 hover:bg-cyan-500/35 border border-cyan-400/50 text-cyan-100 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Quick Fixes</span>
        </Link>
      </div>
    </div>
  );
}
