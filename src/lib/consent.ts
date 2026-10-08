// Cookie consent for Google Analytics 4 and Google Ads, wired through Google
// Consent Mode v2 so every tag in the GTM container respects the choice.
// Model: opt-out (notice on first visit, analytics/ads on until declined),
// matching section 4 of the privacy policy.

export type ConsentChoice = "granted" | "denied";

export const CONSENT_COOKIE = "mc_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // one year
const OPEN_SETTINGS_EVENT = "mc:open-cookie-settings";

// Cookies set by GA4 and Google Ads / conversion linker.
const GOOGLE_COOKIE_PATTERN = /^(_ga|_gid|_gat|_gcl_|_gac_|FPID|FPLC|FPGCL)/;

declare global {
  interface Window {
    // dataLayer is already declared by @next/third-parties.
    gtag?: (...args: unknown[]) => void;
  }
}

// Runs inline in <head> before GTM loads, so a returning visitor who opted
// out never has a tag fire with consent granted.
export const consentDefaultScript = `
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
(function(){
  var denied=/(?:^|;\\s*)${CONSENT_COOKIE}=denied(?:;|$)/.test(document.cookie);
  var v=denied?"denied":"granted";
  window.gtag("consent","default",{analytics_storage:v,ad_storage:v,ad_user_data:v,ad_personalization:v,functionality_storage:"granted",security_storage:"granted"});
  window.gtag("set","ads_data_redaction",denied);
})();
`;

export function readConsent(): ConsentChoice | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=(granted|denied)(?:;|$)`),
  );
  return (match?.[1] as ConsentChoice | undefined) ?? null;
}

const listeners = new Set<() => void>();

export function subscribeConsent(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function setConsent(choice: ConsentChoice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;

  // Takes effect immediately for every Google tag on the page — no reload.
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
  window.gtag?.("set", "ads_data_redaction", choice === "denied");
  window.dataLayer?.push({ event: "cookie_consent_update", cookie_consent: choice });

  if (choice === "denied") deleteGoogleCookies();
  listeners.forEach((listener) => listener());
}

function deleteGoogleCookies() {
  // GA and Ads set cookies on the registrable domain (e.g. .mintclean.ca), so
  // try the current host and each parent domain.
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; domain=.${parts.slice(i).join(".")}`);
  }

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!GOOGLE_COOKIE_PATTERN.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(callback: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, callback);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, callback);
}
