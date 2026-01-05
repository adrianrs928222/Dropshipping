import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/product";

export default function AvisoLegal() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Aviso legal</h1>
        <p><strong>Titular:</strong> [Tu nombre/empresa]</p>
        <p><strong>NIF/CIF:</strong> [Tu NIF/CIF]</p>
        <p><strong>Domicilio:</strong> [Tu dirección]</p>
        <p><strong>Email:</strong> [Tu email]</p>
        <p>
          Este sitio web ({BRAND}) ofrece información y venta online de productos.
          El acceso implica la aceptación de estas condiciones.
        </p>
      </main>
      <Footer />
    </>
  );
}