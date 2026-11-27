import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { PolicyDocument } from "@/data/policies";

export function PolicyLayout({ policy }: { policy: PolicyDocument }) {
  return (
    <div className="bg-surface text-ink">
      <div className="mx-auto max-w-[1120px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
        <header className="max-w-[70ch] border-b border-border pb-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Policy · {policy.lastUpdated}
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            {policy.title}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{policy.subtitle}</p>
          <p className="mt-3 inline-block rounded-full border border-border bg-surface-muted px-3.5 py-1 text-xs font-medium text-ink-soft">
            {policy.reviewNote}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <nav
              aria-label="On this page"
              className="rounded-[20px] border border-border bg-surface-elevated p-5 lg:sticky lg:top-24"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
                Contents
              </p>
              <ul className="mt-3 space-y-1">
                {policy.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="inline-flex min-h-[44px] items-center text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
                  All Policies
                </p>
                <ul className="mt-2 space-y-1">
                  {siteConfig.policyLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center text-sm text-ink-soft hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          <div className="space-y-8 lg:col-span-8">
            {policy.sections.map((sec) => (
              <section key={sec.id} id={sec.id} aria-labelledby={`h-${sec.id}`}>
                <h2
                  id={`h-${sec.id}`}
                  className="font-display text-xl font-bold text-ink"
                >
                  {sec.heading}
                </h2>
                <div className="mt-3 space-y-3 text-base text-ink-soft">
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="max-w-[65ch]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
