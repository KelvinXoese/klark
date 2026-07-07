import type { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Klark collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-klark-grey mb-6">
            Legal
          </p>
          <h1 className="heading-section mb-4">Privacy &amp; Cookie Policy</h1>
          <p className="font-sans text-xs text-klark-grey mb-12">
            Last updated: {lastUpdated}
          </p>

          <div className="space-y-10 font-sans text-sm leading-relaxed text-klark-black">
            <PolicySection title="1. Who We Are">
              <p>
                Klark (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a
                menswear brand based in Accra, Ghana. This policy explains how
                we collect, use, and protect your personal data when you use
                {` ${SITE.name}`} and place an order with us.
              </p>
            </PolicySection>

            <PolicySection title="2. Information We Collect">
              <p>When you place an order as a guest, we collect:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address (optional)</li>
                <li>Delivery address</li>
                <li>Order details (items, sizes, colours, quantities, total)</li>
                <li>Your chosen payment method (Mobile Money or Card)</li>
              </ul>
              <p className="mt-2">
                We do not require you to create an account, and we do not
                collect payment card numbers or Mobile Money PINs directly —
                these are handled at the point of payment, not stored by us.
              </p>
            </PolicySection>

            <PolicySection title="3. How We Use Your Information">
              <p>We use your information only to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Process and fulfil your order</li>
                <li>Contact you about delivery or payment (e.g. Mobile Money instructions)</li>
                <li>Respond to customer service enquiries</li>
                <li>Meet legal and accounting obligations</li>
              </ul>
              <p className="mt-2">
                We do not sell or rent your personal information to third
                parties, and we do not use your order details for advertising.
              </p>
            </PolicySection>

            <PolicySection title="4. Cookies & Local Storage">
              <p>
                {SITE.name} does not currently use tracking or advertising
                cookies, and we do not run third-party analytics on this
                site.
              </p>
              <p className="mt-2">
                We do use your browser&apos;s local storage (not a cookie) to
                remember the contents of your shopping cart and wishlist
                between visits. This information stays on your device and is
                not sent to our servers until you complete checkout.
              </p>
              <p className="mt-2">
                If this changes in the future — for example, if we add
                analytics or advertising tools — we will update this policy
                and, where required, ask for your consent first.
              </p>
            </PolicySection>

            <PolicySection title="5. Who We Share Data With">
              <p>We may share limited order data with:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Delivery/logistics partners, to deliver your order</li>
                <li>
                  Payment processors (Mobile Money networks or card payment
                  providers), to complete your payment
                </li>
              </ul>
              <p className="mt-2">
                We do not share your data with anyone else except where
                required by law.
              </p>
            </PolicySection>

            <PolicySection title="6. Data Storage & Security">
              <p>
                Order information is stored securely and is only accessible
                to authorised Klark staff via a password-protected admin
                area. We take reasonable technical measures to protect your
                data, but no online system can be guaranteed 100% secure.
              </p>
            </PolicySection>

            <PolicySection title="7. Your Rights">
              <p>
                Under Ghana&apos;s Data Protection Act, 2012 (Act 843), you
                have the right to ask us what personal data we hold about
                you, request a correction, or request deletion, subject to
                our legal obligations (for example, order records we must
                keep for accounting purposes). To make a request, contact us
                at{" "}
                <a
                  href="mailto:hello@klark.com"
                  className="underline hover:text-klark-grey"
                >
                  hello@klark.com
                </a>
                .
              </p>
            </PolicySection>

            <PolicySection title="8. Changes to This Policy">
              <p>
                We may update this policy from time to time as Klark grows.
                Changes will be posted on this page with an updated date.
              </p>
            </PolicySection>

            <PolicySection title="9. Contact Us">
              <p>
                Questions about this policy or your data? Email us at{" "}
                <a
                  href="mailto:hello@klark.com"
                  className="underline hover:text-klark-grey"
                >
                  hello@klark.com
                </a>
                .
              </p>
            </PolicySection>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-xl mb-3">{title}</h2>
      {children}
    </div>
  );
}
