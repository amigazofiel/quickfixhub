"use client";

import { useEffect, useRef } from "react";

interface MonetagAdSlotProps {
  position: "below-quickfix" | "mid-article" | "sidebar" | "footer" | "home-feed";
  className?: string;
}

export default function MonetagAdSlot({
  position,
  className = "",
}: MonetagAdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nativeZoneId = process.env.NEXT_PUBLIC_MONETAG_NATIVE_BANNER_ZONE_ID;
  const showPlaceholders =
    process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true";

  useEffect(() => {
    if (!nativeZoneId || !containerRef.current) return;
    // Avoid duplicate script injection on re-renders
    if (containerRef.current.dataset.loaded === "true") return;
    containerRef.current.dataset.loaded = "true";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `https://alwingulla.com/88/tag.min.js`;
    script.setAttribute("data-zone", nativeZoneId);
    containerRef.current.appendChild(script);
  }, [nativeZoneId]);

  if (!nativeZoneId && !showPlaceholders) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsored Content"
      className={`my-6 rounded-2xl glass-panel p-4 border border-white/10 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-medium">
        <span>Sponsored Partner</span>
        <span className="text-slate-500">Ad • {position}</span>
      </div>

      {nativeZoneId ? (
        <div
          ref={containerRef}
          id={`monetag-slot-${position}`}
          className="min-h-[90px] flex items-center justify-center"
        />
      ) : (
        <div className="min-h-[90px] rounded-xl border border-dashed border-cyan-500/30 bg-slate-950/60 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-xs font-mono text-cyan-300">
            Monetag Ad Slot Ready ({position})
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Set <code className="text-cyan-200">NEXT_PUBLIC_MONETAG_NATIVE_BANNER_ZONE_ID</code> or <code className="text-cyan-200">NEXT_PUBLIC_MONETAG_MULTITAG_ZONE_ID</code> in Vercel Environment Variables.
          </p>
        </div>
      )}
    </aside>
  );
}
