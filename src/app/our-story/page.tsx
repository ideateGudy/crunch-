import type { Metadata } from "next";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Our Story — ${siteConfig.name}`,
  description:
    "How CRUNCHÉ crafts freshly made Nigerian chin chin with small-batch discipline, honest ingredients, and strict kitchen hygiene.",
  alternates: { canonical: "/our-story" },
};

// TODO(client): confirm brand founding details and kitchen location before launch
const VALUES = [
  {
    title: "Honest Pantry",
    body: "Real butter, whole milk, sieved wheat flour, fresh eggs, and warm spices—no shortcuts on flavour.",
    Icon: Utensils,
  },
  {
    title: "Small-Batch Discipline",
    body: "Controlled frying temperatures and fresh oil rotation keep every cube crisp, golden, and dry to the touch.", // TODO(client): confirm kitchen process details
    Icon: Sparkles,
  },
  {
    title: "Clear Allergen Care",
    body: "Every pack and policy states exact allergen presence clearly so hosts and gift buyers can share with confidence.",
    Icon: ShieldCheck,
  },
] as const;

export default function OurStoryPage() {
  const whatsappHref = buildWhatsAppLink();

  return (
    <div className="bg-surface text-ink">
      <section className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,7rem)] sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
              Our Story
            </p>
            <h1
              className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
              style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
            >
              A Nigerian classic, crafted with quiet obsession
            </h1>
            <p className="mt-4 max-w-[60ch] text-lg text-ink-soft">
              CRUNCHÉ started with a simple standard: make chin chin that tastes like the very best homemade batch—every single time you open a pouch.
            </p>
            <p className="mt-3 max-w-[60ch] text-ink-soft">
              Whether it is a 100g pocket pack for the commute, a 1kg family tub for the weekend, or ribboned boxes for an owambe guest table, we treat every cube with care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-caramel px-6 py-3 text-sm font-semibold text-on-caramel transition-colors hover:bg-cocoa hover:text-band-ink"
              >
                <span>Explore flavours</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-border bg-surface-elevated">
              <Image
                src="/images/site/story/ingredients-1.webp"
                alt="Flour, butter, whole milk, nutmeg, and fresh ingredients for CRUNCHÉ chin chin"
                fill
                sizes="(max-width: 1023px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="values-heading"
        className="border-y border-border bg-surface-muted/60"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            What We Stand For
          </p>
          <h2
            id="values-heading"
            className="mt-2 font-display text-2xl font-bold text-ink"
          >
            Our Kitchen Standards
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map(({ title, body, Icon }) => (
              <div
                key={title}
                className="rounded-[20px] border border-border bg-surface-elevated p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-caramel text-on-caramel">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="allergen-hygiene-heading"
        className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10"
      >
        <div className="rounded-[28px] bg-band p-6 text-band-ink sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-band-accent">
            Hygiene &amp; Allergen Commitment
          </p>
          <h2
            id="allergen-hygiene-heading"
            className="mt-2 font-display text-2xl font-bold text-band-ink"
          >
            Transparency in every pack
          </h2>
          <p className="mt-3 max-w-[65ch] text-band-ink/85">
            {siteConfig.allergenSummary}
          </p>
          {siteConfig.nafdacNumber && (
            <p className="mt-3 text-sm text-band-accent">
              NAFDAC Reg. No.: {siteConfig.nafdacNumber}
            </p>
          )}
          <div className="mt-6">
            <Link
              href="/policies/allergens"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-[1.5px] border-band-ink px-5 py-2.5 text-sm font-semibold text-band-ink transition-colors hover:bg-band-ink/10"
            >
              <span>Read full Allergen Information</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
