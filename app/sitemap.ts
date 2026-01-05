import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/producto`, lastModified: new Date() },
    { url: `${base}/cart`, lastModified: new Date() },
    { url: `${base}/legal/aviso-legal`, lastModified: new Date() },
    { url: `${base}/legal/privacidad`, lastModified: new Date() },
    { url: `${base}/legal/cookies`, lastModified: new Date() }
  ];
}