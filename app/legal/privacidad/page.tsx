import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacidad() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Política de privacidad</h1>
        <p><strong>Responsable:</strong> [Tu nombre/empresa]</p>
        <p><strong>Finalidad:</strong> gestionar pedidos, atención al cliente y obligaciones legales.</p>
        <p><strong>Base legal:</strong> ejecución de contrato (compra), obligación legal y consentimiento cuando aplique.</p>
        <p><strong>Destinatarios:</strong> pasarelas de pago (Stripe/PayPal si aplica), empresas de transporte y proveedores de hosting.</p>
        <p><strong>Derechos:</strong> acceso, rectificación, supresión, oposición, limitación y portabilidad. Contacto: [tu email].</p>
        <p><strong>Conservación:</strong> el tiempo necesario para cumplir la finalidad y las obligaciones legales.</p>
      </main>
      <Footer />
    </>
  );
}