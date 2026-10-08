import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { site } from "@/lib/site";

// When the policy text changes, update this date along with the content below.
const LAST_UPDATED = "October 8, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mint Clean collects, uses, and protects personal information through mintclean.ca, and the choices you have.",
};

const linkClass = "font-medium text-primary underline-offset-4 hover:underline";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">{children}</ul>;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

const cookieTypes = [
  {
    type: "Essential",
    purpose: "Site security and basic functions",
    setBy: "mintclean.ca",
    optOut: "No",
  },
  {
    type: "Analytics",
    purpose:
      "Measure traffic, how visitors find the site, and usage (Google Analytics 4)",
    setBy: "Google",
    optOut: "Yes",
  },
  {
    type: "Advertising",
    purpose:
      "Measure which ads lead to a quote request, and show our ads to you later on other sites (Google Ads conversion tracking and remarketing)",
    setBy: "Google",
    optOut: "Yes",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-brand-dark py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            MintClean Building Maintenance &middot; mintclean.ca
          </span>
          <h1 className="font-heading text-4xl font-black tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-white/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <article className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Section id="introduction" title="1. Introduction and scope">
          <p>
            This policy explains what personal information MintClean Building
            Maintenance (&ldquo;MintClean&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
            collects through mintclean.ca, why we collect it, and the choices
            you have. We are based in Vancouver, British Columbia, and handle
            personal information in line with applicable Canadian privacy
            laws, including British Columbia&apos;s Personal Information
            Protection Act (PIPA) and, where it applies, Canada&apos;s Personal
            Information Protection and Electronic Documents Act (PIPEDA).
          </p>
          <p>
            By using this website you acknowledge this policy. Where the law
            requires your consent, we obtain it. You can opt out of analytics
            and advertising cookies at any time, as described in{" "}
            <a href="#cookies" className={linkClass}>section 4</a>.
          </p>
          <p>
            <strong>Accountability.</strong> We are responsible for personal
            information under our control. Our Privacy Officer is listed in{" "}
            <a href="#contact" className={linkClass}>section 7</a>, and can
            answer any question about this policy.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information we collect">
          <p>
            <strong>Information you give us.</strong> When you request a quote
            or contact us by form, email, or phone, we collect your name, email
            address, phone number, property type, and the details of your
            enquiry.
          </p>
          <p>
            <strong>Job applications.</strong> If you apply for a position by
            emailing us your resume, we collect the information in it and use
            it to consider your application.
          </p>
          <p>
            <strong>Information collected automatically.</strong> When you
            visit mintclean.ca, cookies and similar technologies collect:
          </p>
          <List>
            <li>IP address and approximate location (city or region level)</li>
            <li>Device, browser, and operating system type</li>
            <li>Pages viewed, time on site, referring page, and clicks</li>
            <li>Advertising identifiers and whether you arrived from a Google ad</li>
          </List>
          <p>
            This data is usually not tied directly to your name, but it can
            still be personal information under applicable privacy laws when
            it can identify you in combination with other data.
          </p>
        </Section>

        <Section id="why-we-collect" title="3. Why we collect it, and your consent">
          <p>
            We collect personal information only for purposes a reasonable
            person would find appropriate, and we tell you those purposes at
            or before collection:
          </p>
          <List>
            <li>To respond to enquiries, give quotes, and deliver and bill for our services</li>
            <li>To consider job applications you send us</li>
            <li>To understand how visitors use mintclean.ca so we can improve it (analytics)</li>
            <li>
              To measure and run our advertising, including showing our ads to
              people who visited the site (Google Ads and remarketing)
            </li>
            <li>To meet legal, tax, and safety obligations</li>
          </List>
          <p>
            <strong>Consent.</strong> We rely on your consent to collect, use,
            or share personal information. For analytics and advertising
            cookies, we give you clear notice when you first visit and an easy
            way to opt out at any time (see{" "}
            <a href="#cookies" className={linkClass}>section 4</a>). You can
            withdraw consent at any time (see{" "}
            <a href="#contact" className={linkClass}>section 7</a>). We do not
            use your information for a new purpose without telling you and,
            where required, asking again.
          </p>
        </Section>

        <Section id="cookies" title="4. Cookies, Google tools, and your choices">
          <p>
            Cookies are small files stored on your device. We use three types:
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-muted text-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Set by</th>
                  <th scope="col" className="px-4 py-3 font-semibold">You can opt out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cookieTypes.map((row) => (
                  <tr key={row.type} className="align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-foreground">{row.type}</th>
                    <td className="px-4 py-3">{row.purpose}</td>
                    <td className="px-4 py-3">{row.setBy}</td>
                    <td className="px-4 py-3">{row.optOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            You can also block or delete cookies in your browser settings.
            Blocking essential cookies may stop parts of the site from working.
          </p>
          <p>
            <strong>Google&apos;s role.</strong> Google acts as a service
            provider for us, and also handles some data under its own privacy
            policy:{" "}
            <ExternalLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </ExternalLink>
            . Data may be processed in Canada, the United States, and other
            countries where Google operates.
          </p>
          <p><strong>How to opt out</strong></p>
          <List>
            <li>
              Opt out of analytics and advertising cookies using the cookie
              notice on our site, or change your choice at any time through
              the cookie settings link in our site footer (
              <CookieSettingsButton className={`${linkClass} cursor-pointer`} />
              )
            </li>
            <li>
              Turn off personalized ads in{" "}
              <ExternalLink href="https://adssettings.google.com/">Google Ads Settings</ExternalLink>
            </li>
            <li>
              Opt out of interest-based advertising from participating
              companies at{" "}
              <ExternalLink href="https://youradchoices.ca/">youradchoices.ca</ExternalLink>
            </li>
          </List>
        </Section>

        <Section id="sharing" title="5. Sharing and transfers outside Canada">
          <p>
            We do not sell your personal information. We share it only with:
          </p>
          <List>
            <li>
              Service providers that help us run the website, advertising, and
              our business, such as Google (analytics and advertising), our web
              hosting provider, and our marketing agency. They are required to
              protect it.
            </li>
            <li>Authorities or others where the law requires or permits it.</li>
          </List>
          <p>
            <strong>Transfers outside Canada.</strong> Google and some of our
            other providers store or process data in the United States and
            other countries. While there, the information is subject to the
            laws of those countries and may be accessed by their courts, law
            enforcement, and national security authorities. We use contracts
            and provider safeguards to protect it, but we cannot guarantee the
            same legal protection as in Canada.
          </p>
        </Section>

        <Section id="retention" title="6. Retention, safeguards, and breaches">
          <p>
            <strong>Retention.</strong> We keep personal information only as
            long as needed for the purposes described above, including to meet
            legal and tax requirements. Google Analytics data is kept for the
            retention period set in our GA4 account.
          </p>
          <p>
            <strong>Safeguards.</strong> We protect personal information with
            reasonable security safeguards appropriate to its sensitivity.
          </p>
          <p>
            <strong>Breaches.</strong> If a breach of security safeguards
            occurs, we will notify affected individuals and the appropriate
            privacy commissioner where applicable law requires.
          </p>
        </Section>

        <Section id="contact" title="7. Your rights, changes, and contact">
          <p>Under applicable privacy law you can:</p>
          <List>
            <li>Ask whether we hold personal information about you, and get access to it</li>
            <li>Ask us to correct information that is inaccurate or incomplete</li>
            <li>
              Withdraw your consent at any time, subject to legal or
              contractual limits (we will explain what that means for you)
            </li>
            <li>Challenge our compliance with this policy</li>
          </List>
          <p>
            We respond to access requests within the time required by law and
            generally at no charge. We may need to confirm your identity first.
          </p>
          <p>
            <strong>Children.</strong> Our website and services are not
            directed at children, and we do not knowingly collect their
            personal information.
          </p>
          <p>
            <strong>Changes.</strong> We may update this policy as our
            practices or the law change. The date at the top shows the latest
            version, and we will post notice of significant changes on this
            page.
          </p>
          <p><strong>Contact our Privacy Officer.</strong></p>
          <List>
            <li>Position: Privacy Officer</li>
            <li>
              Email:{" "}
              <a href={`mailto:${site.privacyEmail}`} className={linkClass}>
                {site.privacyEmail}
              </a>
            </li>
            <li>
              Mail: MintClean Building Maintenance, 170-422 Richards St,
              Vancouver, British Columbia, V6B 2Z4
            </li>
          </List>
          <p>
            <strong>Complaints.</strong> If we have not resolved your concern,
            you may contact the{" "}
            <ExternalLink href="https://www.oipc.bc.ca/">
              Office of the Information and Privacy Commissioner for British Columbia
            </ExternalLink>{" "}
            (oipc.bc.ca) or the{" "}
            <ExternalLink href="https://www.priv.gc.ca/">
              Office of the Privacy Commissioner of Canada
            </ExternalLink>
            .
          </p>
        </Section>
      </article>
    </>
  );
}
