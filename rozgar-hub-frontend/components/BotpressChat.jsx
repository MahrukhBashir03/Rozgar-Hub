"use client";

import Script from "next/script";

export default function BotpressChat() {
  return (
    <>
      <Script
        src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2026/02/04/14/20260204141438-451YMN3D.js"
        strategy="afterInteractive"
      />
    </>
  );
}
