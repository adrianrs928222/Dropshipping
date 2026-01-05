import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductHero from "@/components/ProductHero";

export default function ProductPage() {
  return (
    <>
      <Header />
      <main className="container">
        <ProductHero />

        <section className="card" style={{ marginTop: 18 }}>
          <h2>Cómo usarlo (simple)</h2>
          <ol style={{ lineHeight: 1.7 }}>
            <li>Colócalo cómodamente (sin apretar).</li>
            <li>Usa 10–15 minutos como rutina de descanso.</li>
            <li>Hidrátate y descansa la vista entre pantallas.</li>
          </ol>

          <h3>Consejo “pro”</h3>
          <p style={{ opacity: 0.85 }}>
            La venta real en España es confianza + entrega rápida. El producto vende aún mejor si lo enfocas a “fatiga por pantallas”.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}