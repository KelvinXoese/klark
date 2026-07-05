import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/orders";
import { generateId, generateOrderNumber } from "@/lib/utils";
import { SITE } from "@/lib/data";
import type { CartItem, PaymentMethod } from "@/lib/types";

type OrderPayload = {
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: CartItem[];
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json();

    if (
      !body.customer?.fullName ||
      !body.customer?.phone ||
      !body.customer?.address
    ) {
      return NextResponse.json(
        { error: "Missing required customer details" },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      status: "pending" as const,
      customer: body.customer,
      items: body.items,
      paymentMethod: body.paymentMethod,
      subtotal: body.subtotal,
      deliveryFee: body.deliveryFee,
      total: body.total,
      currency: SITE.currency,
    };

    const orders = await readOrders();
    orders.push(order);
    await writeOrders(orders);

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const adminKey = request.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_SECRET_KEY;

  if (!expectedKey || adminKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await readOrders();
  return NextResponse.json({ orders });
}
