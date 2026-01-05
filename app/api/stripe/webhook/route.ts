import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return new Response("Missing webhook secret", { status: 400 });

  const rawBody = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;
    const md = session.metadata || {};

    await prisma.order.upsert({
      where: { stripeSessionId: session.id },
      update: {
        paymentIntentId: session.payment_intent?.toString?.() || null,
        status: "paid"
      },
      create: {
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent?.toString?.() || null,

        email: md.email || session.customer_details?.email || "unknown",
        fullName: md.fullName || session.customer_details?.name || "Cliente",
        phone: md.phone || session.customer_details?.phone || null,

        address1: md.address1 || "",
        address2: md.address2 || null,
        city: md.city || "",
        province: md.province || "",
        postalCode: md.postalCode || "",
        country: md.country || "ES",

        productSku: md.sku || "SKU",
        productName: md.productName || "Producto",
        unitPriceCents: Number(md.unitPriceCents || 0),
        quantity: Number(md.quantity || 1),
        shippingCents: Number(md.shippingCents || 0),
        totalCents: Number(md.totalCents || 0),

        status: "paid"
      }
    });
  }

  return new Response("ok", { status: 200 });
}