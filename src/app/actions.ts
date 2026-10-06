"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { renderQuoteConfirmationEmail } from "@/lib/email/quote-confirmation";
import { renderQuoteNotificationEmail } from "@/lib/email/quote-notification";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `${process.env.RESEND_FROM_NAME ?? "Mint Clean"} <${process.env.RESEND_FROM_EMAIL}>`;
const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL ?? "info@mintclean.ca";

const TURNSTILE_ACTION = "quote_request";
const expectedHostnames = new Set(
  (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean)
);

async function verifyTurnstile(formData: FormData): Promise<boolean> {
  const token = formData.get("cf-turnstile-response")?.toString() ?? "";

  if (!token || token.length > 2048 || expectedHostnames.size === 0) {
    return false;
  }

  const headerList = await headers();
  const clientIp =
    headerList.get("x-real-ip") ??
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";

  let result;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET ?? "",
        response: token,
        ...(clientIp ? { remoteip: clientIp } : {}),
      }),
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    result = await r.json();
  } catch (err) {
    console.error("Turnstile siteverify request failed:", err);
    return false;
  }

  if (
    !result.success ||
    result.action !== TURNSTILE_ACTION ||
    !expectedHostnames.has(result.hostname)
  ) {
    console.error("Turnstile verification rejected:", result);
    return false;
  }

  return true;
}

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const verified = await verifyTurnstile(formData);
  if (!verified) {
    return {
      status: "error",
      message: "We couldn't verify you're human. Please try again.",
    };
  }

  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const propertyType = formData.get("propertyType")?.toString().trim() ?? "";
  const details = formData.get("details")?.toString().trim() ?? "";

  if (!firstName || !lastName || !email || !propertyType) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const leadDetails = { firstName, lastName, email, phone, propertyType, details };
  const confirmation = renderQuoteConfirmationEmail(leadDetails);
  const notification = renderQuoteNotificationEmail(leadDetails);

  try {
    const [confirmationResult, notificationResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: email,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
      }),
    ]);

    if (confirmationResult.error || notificationResult.error) {
      console.error(
        "Resend error:",
        confirmationResult.error ?? notificationResult.error
      );
      return {
        status: "error",
        message:
          "We received your request but couldn't send a confirmation email. We'll still be in touch shortly.",
      };
    }
  } catch (err) {
    console.error("Failed to send quote request emails:", err);
    return {
      status: "error",
      message:
        "We received your request but couldn't send a confirmation email. We'll still be in touch shortly.",
    };
  }

  return {
    status: "success",
    message: "Thanks! We've received your request and will be in touch shortly.",
  };
}
