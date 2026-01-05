"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { eur } from "@/lib/money";

type Order = {
  id: string;
  createdAt: string;
  email: string;
  fullName: string;
  address1: string;
  city: string;
  province: string;
  postalCode: string;
  productName: string;
  quantity: number;
  totalCents: number;
  status: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  notes?: string | null;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (!res.ok) {
      setLoading(false);
      alert("No autorizado o error. Revisa ADMIN_USER/ADMIN_PASS.");
      return;
    }
    const data = await res.json();
    setOrders(data.orders);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function update(id: string, patch: Partial<Order>) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch)
    });
    if (!res.ok) return alert("Error actualizando pedido");
    await load();
  }

  return (
    <>
      <Header />
      <main className="container">
        <h1>Admin — Pedidos</h1>
        <p style={{ opacity: 0.8 }}>
          Si te sale popup de usuario/contraseña, mete ADMIN_USER/ADMIN_PASS de tu .env
        </p>

        {loading ? <p>Cargando…</p> : null}

        <div style={{ display: "grid", gap: 12 }}>
          {orders.map((o) => (
            <div key={o.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <strong>{o.fullName}</strong>
                <span className="badge">{o.status}</span>
              </div>
              <p style={{ margin: "8px 0", opacity: 0.85 }}>
                {o.email} — {new Date(o.createdAt).toLocaleString()}
              </p>
              <p style={{ margin: 0 }}>
                <strong>{o.productName}</strong> × {o.quantity} — <strong>{eur(o.totalCents)}</strong>
              </p>
              <p style={{ marginTop: 8, opacity: 0.85 }}>
                Envío: {o.address1}, {o.postalCode} {o.city} ({o.province})
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <label>
                  Estado
                  <select
                    defaultValue={o.status}
                    onChange={(e) => update(o.id, { status: e.target.value })}
                  >
                    {["paid","processing","shipped","cancelled","refunded"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Transportista
                  <input
                    defaultValue={o.carrier || ""}
                    placeholder="Correos, SEUR, GLS…"
                    onBlur={(e) => update(o.id, { carrier: e.target.value })}
                  />
                </label>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <label>
                  Tracking
                  <input
                    defaultValue={o.trackingNumber || ""}
                    placeholder="Número de seguimiento"
                    onBlur={(e) => update(o.id, { trackingNumber: e.target.value })}
                  />
                </label>

                <label>
                  Notas
                  <input
                    defaultValue={o.notes || ""}
                    placeholder="Notas internas"
                    onBlur={(e) => update(o.id, { notes: e.target.value })}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}