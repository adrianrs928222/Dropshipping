import "./globals.css";
import type { Metadata } from "next";
import { BRAND, PRODUCT } from "@/lib/product";

export const metadata: Metadata = {
  title: `${BRAND} | ${PRODUCT.short}`,
  description: "Masajeador de ojos para descanso visual y relajación. Envíos en España. Pago seguro.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: `${BRAND} | ${PRODUCT.short}`,
    description: "Descansa tus ojos en minutos. Envíos en España.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}