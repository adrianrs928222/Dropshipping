import { NextRequest } from "next/server";

function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' }
  });
}

export function requireAdmin(req: NextRequest): Response | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const base64 = auth.replace("Basic ", "");
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) return null;
  return unauthorized();
}