import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders, updateOrderStatus } from "@/lib/orders";
import { SITE } from "@/lib/data";
import type { CartItem, OrderStatus, PaymentMethod } from "@/lib/types";

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

function isAuthorized(request: NextRequest): boolean {
  const adminKey = request.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_SECRET_KEY;
  return Boolean(expectedKey) && adminKey === expectedKey;
}

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

    const order = await createOrder({
      customer: body.customer,
      items: body.items,
      paymentMethod: body.paymentMethod,
      subtotal: body.subtotal,
      deliveryFee: body.deliveryFee,
      total: body.total,
      currency: SITE.currency,
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Failed to create order:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrders();
  return NextResponse.json({ orders });
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId, status } = (await request.json()) as {
      orderId: string;
      status: OrderStatus;
    };

    const validStatuses: OrderStatus[] = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ];

    if (!orderId || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid order ID or status" },
        { status: 400 }
      );
    }

    const order = await updateOrderStatus(orderId, status);
    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
