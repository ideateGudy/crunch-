import { BenefitsStrip } from "@/components/BenefitsStrip";
import { FlavoursShowcase } from "@/components/FlavoursShowcase";
import { GiftingTeaser } from "@/components/GiftingTeaser";
import { HeroSection } from "@/components/HeroSection";
import { JsonLd } from "@/components/JsonLd";
import { ProcessSection } from "@/components/ProcessSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ScrollVideoSection } from "@/components/ScrollVideoSection";
import { StoryTeaser } from "@/components/StoryTeaser";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <HeroSection />
      <FlavoursShowcase />
      <BenefitsStrip />
      <ScrollVideoSection />
      <ProcessSection />
      <StoryTeaser />
      <GiftingTeaser />
      <ReviewsSection />
    </>
  );
}
