import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service & Technical Disclaimer",
  description: `Terms of Use and Technical Disclaimer for ${SITE_CONFIG.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 article-prose">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Terms of Service &amp; Disclaimer
        </h1>
        <p>
          By accessing and using <strong>{SITE_CONFIG.name}</strong>, you agree to the following terms and conditions.
        </p>

        <h2>1. Informational &amp; Educational Purpose</h2>
        <p>
          All tutorials, terminal commands, PowerShell scripts, and configuration steps published on {SITE_CONFIG.name} are provided for informational purposes on an &ldquo;as-is&rdquo; basis. While every guide is structured to prioritize safe, standard OS repair utilities, system configurations vary widely.
        </p>

        <h2>2. Backup Recommendation</h2>
        <p>
          Before modifying Windows Registry keys, running disk partition utilities, or resetting network/system configurations, you should always back up critical files or create a System Restore Point. {SITE_CONFIG.name} is not liable for any data loss or hardware/software interruption resulting from the application of these guides.
        </p>

        <h2>3. Trademarks</h2>
        <p>
          Microsoft, Windows, Apple, macOS, iPhone, iOS, Google, Android, Discord, Steam, and other product names mentioned on this website are trademarks or registered trademarks of their respective owners. {SITE_CONFIG.name} is an independent technical publication and is not affiliated with or endorsed by these companies.
        </p>
      </div>
    </div>
  );
}
