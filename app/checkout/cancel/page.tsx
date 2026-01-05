import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cancel() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Pago cancelado</h1>
        <p>No se ha cobrado nada. Puedes intentarlo de nuevo.</p>
        <a href="/cart" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
          Volver al carrito
        </a>
      </main>
      <Footer />
    </>
  );
}