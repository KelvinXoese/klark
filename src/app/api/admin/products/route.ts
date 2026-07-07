import { NextRequest, NextResponse } from "next/server";
import { createProduct, getAllProducts, type ProductInput } from "@/lib/products";

function isAuthorized(request: NextRequest): boolean {
  const adminKey = request.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_SECRET_KEY;
  return Boolean(expectedKey) && adminKey === expectedKey;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: ProductInput = await request.json();

    if (!body.slug || !body.name || !body.category || body.price == null) {
      return NextResponse.json(
        { error: "Missing required fields: slug, name, category, price" },
        { status: 400 }
      );
    }

    const product = await createProduct(body);
    return NextResponse.json({ success: true, product });
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message.includes("Unique constraint")
        ? "A product with this slug already exists"
        : "Failed to create product";
    console.error("Failed to create product:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
