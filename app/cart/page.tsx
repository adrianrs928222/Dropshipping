"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCT, SHIPPING } from "@/lib/product";
import { getCart, setQuantity } from "@/lib/cart";
import { eur } from "@/lib/money";

export default function CartPage() {
  const [q, setQ] = useState(1);

  useEffect(() => setQ(getCart().quantity), []);

  const calc = useMemo(() => {
    const subtotal = PRODUCT.priceCents * q;
    const shipping = subtotal >= SHIPPING.freeOverCents ? 0 : SHIPPING.flatCents;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [q]);

  async function checkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    const payload = {
      quantity: q,
      customer: {
        email: String(f.get("email") || ""),
        fullName: String(f.get("fullName") || ""),
        phone: String(f.get("phone") || ""),
        address1: String(f.get("address1") || ""),
        address2: String(f.get("address2") || ""),
        city: String(f.get("city") || ""),
        province: String(f.get("province") || ""),
        postalCode: String(f.get("postalCode") || ""),
        country: "ES"
      }
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert("Error iniciando pago. Revisa los datos.");
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Carrito</h1>

        <div className="card">
          <p style={{ margin: 0, fontWeight: 900 }}>{PRODUCT.name}</p>
          <p style={{ opacity: 0.85 }}>{eur(PRODUCT.priceCents)} unidad</p>

          <label style={{ maxWidth: 220 }}>
            Cantidad
            <select
              value={q}
              onChange={(e) => {
                const nq = Number(e.target.value);
                setQ(nq);
                setQuantity(nq);
              }}
            >
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>

          <hr />

          <p>Subtotal: <strong>{eur(calc.subtotal)}</strong></p>
          <p>Envío: <strong>{calc.shipping === 0 ? "Gratis" : eur(calc.shipping)}</strong></p>
          <p style={{ fontSize: 18 }}>Total: <strong>{eur(calc.total)}</strong></p>
        </div>

        <section className="card" style={{ marginTop: 18 }}>
          <h2>Datos de envío</h2>
          <form onSubmit={checkout} style={{ display: "grid", gap: 10, maxWidth: 560 }}>
            <input name="email" placeholder="Email" required />
            <input name="fullName" placeholder="Nombre completo" required />
            <input name="phone" placeholder="Teléfono (opcional)" />
            <input name="address1" placeholder="Dirección" required />
            <input name="address2" placeholder="Piso / puerta (opcional)" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input name="city" placeholder="Ciudad" required />
              <input name="province" placeholder="Provincia" required />
            </div>
            <input name="postalCode" placeholder="Código postal" required />
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" required />
              Acepto la política de privacidad y términos.
            </label>
            <button className="btn">Pagar con tarjeta (Stripe)</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}