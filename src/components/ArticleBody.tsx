"use client";

import { useEffect, useRef } from "react";

interface ArticleBodyProps {
  htmlContent: string;
}

export default function ArticleBody({ htmlContent }: ArticleBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".copy-code-btn") as HTMLButtonElement | null;
      if (!btn) return;

      const encoded = btn.getAttribute("data-copy-code");
      if (!encoded) return;

      const command = decodeURIComponent(encoded);
      const labelSpan = btn.querySelector(".copy-btn-text");

      try {
        await navigator.clipboard.writeText(command);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = command;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      if (labelSpan) {
        const originalText = labelSpan.textContent;
        labelSpan.textContent = "Copied!";
        btn.classList.add("bg-emerald-500/30", "border-emerald-400/50", "text-emerald-200");
        setTimeout(() => {
          labelSpan.textContent = originalText || "Copy Command";
          btn.classList.remove("bg-emerald-500/30", "border-emerald-400/50", "text-emerald-200");
        }, 2000);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
