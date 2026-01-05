import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Success() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Pago recibido ✅</h1>
        <p>Gracias. Te avisaremos cuando el pedido se envíe y tengamos el tracking.</p>
        <a href="/" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
          Volver al inicio
        </a>
      </main>
      <Footer />
    </>
  );
}