import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
    ],
    sitemap: "https://kgnio-profile-card.vercel.app/sitemap.xml",
    host: "https://kgnio-profile-card.vercel.app",
  };
}