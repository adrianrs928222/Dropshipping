const KEY = "eyeRelaxCart";

export type CartState = { sku: string; quantity: number };

export function getCart(): CartState {
  if (typeof window === "undefined") return { sku: "EYE-MASSAGER-01", quantity: 1 };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { sku: "EYE-MASSAGER-01", quantity: 1 };
  try {
    const parsed = JSON.parse(raw);
    return { sku: "EYE-MASSAGER-01", quantity: Math.max(1, Math.min(5, Number(parsed.quantity || 1))) };
  } catch {
    return { sku: "EYE-MASSAGER-01", quantity: 1 };
  }
}

export function setQuantity(quantity: number) {
  if (typeof window === "undefined") return;
  const q = Math.max(1, Math.min(5, Number(quantity || 1)));
  localStorage.setItem(KEY, JSON.stringify({ sku: "EYE-MASSAGER-01", quantity: q }));
}