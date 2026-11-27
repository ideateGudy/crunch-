import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ShopCatalogue } from "@/components/ShopCatalogue";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Shop — ${siteConfig.name}`,
  description:
    "Browse all five CRUNCHÉ chin chin flavours in 100g, 250g, 500g, and 1kg packs, plus Classic, Celebration, and Corporate gift boxes.",
  alternates: { canonical: "/shop" },
};

function ShopLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading catalogue">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="h-[360px] rounded-[20px] border border-border bg-surface-elevated p-4"
        />
      ))}
    </div>
  );
}

export default function ShopPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteConfig.url}/shop` },
    ],
  };

  return (
    <div className="bg-surface text-ink">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="mx-auto max-w-[1280px] px-4 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-6 lg:px-10">
        <div className="max-w-[640px]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-caramel-ink">
            Shop Range
          </p>
          <h1
            className="mt-2 font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "var(--text-2xl)", lineHeight: 1.02 }}
          >
            All flavours &amp; gift boxes
          </h1>
          <p className="mt-3 text-ink-soft">
            Pick your flavour, choose a pack size, and tap Order on WhatsApp to start your order.
          </p>
        </div>

        <div className="mt-8">
          <Suspense fallback={<ShopLoadingSkeleton />}>
            <ShopCatalogue />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
