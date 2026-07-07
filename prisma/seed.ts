import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Seeding ${PRODUCTS.length} products...`);

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        currency: product.currency,
        description: product.description,
        fabric: product.fabric,
        fit: product.fit,
        care: product.care,
        delivery: product.delivery,
        sizes: product.sizes,
        colors: product.colors,
        imagePlaceholder: product.imagePlaceholder,
        hoverImagePlaceholder: product.hoverImagePlaceholder,
        galleryPlaceholders: product.galleryPlaceholders,
        featured: product.featured,
        inStock: product.inStock,
      },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
