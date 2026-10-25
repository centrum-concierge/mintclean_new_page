"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  onOpenCookieSettings,
  readConsent,
  setConsent,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/consent";

// Cookies are on by default for everyone (notice with opt-out via the footer).
// The one exception is Quebec, which gets the OK / Opt out banner.
async function isStrictRegion(): Promise<boolean> {
  try {
    const res = await fetch("/api/region", { cache: "no-store" });
    if (!res.ok) return false;
    const { country, region } = await res.json();
    return country === "CA" && region === "QC";
  } catch {
    return false;
  }
}

// "pending" on the server so the banner never flashes for returning visitors.
const getServerSnapshot = () => "pending" as const;

export function CookieConsent() {
  const choice = useSyncExternalStore<ConsentChoice | null | "pending">(
    subscribeConsent,
    readConsent,
    getServerSnapshot,
  );
  const [reopened, setReopened] = useState(false);
  const [strict, setStrict] = useState<boolean | null>(null);

  useEffect(() => onOpenCookieSettings(() => setReopened(true)), []);

  const visible = choice !== "pending" && (choice === null || reopened);

  useEffect(() => {
    if (!visible || strict !== null) return;
    let cancelled = false;
    isStrictRegion().then((value) => {
      if (!cancelled) setStrict(value);
    });
    return () => {
      cancelled = true;
    };
  }, [visible, strict]);

  if (!visible || strict === null) return null;

  function choose(value: ConsentChoice) {
    setConsent(value);
    setReopened(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>
            We use cookies to understand how our site is used and to measure and
            show our ads (Google Analytics and Google Ads).{" "}
            {strict
              ? "You can opt out at any time."
              : "These are on by default. You can opt out at any time by clicking “Cookie settings” in the footer."}{" "}
            See our{" "}
            <Link href="/privacy-policy" className="font-medium text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          {choice !== null && (
            <p className="mt-1.5 text-xs">
              Current choice: analytics and advertising cookies are{" "}
              <strong className="text-foreground">{choice === "granted" ? "on" : "off"}</strong>.
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-3">
          {(strict || reopened) && (
            <Button size="lg" variant="outline" className="flex-1 px-5 sm:flex-none" onClick={() => choose("denied")}>
              Opt out
            </Button>
          )}
          <Button size="lg" className="flex-1 px-5 sm:flex-none" onClick={() => choose("granted")}>
            {strict ? "OK" : reopened ? "Opt in" : "Got it"}
          </Button>
        </div>
      </div>
    </div>
  );
}
