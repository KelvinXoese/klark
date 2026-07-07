import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { WhyKlarkSection } from "@/components/home/WhyKlarkSection";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { SocialSection } from "@/components/home/SocialSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { SITE } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  slogan: SITE.slogan,
  areaServed: {
    "@type": "Country",
    name: "Ghana",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <FeaturedCollections />
      <WhyKlarkSection />
      <LifestyleSection />
      <SocialSection />
      <FinalCTASection />
    </>
  );
}
