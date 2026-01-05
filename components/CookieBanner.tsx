"use client";
import { useEffect, useState } from "react";
const KEY = "cookieConsent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem(KEY)) setShow(true); }, []);
  if (!show) return null;

  return (
    <div style={{
      position: "fixed", left: 16, right: 16, bottom: 16,
      maxWidth: 980, margin: "0 auto", background: "#fff",
      border: "1px solid #eee", borderRadius: 16, padding: 14,
      boxShadow: "0 10px 30px rgba(0,0,0,.08)"
    }}>
      <p style={{ margin: 0 }}>
        Usamos cookies esenciales para que la web funcione. Puedes ver la{" "}
        <a href="/legal/cookies">política de cookies</a>.
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button className="btn" onClick={() => { localStorage.setItem(KEY, "accepted"); setShow(false); }}>
          Aceptar
        </button>
        <button className="btn secondary" onClick={() => { localStorage.setItem(KEY, "rejected"); setShow(false); }}>
          Rechazar
        </button>
      </div>
    </div>
  );
}