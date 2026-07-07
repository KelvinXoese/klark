import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import type {
  CartItem,
  Order,
  OrderStatus,
  PaymentMethod,
} from "@/lib/types";
import type { Order as PrismaOrder, OrderItem as PrismaOrderItem } from "@prisma/client";

type PrismaOrderWithItems = PrismaOrder & { items: PrismaOrderItem[] };

function toOrder(o: PrismaOrderWithItems): Order {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    createdAt: o.createdAt.toISOString(),
    status: o.status as OrderStatus,
    customer: {
      fullName: o.fullName,
      phone: o.phone,
      email: o.email ?? undefined,
      address: o.address,
    },
    items: o.items.map((item) => ({
      productId: item.productId ?? item.id,
      slug: item.slug,
      name: item.name,
      price: Number(item.price),
      size: item.size as CartItem["size"],
      color: item.color,
      quantity: item.quantity,
      imagePlaceholder: item.imagePlaceholder,
    })),
    paymentMethod: o.paymentMethod as PaymentMethod,
    subtotal: Number(o.subtotal),
    deliveryFee: Number(o.deliveryFee),
    total: Number(o.total),
    currency: o.currency,
  };
}

export type CreateOrderInput = {
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
  currency: string;
};

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      status: "pending",
      fullName: input.customer.fullName,
      phone: input.customer.phone,
      email: input.customer.email || null,
      address: input.customer.address,
      paymentMethod: input.paymentMethod,
      subtotal: input.subtotal,
      deliveryFee: input.deliveryFee,
      total: input.total,
      currency: input.currency,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId || null,
          slug: item.slug,
          name: item.name,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          imagePlaceholder: item.imagePlaceholder,
        })),
      },
    },
    include: { items: true },
  });

  return toOrder(order);
}

export async function listOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return orders.map(toOrder);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order> {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true },
  });
  return toOrder(order);
}
