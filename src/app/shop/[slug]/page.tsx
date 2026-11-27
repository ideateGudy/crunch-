import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ProductDetailView } from "@/components/ProductDetailView";
import { siteConfig } from "@/config/site";
import { flavours, getFlavourBySlug } from "@/data/flavours";

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const flavour = getFlavourBySlug(slug);
  if (!flavour) {
    return { title: `Flavour not found — ${siteConfig.name}` };
  }
  return {
    title: `${flavour.name} Chin Chin — ${siteConfig.name}`,
    description: flavour.description,
    alternates: { canonical: `/shop/${flavour.slug}` },
    openGraph: {
      title: `${flavour.name} Chin Chin — ${siteConfig.name}`,
      description: flavour.description,
      images: flavour.images[0] ? [{ url: flavour.images[0].src, alt: flavour.images[0].alt }] : undefined,
    },
  };
}

async function ProductDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flavour = getFlavourBySlug(slug);
  if (!flavour) {
    notFound();
  }
  const related = flavours.filter((f) => f.slug !== flavour.slug);

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${flavour.name} Chin Chin`,
    description: flavour.description,
    image: flavour.images.map((i) => `${siteConfig.url}${i.src}`),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: flavour.sizes.map((s) => ({
      "@type": "Offer",
      name: `${flavour.name} (${s.size})`,
      price: s.priceNgn,
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/shop/${flavour.slug}`,
    })),
  };

  if (siteConfig.reviews.rating !== null && siteConfig.reviews.reviewCount !== null) {
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.reviews.rating,
      reviewCount: siteConfig.reviews.reviewCount,
    };
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteConfig.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: flavour.name,
        item: `${siteConfig.url}/shop/${flavour.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetailView flavour={flavour} related={related} />
    </>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-10">
          <div className="h-[480px] rounded-[28px] border border-border bg-surface-elevated" />
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
