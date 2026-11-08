"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    os: "Windows 11 / 10",
    errorCode: "",
    app: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.errorCode.trim() && !formData.description.trim()) return;

    setLoading(true);
    // Simulate brief network submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl p-8 bg-emerald-500/10 border border-emerald-400/30 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Error Fix Request Received!
        </h3>
        <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed mb-6">
          Thank you for reporting this issue. Our editorial and automated testing pipeline reviews user-submitted error codes daily to publish verified, 60-second troubleshooting guides.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              os: "Windows 11 / 10",
              errorCode: "",
              app: "",
              description: "",
            });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-sm font-semibold transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Submit Another Error</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Operating System */}
        <div>
          <label
            htmlFor="os-select"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
          >
            Operating System
          </label>
          <select
            id="os-select"
            value={formData.os}
            onChange={(e) => setFormData({ ...formData, os: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          >
            <option value="Windows 11 / 10">Windows 11 / 10</option>
            <option value="macOS Sonoma / Sequoia">macOS Sonoma / Sequoia</option>
            <option value="iOS 18 / 17 (iPhone)">iOS 18 / 17 (iPhone &amp; iPad)</option>
            <option value="Android 15 / 14">Android 15 / 14 (Samsung, Pixel)</option>
            <option value="Apps & Software">Everyday Apps &amp; Software</option>
          </select>
        </div>

        {/* Affected Software / Hardware */}
        <div>
          <label
            htmlFor="app-input"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
          >
            App or Service Name
          </label>
          <input
            id="app-input"
            type="text"
            placeholder="e.g. Chrome, Discord, Wi-Fi Adapter, Steam"
            value={formData.app}
            onChange={(e) => setFormData({ ...formData, app: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          />
        </div>
      </div>

      {/* Error Code */}
      <div>
        <label
          htmlFor="error-code-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
        >
          Exact Error Code or Error Message
        </label>
        <input
          id="error-code-input"
          type="text"
          required
          placeholder="e.g. 0x80070005, DNS_PROBE_FINISHED_NXDOMAIN, App keeps stopping"
          value={formData.errorCode}
          onChange={(e) =>
            setFormData({ ...formData, errorCode: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-100 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        />
      </div>

      {/* Symptoms Description */}
      <div>
        <label
          htmlFor="desc-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
        >
          What happens when this error occurs?
        </label>
        <textarea
          id="desc-input"
          rows={3}
          placeholder="Briefly describe when the error appears (e.g. after a Windows cumulative update, when launching the app, after rebooting)..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Priority testing queue for US tech readers</span>
        </span>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
          <span>{loading ? "Submitting..." : "Submit Error Report"}</span>
        </button>
      </div>
    </form>
  );
}
