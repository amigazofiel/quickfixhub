import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Disclosure",
  description: `Privacy Policy, Cookie usage, and Advertising disclosures for ${SITE_CONFIG.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 article-prose">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Privacy Policy
        </h1>
        <p>
          <strong>Effective Date:</strong> November 2026
        </p>
        <p>
          At <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.url}), we respect your privacy and are committed to transparency regarding data collection, cookies, and third-party advertising partners.
        </p>

        <h2>1. Information We Collect Automatically</h2>
        <p>
          Because {SITE_CONFIG.name} is a static troubleshooting resource, we do not require user accounts or store personal profiles in a database. Standard anonymous server logs (such as browser type, referring page, and anonymized IP address) may be processed by our hosting provider (Vercel) for security and performance delivery.
        </p>

        <h2>2. Cookies &amp; Third-Party Advertising Partners (Monetag)</h2>
        <p>
          To keep our troubleshooting guides 100% free without paywalls, we partner with third-party advertising networks including <strong>Monetag</strong>. These partners may use cookies, web beacons, or similar technologies to serve relevant advertisements (such as Native Banners or In-Page notifications) based on your visit to this and other websites.
        </p>
        <ul>
          <li>You can disable or clear cookies at any time through your web browser settings.</li>
          <li>California residents (CCPA) and European Economic Area visitors (GDPR) have the right to opt out of personalized advertising cookies via their browser privacy controls.</li>
        </ul>

        <h2>3. External Links</h2>
        <p>
          Our articles occasionally reference official documentation from Microsoft, Apple, Google, or software vendors. We are not responsible for the privacy practices of external domains.
        </p>
      </div>
    </div>
  );
}
