import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: `FAQ — ${siteConfig.name}`,
  description:
    "Answers on ordering CRUNCHÉ chin chin via WhatsApp, nationwide Nigeria delivery, allergens, storage, and custom gift boxes.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-surface text-ink">
      <JsonLd data={faqJsonLd} />
      <section className="mx-auto max-w-[920px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
          Frequently Asked Questions
        </p>
        <h1
          className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
          style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
        >
          Everything you need to know
        </h1>
        <p className="mt-3 max-w-[60ch] text-lg text-ink-soft">
          Quick answers on ordering, delivery across Nigeria, allergens, storage, and custom event packs.
        </p>

        <div className="mt-10">
          <FaqAccordion />
        </div>

        <div className="mt-12 rounded-[20px] border border-border bg-surface-muted p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Still have a question?
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Message us on WhatsApp or send a custom bulk quote request.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-caramel px-5 py-2.5 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink sm:mt-0"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
