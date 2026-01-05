import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const body = await req.json().catch(() => null);
  if (!body) return Response.json({ error: "Bad request" }, { status: 400 });

  const { status, trackingNumber, carrier, notes } = body;

  const order = await prisma.order.update({
    where: { id: ctx.params.id },
    data: {
      status: status ?? undefined,
      trackingNumber: trackingNumber ?? undefined,
      carrier: carrier ?? undefined,
      notes: notes ?? undefined
    }
  });

  return Response.json({ order });
}