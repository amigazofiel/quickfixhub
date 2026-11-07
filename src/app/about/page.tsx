import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About QuickFixHub & Editorial Standards",
  description:
    "Learn how QuickFixHub tests, verifies, and publishes 60-second troubleshooting guides for Windows, macOS, iOS, Android, and popular apps.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 article-prose">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          About {SITE_CONFIG.name} &amp; Editorial Standards
        </h1>
        <p>
          <strong>{SITE_CONFIG.name}</strong> was built with a single mission: to eliminate the 1,500-word filler introductions that plague modern tech troubleshooting sites. When your Wi-Fi drops before a meeting, your Windows 11 PC hits a system error code, or an app refuses to launch on macOS, you need the exact command or setting path immediately.
        </p>

        <h2>Our 60-Second Fix Methodology</h2>
        <ul>
          <li>
            <strong>Answer First:</strong> Every guide begins with a highlighted <em>60-Second Quick Fix Box</em> summarizing the root cause and the highest-success-rate solution.
          </li>
          <li>
            <strong>Copy-Paste Accuracy:</strong> Terminal, Command Prompt, and PowerShell commands are formatted with one-click copy buttons to prevent syntax typos.
          </li>
          <li>
            <strong>Safe Progression:</strong> We always order troubleshooting steps from non-destructive resets (cache flushes, service restarts) to advanced system repairs (SFC/DISM, Safe Mode, registry verification).
          </li>
        </ul>

        <h2>Editorial Verification</h2>
        <p>
          All troubleshooting guides specify the target operating system versions (Windows 11/10, macOS Sonoma/Sequoia, iOS 17/18, Android 14/15) and are continuously updated as operating system vendors release patches.
        </p>
      </div>
    </div>
  );
}
