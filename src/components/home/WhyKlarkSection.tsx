import { WHY_KLARK } from "@/lib/data";

export function WhyKlarkSection() {
  return (
    <section className="section-padding section-spacing bg-klark-beige">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-4">Why Klark</h2>
          <p className="body-large max-w-lg mx-auto">
            Built on a simple belief: essentials should never feel ordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {WHY_KLARK.map((item, index) => (
            <div
              key={item.title}
              className="text-center lg:text-left animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-serif text-4xl text-klark-grey-light block mb-4">
                0{index + 1}
              </span>
              <h3 className="font-serif text-xl mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-klark-grey leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
