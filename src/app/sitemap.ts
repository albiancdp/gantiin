import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/konversi", priority: 0.9 },
    { path: "/pdf", priority: 0.8 },
    { path: "/image", priority: 0.8 },
    { path: "/merge", priority: 0.8 },
    { path: "/dukung", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
