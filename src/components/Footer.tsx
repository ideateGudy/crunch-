import Link from "next/link";
import { Suspense } from "react";
import { CurrentYear } from "@/components/CurrentYear";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { formatPhone } from "@/lib/format";

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="mt-auto bg-band text-band-ink"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center"
              aria-label="CRUNCHÉ home"
            >
              <Logo tone="light" variant="wordmark" size={34} />
            </Link>
            <p className="mt-3 max-w-[32ch] text-sm text-band-ink/80">
              {siteConfig.tagline} Freshly made Nigerian chin chin crafted for sharing, gifting, and everyday crunch.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-band-ink/85 transition-colors hover:text-band-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
              Policies
            </h2>
            <ul className="mt-4 space-y-1">
              {siteConfig.policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-band-ink/85 transition-colors hover:text-band-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
              Contact &amp; Socials
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-band-ink/85">
              <li>Phone: {formatPhone(siteConfig.contact.phone)}</li>
              <li>WhatsApp: {formatPhone(siteConfig.contact.whatsapp)}</li>
              <li>Email: {siteConfig.contact.email}</li>
              <li>Address: {siteConfig.contact.address}</li>
              <li>Instagram: {siteConfig.contact.instagram}</li>
              <li>TikTok: {siteConfig.contact.tiktok}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-[20px] bg-band-elevated p-5 text-sm text-band-ink/85">
          <p className="font-semibold text-band-accent">Allergen Notice</p>
          <p className="mt-1">{siteConfig.allergenSummary}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-band-elevated pt-6 text-xs text-band-ink/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©{" "}
            <Suspense fallback="2026">
              <CurrentYear />
            </Suspense>{" "}
            {siteConfig.name}. All rights reserved.
          </p>
          <p>
            NDPA-aligned privacy practices.{" "}
            <Link
              href="/policies/privacy"
              className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:text-band-accent"
            >
              Read our Privacy Notice
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
