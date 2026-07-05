import { REVIEWS } from "@/lib/data";

export function ReviewsSection() {
  return (
    <section className="section-padding section-spacing bg-klark-white border-y border-klark-grey-light">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-4">What Our Customers Say</h2>
          <p className="body-large">Real feedback from men who wear Klark.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.id}
              className="p-8 lg:p-10 border border-klark-grey-light"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-klark-black text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-sans text-sm leading-relaxed text-klark-black mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="font-sans text-xs text-klark-grey">
                <span className="text-klark-black">{review.name}</span>
                {" · "}
                {review.location}
                <span className="block mt-1">{review.product}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
