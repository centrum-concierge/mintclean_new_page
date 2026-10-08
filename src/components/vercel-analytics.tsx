"use client";

import { Analytics } from "@vercel/analytics/next";
import { readConsent } from "@/lib/consent";

// Vercel Web Analytics is cookieless, but we still honour the analytics
// opt-out from the cookie notice (privacy policy section 4).
export function VercelAnalytics() {
  return <Analytics beforeSend={(event) => (readConsent() === "denied" ? null : event)} />;
}
