"use client";

import Script from "next/script";

export default function MonetagScripts() {
  const multiTagZoneId = process.env.NEXT_PUBLIC_MONETAG_MULTITAG_ZONE_ID;
  const multiTagSrc =
    process.env.NEXT_PUBLIC_MONETAG_MULTITAG_SRC ||
    "https://alwingulla.com/88/tag.min.js";

  const inPagePushZoneId = process.env.NEXT_PUBLIC_MONETAG_INPAGE_PUSH_ZONE_ID;
  const vignetteZoneId = process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_ZONE_ID;

  return (
    <>
      {/* 1. Monetag MultiTag (All-in-One Smart Monetization) */}
      {multiTagZoneId && (
        <Script
          id="monetag-multitag"
          src={multiTagSrc}
          data-zone={multiTagZoneId}
          strategy="afterInteractive"
          data-cfasync="false"
        />
      )}

      {/* 2. Monetag In-Page Push (Optional Standalone Zone) */}
      {inPagePushZoneId && !multiTagZoneId && (
        <Script
          id="monetag-inpage-push"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',${JSON.stringify(
              inPagePushZoneId
            )},document.createElement('script'))`,
          }}
        />
      )}

      {/* 3. Monetag Vignette Banner (Optional Standalone Zone) */}
      {vignetteZoneId && !multiTagZoneId && (
        <Script
          id="monetag-vignette"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',${JSON.stringify(
              vignetteZoneId
            )},document.createElement('script'))`,
          }}
        />
      )}
    </>
  );
}
