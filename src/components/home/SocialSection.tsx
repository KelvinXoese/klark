import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SITE } from "@/lib/data";

const INSTAGRAM_PLACEHOLDERS = [
  "REPLACE: Instagram post — customer or model wearing Klark henley, square crop, lifestyle",
  "REPLACE: Instagram post — flat lay of Klark essentials, minimal styling",
  "REPLACE: Instagram post — detail shot of ringer tee trim, square crop",
  "REPLACE: Instagram post — model in polo, urban setting, square crop",
  "REPLACE: Instagram post — behind-the-scenes or packaging shot, premium unboxing",
  "REPLACE: Instagram post — customer style shot wearing Klark, candid feel",
];

export function SocialSection() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="heading-section mb-2">{SITE.social.instagram.handle}</h2>
            <p className="body-large">Follow our journey on Instagram</p>
          </div>
          <a
            href={SITE.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase hover:opacity-60 transition-opacity duration-300"
          >
            Follow Us →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4">
          {INSTAGRAM_PLACEHOLDERS.map((label, i) => (
            <div key={i} className="overflow-hidden group">
              <ImagePlaceholder
                label={label}
                aspectRatio="square"
                size="sm"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
