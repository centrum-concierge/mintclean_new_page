import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { footerServiceLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Logo className="h-16 sm:h-20" />
          <p className="max-w-sm text-sm text-white/70">
            Commercial and residential strata building maintenance across
            Greater Vancouver &mdash; professionalism, reliability, and
            attention to detail at our core.
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-primary">
              <Phone className="size-4 shrink-0" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail className="size-4 shrink-0" /> {site.email}
            </a>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {site.address.line1}, {site.address.city} {site.address.postal}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
            Mint Clean
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/contact#careers" className="hover:text-primary">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
            Services
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 border-t border-white/10 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-center sm:gap-6 sm:px-6 lg:px-8">
        <span>&copy; {new Date().getFullYear()} Mint Clean. {site.legalName}</span>
        <div className="flex gap-5">
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <CookieSettingsButton className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </footer>
  );
}
