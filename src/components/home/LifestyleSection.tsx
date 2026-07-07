import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function LifestyleSection() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <ImagePlaceholder
              label="REPLACE: Large lifestyle editorial — model in Klark essentials, urban or studio setting, black and beige tones, magazine-quality composition"
              aspectRatio="landscape"
              size="lg"
            />
          </div>
          <div className="space-y-4 lg:space-y-6">
            <ImagePlaceholder
              label="REPLACE: Lifestyle detail shot — close-up of henley fabric, hands adjusting collar, premium feel"
              aspectRatio="square"
            />
            <ImagePlaceholder
              label="REPLACE: Lifestyle shot — model walking or candid moment wearing Klark ringer tee, natural light"
              aspectRatio="square"
            />
          </div>
        </div>
        <p className="font-serif text-2xl sm:text-3xl text-center mt-12 lg:mt-16 text-klark-grey italic max-w-2xl mx-auto">
          &ldquo;Confidence isn&apos;t loud. It&apos;s in the details.&rdquo;
        </p>
      </div>
    </section>
  );
}
