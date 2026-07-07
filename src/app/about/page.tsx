import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Klark — premium men's essentials from Ghana. Craftsmanship, fit, and simplicity for the modern man.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-klark-grey mb-6">
              Our Story
            </p>
            <h1 className="heading-section mb-8">
              Essentials done
              <br />
              right.
            </h1>
            <div className="space-y-6 body-large">
              <p>
                Klark was born from a simple frustration: why is it so hard to
                find well-made basics that fit properly? We set out to change
                that — starting in Ghana, with a vision to become the most
                trusted premium menswear destination in the country.
              </p>
              <p>
                We focus on what matters. Henleys, ringer tees, and polos —
                the foundation of every man&apos;s wardrobe. No trend-chasing,
                no logo overload. Just timeless pieces built to last.
              </p>
            </div>
          </div>
          <ImagePlaceholder
            label="REPLACE: About page hero — brand story image, workshop or studio setting showing craftsmanship, or model in Klark essentials, warm muted tones"
            aspectRatio="portrait"
            size="lg"
          />
        </div>
      </section>

      <section className="section-padding section-spacing bg-klark-beige">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h2 className="font-serif text-2xl mb-4">Craftsmanship</h2>
              <p className="font-sans text-sm text-klark-grey leading-relaxed">
                Every garment is selected and tested for fabric quality,
                construction, and durability. We partner with makers who share
                our standards — nothing less than premium.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">Fit</h2>
              <p className="font-sans text-sm text-klark-grey leading-relaxed">
                Fit is everything. Our pieces are designed with modern
                proportions — close where it matters, comfortable where you
                need it. True to size, with clear guidance on every product.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">Simplicity</h2>
              <p className="font-sans text-sm text-klark-grey leading-relaxed">
                We believe confidence comes from simplicity. Clean lines, neutral
                palettes, and details that whisper rather than shout. Wear Klark
                anywhere — it always belongs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImagePlaceholder
            label="REPLACE: Craftsmanship detail — hands inspecting fabric, stitching close-up, or quality control moment"
            aspectRatio="landscape"
          />
          <ImagePlaceholder
            label="REPLACE: Fit focus — model showing proper fit of henley, side profile, tailored silhouette"
            aspectRatio="landscape"
          />
        </div>
      </section>

      <section className="section-padding py-20 lg:py-28 bg-klark-black text-klark-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6">
            Premium quality. Perfect fit. Delivered with care.
          </h2>
          <p className="font-sans text-klark-grey-light mb-10 leading-relaxed">
            This is our promise. Every order, every garment, every delivery.
          </p>
          <LinkButton
            href="/shop?category=henleys"
            className="!bg-klark-white !text-klark-black hover:!bg-klark-beige-muted"
          >
            Shop Henleys
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
