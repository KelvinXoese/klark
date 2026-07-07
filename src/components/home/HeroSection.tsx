import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SITE } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="REPLACE: Full-width hero image — male model in Klark henley, editorial lifestyle shot, muted beige/grey tones, confident pose, luxury fashion magazine aesthetic"
          aspectRatio="hero"
          className="h-full !aspect-auto min-h-[90vh]"
          size="lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-klark-white/90 via-klark-white/70 to-transparent" />
      </div>

      <div className="relative section-padding w-full max-w-[1600px] mx-auto pt-24">
        <div className="max-w-xl animate-fade-in">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-klark-grey mb-6">
            {SITE.slogan}
          </p>
          <h1 className="heading-display mb-6">
            Essentials,
            <br />
            perfected.
          </h1>
          <p className="body-large mb-10 max-w-md">{SITE.promise}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <LinkButton href="/shop?category=henleys">Shop Henleys</LinkButton>
            <LinkButton href="/shop" variant="secondary">
              Explore Essentials
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
