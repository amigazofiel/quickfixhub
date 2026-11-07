"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCommandButtonProps {
  command: string;
  label?: string;
}

export default function CopyCommandButton({
  command,
  label = "Copy Command",
}: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = command;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-100 border border-cyan-400/40 transition cursor-pointer shrink-0"
      aria-label={label}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-200 font-semibold">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-cyan-300" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
