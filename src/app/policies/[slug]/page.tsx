import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { PolicyLayout } from "@/components/PolicyLayout";
import { siteConfig } from "@/config/site";
import { policies, type PolicyDocument } from "@/data/policies";

const POLICY_SLUGS = Object.keys(policies) as PolicyDocument["slug"][];

export function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug as PolicyDocument["slug"]];
  if (!policy) {
    return { title: `Policy not found — ${siteConfig.name}` };
  }
  return {
    title: `${policy.title} — ${siteConfig.name}`,
    description: policy.subtitle,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

async function PolicyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policies[slug as PolicyDocument["slug"]];
  if (!policy) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: policy.title,
        item: `${siteConfig.url}/policies/${policy.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PolicyLayout policy={policy} />
    </>
  );
}

export default function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 lg:px-10">
          <div className="h-[320px] rounded-[20px] border border-border bg-surface-elevated" />
        </div>
      }
    >
      <PolicyContent params={params} />
    </Suspense>
  );
}
