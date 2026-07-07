import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

const FOOTER_LINKS = {
  shop: [
    { href: "/shop?category=henleys", label: "Henleys" },
    { href: "/shop?category=ringer-tees", label: "Ringer Tees" },
    { href: "/shop?category=polos", label: "Polos" },
    { href: "/shop", label: "All Products" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/checkout", label: "Checkout" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-klark-black text-klark-white">
      <div className="section-padding section-spacing">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <Image
                src="/images/klark-logo.png"
                alt="Klark"
                width={100}
                height={100}
                className="h-14 w-auto brightness-0 invert mb-6"
              />
              <p className="font-sans text-sm text-klark-beige-muted leading-relaxed">
                {`Essentials Done Right.`}
              </p>
              <p className="font-sans text-xs text-klark-grey mt-4 tracking-wide">
                Premium quality. Perfect fit. Delivered with care.
              </p>
            </div>

            <div>
              <h4 className="font-sans text-xs tracking-widest uppercase mb-6 text-klark-beige-muted">
                Shop
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-xs tracking-widest uppercase mb-6 text-klark-beige-muted">
                Company
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-xs tracking-widest uppercase mb-6 text-klark-beige-muted">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SITE.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.snapchat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                  >
                    Snapchat
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@klark.com"
                    className="font-sans text-sm text-klark-grey-light hover:text-klark-white transition-colors duration-300"
                  >
                    hello@klark.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-klark-grey/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-klark-grey tracking-wide">
              © {new Date().getFullYear()} Klark. All rights reserved.
            </p>
            <p className="font-sans text-xs text-klark-grey tracking-wide">
              Accra, Ghana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
