import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { flavours } from "@/data/flavours";
import { policies } from "@/data/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/shop",
    "/gifting",
    "/our-story",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const flavourRoutes = flavours.map((f) => ({
    url: `${base}/shop/${f.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const policyRoutes = Object.keys(policies).map((slug) => ({
    url: `${base}/policies/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...flavourRoutes, ...policyRoutes];
}
