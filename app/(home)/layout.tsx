import "@/assets/scss/main.scss";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/components/draft-mode-toast";
import Header from "@/components/header";
import { GTM } from "@/components/gtm";
import Footer from "@/components/footer";
import { handleError } from "../logger";
import { SanityLive } from "@/sanity/lib/api/live";
import PageTransition from "@/components/blocks/page-transition";

export default async function RootLayout({ children }: {children: React.ReactNode}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" cz-shortcut-listen="false">
      <body>
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        {isDraftMode && <SanityLive onError={handleError} />}
        <Header />
        <main suppressHydrationWarning={true}>{children}</main>
        <Footer />
        <SpeedInsights />
        <GTM />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7G95Z9T"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}
