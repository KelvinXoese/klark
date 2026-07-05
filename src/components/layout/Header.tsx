"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=henleys", label: "Henleys" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-klark-white/95 backdrop-blur-sm border-b border-klark-grey-light">
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 sm:h-20 max-w-[1600px] mx-auto">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px bg-klark-black transition-all duration-300",
                  menuOpen && "rotate-45 translate-y-[3.5px]"
                )}
              />
              <span
                className={cn(
                  "block h-px bg-klark-black transition-all duration-300",
                  menuOpen && "-rotate-45 -translate-y-[3.5px]"
                )}
              />
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase text-klark-black hover:opacity-60 transition-opacity duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/klark-logo.png"
              alt="Klark"
              width={80}
              height={80}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/shop"
              className="hidden sm:block font-sans text-xs tracking-widest uppercase text-klark-black hover:opacity-60 transition-opacity duration-300"
            >
              Shop All
            </Link>
            <button
              onClick={openCart}
              className="relative font-sans text-xs tracking-widest uppercase text-klark-black hover:opacity-60 transition-opacity duration-300"
              aria-label="Open cart"
            >
              Cart
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-4 w-4 h-4 bg-klark-black text-klark-white text-[10px] flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-klark-grey-light bg-klark-white animate-fade-in">
          <nav className="section-padding py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm tracking-widest uppercase py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
