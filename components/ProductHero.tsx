"use client";

import { useState } from "react";
import { PRODUCT } from "@/lib/product";
import { setQuantity } from "@/lib/cart";
import { eur } from "@/lib/money";

export default function ProductHero() {
  const [q, setQ] = useState(1);

  return (
    <section className="card">
      <div className="grid2">
        <div className="card" style={{ background: "#f7f7f7", minHeight: 260, display: "grid", placeItems: "center" }}>
          <span style={{ opacity: 0.7 }}>
            {PRODUCT.image === "/eye-massager.jpg" ? "Sube tu imagen a /public/eye-massager.jpg" : "Imagen"}
          </span>
        </div>

        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge">Envío España</span>
            <span className="badge">Pago seguro</span>
            <span className="badge">Soporte</span>
          </div>

          <h1 style={{ marginBottom: 8 }}>{PRODUCT.name}</h1>
          <p style={{ marginTop: 0, opacity: 0.85 }}>{PRODUCT.description}</p>

          <ul style={{ lineHeight: 1.7, paddingLeft: 18 }}>
            {PRODUCT.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>

          <p style={{ fontSize: 22, fontWeight: 900 }}>{eur(PRODUCT.priceCents)}</p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <label style={{ width: 160 }}>
              Cantidad
              <select value={q} onChange={(e) => setQ(Number(e.target.value))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>

            <button className="btn" onClick={() => { setQuantity(q); window.location.href = "/cart"; }}>
              Comprar ahora
            </button>
          </div>

          <p style={{ marginTop: 10 }}>
            <small className="muted">* Tiempos de entrega dependen del proveedor (ideal 24–72h en España/UE).</small>
          </p>
        </div>
      </div>
    </section>
  );
}