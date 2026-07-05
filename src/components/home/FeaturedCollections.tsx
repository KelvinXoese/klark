import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

export function FeaturedCollections() {
  const sorted = [...CATEGORIES].sort((a, b) => a.priority - b.priority);

  return (
    <section className="section-padding section-spacing">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-section mb-4">Featured Collections</h2>
          <p className="body-large max-w-lg mx-auto">
            Premium essentials, curated for the modern man.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {sorted.map((category, index) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className={cn(
                "group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-klark-grey-light transition-all duration-500 hover:border-klark-black",
                index === 0 && "lg:grid-cols-5",
                index === 0 && "[&>div:first-child]:lg:col-span-3",
                index === 0 && "[&>div:last-child]:lg:col-span-2"
              )}
            >
              <div className="relative overflow-hidden">
                <ImagePlaceholder
                  label={category.imagePlaceholder}
                  aspectRatio={index === 0 ? "landscape" : "portrait"}
                  className="h-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div
                className={cn(
                  "flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-klark-white",
                  index === 0 ? "lg:p-20" : ""
                )}
              >
                {index === 0 && (
                  <span className="font-sans text-xs tracking-widest uppercase text-klark-grey mb-4">
                    Primary Collection
                  </span>
                )}
                <h3
                  className={cn(
                    "font-serif font-light mb-4",
                    index === 0 ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
                  )}
                >
                  {category.name}
                </h3>
                <p className="font-serif text-lg text-klark-grey mb-2 italic">
                  {category.tagline}
                </p>
                <p className="body-large mb-8">{category.description}</p>
                <span className="font-sans text-xs tracking-widest uppercase group-hover:opacity-60 transition-opacity duration-300">
                  Shop {category.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
