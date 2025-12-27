import type { MetadataRoute } from "next";
import getBaseUrl from "@/lib/getBaseUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();

  const staticRoutes = ["/", "/blog", "/contact", "/services"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7,
  }));

  return staticRoutes;
}
