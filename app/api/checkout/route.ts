import { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCT, SHIPPING } from "@/lib/product";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return Response.json({ error: "Bad request" }, { status: 400 });

  const { quantity, customer } = body as {
    quantity: number;
    customer: {
      email: string;
      fullName: string;
      phone?: string;
      address1: string;
      address2?: string;
      city: string;
      province: string;
      postalCode: string;
      country?: string;
    };
  };

  const q = Math.max(1, Math.min(5, Number(quantity || 1)));
  const subtotal = PRODUCT.priceCents * q;
  const shipping = subtotal >= SHIPPING.freeOverCents ? 0 : SHIPPING.flatCents;
  const total = subtotal + shipping;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    customer_email: customer.email,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: PRODUCT.name },
          unit_amount: PRODUCT.priceCents
        },
        quantity: q
      },
      ...(shipping > 0
        ? [
            {
              price_data: {
                currency: "eur",
                product_data: { name: "Envío" },
                unit_amount: shipping
              },
              quantity: 1
            }
          ]
        : [])
    ],
    metadata: {
      sku: PRODUCT.sku,
      productName: PRODUCT.name,
      unitPriceCents: String(PRODUCT.priceCents),
      quantity: String(q),
      shippingCents: String(shipping),
      totalCents: String(total),

      email: customer.email,
      fullName: customer.fullName,
      phone: customer.phone || "",
      address1: customer.address1,
      address2: customer.address2 || "",
      city: customer.city,
      province: customer.province,
      postalCode: customer.postalCode,
      country: customer.country || "ES"
    }
  });

  return Response.json({ url: session.url });
}