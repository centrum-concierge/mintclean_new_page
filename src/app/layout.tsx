import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { consentDefaultScript } from "@/lib/consent";
import "./globals.css";

const GTM_ID = "GTM-PRNRJXM8";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Mint Clean | Commercial & Residential Building Maintenance",
    template: "%s | Mint Clean",
  },
  description:
    "Mint Clean provides commercial and residential strata janitorial, caretaking, heavy duty maintenance, and snow removal services across Greater Vancouver.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <head>
        {/* Consent Mode defaults must be set before GTM loads. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-full flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <VercelAnalytics />
      </body>
    </html>
  );
}
