import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ProductHero from "@/components/ProductHero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <div style={{ marginBottom: 14 }}>
          <h1 style={{ marginBottom: 8 }}>Descansa tus ojos en minutos</h1>
          <p style={{ marginTop: 0, opacity: 0.85 }}>
            Una rutina simple para bajar tensión visual después de pantallas. Compra segura y seguimiento del pedido.
          </p>
        </div>

        <ProductHero />

        <section style={{ marginTop: 20 }} className="card">
          <h2>Preguntas rápidas</h2>
          <p><strong>¿Para quién?</strong> Pantallas, teletrabajo, lectura, estrés.</p>
          <p><strong>¿Envío?</strong> Preferiblemente 24–72h con proveedor europeo.</p>
          <p><strong>¿Devoluciones?</strong> Consulta nuestra política (legal).</p>
          <a href="/producto" className="btn" style={{ display: "inline-block", textDecoration: "none" }}>
            Ver detalles del producto
          </a>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}