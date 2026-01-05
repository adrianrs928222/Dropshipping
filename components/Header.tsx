import { BRAND } from "@/lib/product";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #eee" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 900 }}>{BRAND}</a>
        <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <a href="/producto">Producto</a>
          <a href="/cart" className="badge">Carrito</a>
          <a href="/legal/aviso-legal">Legal</a>
        </nav>
      </div>
    </header>
  );
}