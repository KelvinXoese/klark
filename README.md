# Klark — Premium Men's Essentials E-Commerce

A high-end, minimalist luxury e-commerce website for **Klark**, a premium menswear brand focused on Henleys, Ringer Tees, and Polos.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **State:** Zustand (cart + wishlist)
- **Hosting:** Vercel-ready
- **Orders:** JSON file storage (upgrade to PostgreSQL/Supabase for production scale)

## Features

- Premium minimalist UI (Apple × COS aesthetic)
- Guest checkout — no sign-up required
- Mobile Money + Card payment selection
- Cart slide-out drawer + wishlist
- Shop filters (category, size, color)
- Product pages with fit/fabric details
- Admin panel for orders + product overview
- SEO optimized with structured data
- Fully responsive, mobile-first

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Image Placeholders

Every product and lifestyle image uses a labeled placeholder component. Search for `REPLACE:` in the codebase to find every image you need to add.

Replace placeholders by:
1. Adding images to `/public/images/products/`
2. Updating `src/lib/data.ts` with image paths
3. Or swapping `ImagePlaceholder` with Next.js `Image` components

**Logo:** Already placed at `/public/images/klark-logo.png`

## Environment Variables

Copy `.env.example` to `.env.local`:

```
ADMIN_SECRET_KEY=your-secret-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

For production orders at scale, connect PostgreSQL (Supabase) and replace the JSON order storage in `src/lib/orders.ts`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/shop` | Product grid with filters |
| `/product/[slug]` | Product detail |
| `/about` | Brand story |
| `/checkout` | Guest checkout |
| `/order-confirmation` | Order success |
| `/admin` | Admin panel |

## Brand

- **Slogan:** Essentials Done Right.
- **Promise:** Premium quality. Perfect fit. Delivered with care.
- **Priority:** Henleys → Ringer Tees → Polos
