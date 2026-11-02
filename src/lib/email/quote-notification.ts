import { EMAIL_COLORS as C, capitalize, escapeHtml } from "./utils";

export type QuoteNotificationParams = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceType: string;
  propertyType: string;
  details?: string;
};

export function renderQuoteNotificationEmail(params: QuoteNotificationParams) {
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const subject = "New quote request — " + (fullName || "unknown sender");

  const html =
    "" +
    "<!doctype html>" +
    '<html lang="en">' +
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' +
    subject +
    "</title></head>" +
    '<body style="margin:0; padding:0; background-color:' +
    C.paper +
    ';">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:' +
    C.paper +
    ';">' +
    '<tr><td align="center" style="padding:28px 16px;">' +
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px; max-width:560px; background-color:#ffffff; border:1px solid ' +
    C.hair +
    '; border-radius:10px;">' +
    '<tr><td style="padding:6px 0; background-color:' +
    C.primary +
    '; border-radius:10px 10px 0 0;">&nbsp;</td></tr>' +
    '<tr><td style="padding:28px 32px;">' +
    '<p style="margin:0 0 4px 0; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:' +
    C.primary +
    ';">New Quote Request</p>' +
    '<h1 style="margin:0 0 20px 0; font-family:Arial,Helvetica,sans-serif; font-size:22px; color:' +
    C.ink +
    ';">' +
    escapeHtml(fullName || "Unknown sender") +
    "</h1>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:' +
    C.ash +
    '; width:110px;">Email</td><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><a href="mailto:' +
    escapeHtml(params.email) +
    '" style="color:' +
    C.ink +
    ';">' +
    escapeHtml(params.email || "—") +
    "</a></td></tr>" +
    '<tr><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:' +
    C.ash +
    '; width:110px;">Phone</td><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';">' +
    escapeHtml(params.phone || "—") +
    "</td></tr>" +
    '<tr><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:' +
    C.ash +
    '; vertical-align:top;">Service type</td><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';">' +
    escapeHtml(params.serviceType || "—") +
    "</td></tr>" +
    '<tr><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:' +
    C.ash +
    '; vertical-align:top;">Property type</td><td style="padding:6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';">' +
    escapeHtml(capitalize(params.propertyType) || "—") +
    "</td></tr>" +
    "</table>" +
    '<div style="margin-top:18px; padding:16px 18px; background-color:' +
    C.paper +
    '; border-radius:8px;">' +
    '<p style="margin:0 0 8px 0; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:' +
    C.ash +
    ';">Details</p>' +
    '<p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:' +
    C.ink +
    '; white-space:pre-wrap;">' +
    escapeHtml(params.details || "—").replace(/\n/g, "<br>") +
    "</p>" +
    "</div>" +
    '<p style="margin:20px 0 0 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:' +
    C.ash +
    ';">Reply-to on this email is set to the sender — hit reply to respond directly.</p>' +
    "</td></tr>" +
    "</table>" +
    "</td></tr>" +
    "</table>" +
    "</body></html>";

  const text =
    "New quote request\n\n" +
    "Name: " +
    (fullName || "-") +
    "\n" +
    "Email: " +
    (params.email || "-") +
    "\n" +
    "Phone: " +
    (params.phone || "-") +
    "\n" +
    "Service type: " +
    (params.serviceType || "-") +
    "\n" +
    "Property type: " +
    (params.propertyType || "-") +
    "\n\n" +
    "Details:\n" +
    (params.details || "-");

  return { subject, html, text };
}
