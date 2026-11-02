import { EMAIL_COLORS as C, capitalize, escapeHtml, firstName, logoUrl } from "./utils";

export type QuoteConfirmationParams = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceType: string;
  propertyType: string;
  details?: string;
};

export function renderQuoteConfirmationEmail(params: QuoteConfirmationParams) {
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const greetName = escapeHtml(firstName(params.firstName));
  const safeName = escapeHtml(fullName || "—");
  const safeEmail = escapeHtml(params.email || "—");
  const safePhone = escapeHtml(params.phone || "—");
  const safeServiceType = escapeHtml(params.serviceType || "—");
  const safePropertyType = escapeHtml(capitalize(params.propertyType) || "—");
  const safeDetails = escapeHtml(params.details || "—").replace(/\n/g, "<br>");

  const subject = "We've received your request — Mint Clean";

  const html =
    "" +
    "<!doctype html>" +
    '<html lang="en">' +
    "<head>" +
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="color-scheme" content="light">' +
    "<title>" +
    subject +
    "</title>" +
    "</head>" +
    '<body style="margin:0; padding:0; background-color:' +
    C.paper +
    '; -webkit-text-size-adjust:100%;">' +
    '<div style="display:none; max-height:0; overflow:hidden; opacity:0;">Thanks for reaching out — a Mint Clean team member will follow up shortly with your quote.</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:' +
    C.paper +
    ';">' +
    '<tr><td align="center" style="padding:32px 16px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:14px; overflow:hidden; border:1px solid ' +
    C.hair +
    ';">' +
    /* header */
    '<tr><td bgcolor="' +
    C.brandDark +
    '" style="background-color:' +
    C.brandDark +
    '; padding:28px 40px;">' +
    '<img src="' +
    logoUrl +
    '" width="150" alt="Mint Clean" style="display:block; width:150px; height:auto; border:0;">' +
    "</td></tr>" +
    /* accent line */
    '<tr><td style="height:4px; line-height:4px; font-size:0; background-color:' +
    C.primary +
    ';">&nbsp;</td></tr>' +
    /* body */
    '<tr><td style="padding:36px 40px 8px 40px;">' +
    '<p style="margin:0 0 10px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:' +
    C.primary +
    ';">Request Received</p>' +
    '<h1 style="margin:0 0 18px 0; font-family:Arial,Helvetica,sans-serif; font-size:26px; line-height:1.3; color:' +
    C.ink +
    ';">Thanks, ' +
    greetName +
    " — we've got your request.</h1>" +
    '<p style="margin:0 0 18px 0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.65; color:' +
    C.ink +
    ';">A member of the Mint Clean team will review your property details and reach out shortly with a customized quote. In the meantime, here\'s a recap of what you sent us.</p>' +
    "</td></tr>" +
    /* recap box */
    '<tr><td style="padding:0 40px 24px 40px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:' +
    C.paper +
    "; border:1px solid " +
    C.hair +
    '; border-radius:10px;">' +
    '<tr><td style="padding:20px 22px;">' +
    '<p style="margin:0 0 12px 0; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase; color:' +
    C.ash +
    ';">What you sent us</p>' +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><strong>Name:</strong> ' +
    safeName +
    "</p>" +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><strong>Email:</strong> ' +
    safeEmail +
    "</p>" +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><strong>Phone:</strong> ' +
    safePhone +
    "</p>" +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><strong>Service type:</strong> ' +
    safeServiceType +
    "</p>" +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:' +
    C.ink +
    ';"><strong>Property type:</strong> ' +
    safePropertyType +
    "</p>" +
    '<p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:' +
    C.ink +
    ';"><strong>Details:</strong><br>' +
    safeDetails +
    "</p>" +
    "</td></tr>" +
    "</table>" +
    "</td></tr>" +
    /* divider */
    '<tr><td style="padding:0 40px;"><div style="border-top:1px solid ' +
    C.hair +
    ';"></div></td></tr>' +
    /* CTA */
    '<tr><td style="padding:26px 40px 40px 40px;" align="center">' +
    '<p style="margin:0 0 16px 0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:' +
    C.ash +
    ';">Need to reach us sooner? Give us a call — we\'re available 24/7.</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" style="border-radius:999px; background-color:' +
    C.primary +
    ';">' +
    '<a href="tel:+16046493804" style="display:inline-block; padding:15px 32px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; letter-spacing:.3px;">Call 604-649-3804</a>' +
    "</td></tr></table>" +
    "</td></tr>" +
    /* footer */
    '<tr><td style="background-color:' +
    C.brandDark +
    '; padding:26px 40px;" align="center">' +
    '<p style="margin:0 0 6px 0; font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:bold; color:#ffffff;">Mint Clean Building Maintenance Ltd.</p>' +
    '<p style="margin:0 0 4px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#bcd6ce;">170-422 Richards Street, Vancouver, BC V6B 2Z4</p>' +
    '<p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#bcd6ce;">info@mintclean.ca &nbsp;&middot;&nbsp; 604-649-3804</p>' +
    "</td></tr>" +
    "</table>" +
    "</td></tr>" +
    "</table>" +
    "</body>" +
    "</html>";

  const text =
    "Thanks, " +
    firstName(params.firstName) +
    " — we've got your request.\n\n" +
    "A member of the Mint Clean team will review your property details and reach out shortly with a customized quote.\n\n" +
    "What you sent us:\n" +
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
    "\n" +
    "Details: " +
    (params.details || "-") +
    "\n\n" +
    "Need to reach us sooner? Call 604-649-3804 (24/7).\n\n" +
    "Mint Clean Building Maintenance Ltd.\n" +
    "170-422 Richards Street, Vancouver, BC V6B 2Z4\n" +
    "info@mintclean.ca";

  return { subject, html, text };
}
