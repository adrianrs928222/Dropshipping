import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cookies() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Política de cookies</h1>
        <p>
          Usamos cookies esenciales para el funcionamiento (por ejemplo, recordar preferencias).
          Si activas analítica en el futuro, deberás actualizar esta página y el banner.
        </p>
        <p><strong>Cómo gestionar cookies:</strong> desde la configuración de tu navegador.</p>
      </main>
      <Footer />
    </>
  );
}