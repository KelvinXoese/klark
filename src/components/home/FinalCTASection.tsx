import { LinkButton } from "@/components/ui/LinkButton";

export function FinalCTASection() {
  return (
    <section className="section-padding py-20 lg:py-32 bg-klark-black text-klark-white text-center">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
          Upgrade your essentials.
        </h2>
        <p className="font-sans text-klark-grey-light mb-10 leading-relaxed">
          Premium quality. Perfect fit. Delivered with care. Start with our
          Henleys — the foundation of every wardrobe.
        </p>
        <LinkButton
          href="/shop?category=henleys"
          className="!bg-klark-white !text-klark-black hover:!bg-klark-beige-muted"
        >
          Shop Now
        </LinkButton>
      </div>
    </section>
  );
}
