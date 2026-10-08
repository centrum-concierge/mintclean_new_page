"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitQuoteRequest, type QuoteFormState } from "@/app/actions";
import { CheckCircle2, Loader2 } from "lucide-react";

const initialState: QuoteFormState = { status: "idle" };
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  // Render the widget explicitly (not the auto-render class) so we can
  // retain its widget ID and reset it after a failed/erroring attempt —
  // a cf-turnstile-response token is single-use.
  useEffect(() => {
    if (!turnstileLoaded || !turnstileContainerRef.current || widgetIdRef.current) return;
    if (!window.turnstile) return;
    widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "quote_request",
    });
  }, [turnstileLoaded]);

  useEffect(() => {
    if (state.status === "error" && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <p className="text-lg font-medium text-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setTurnstileLoaded(true)}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First name *</Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last name *</Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="propertyType">What type of property is it? *</Label>
        <Select name="propertyType" required>
          <SelectTrigger id="propertyType" className="w-full">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="details">Please leave us any details we should know</Label>
        <Textarea id="details" name="details" rows={4} />
      </div>
      <div ref={turnstileContainerRef} />
      {state.status === "error" && (
        <p className="text-sm font-medium text-destructive">{state.message}</p>
      )}
      <p className="text-sm text-muted-foreground">
        We use the information you provide to respond to your request. See our{" "}
        <Link href="/privacy-policy" className="font-medium text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending && <Loader2 className="size-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
}
