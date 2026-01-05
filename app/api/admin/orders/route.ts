import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200
  });

  return Response.json({ orders });
}