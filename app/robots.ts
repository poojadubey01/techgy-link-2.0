import { siteUrl, allowIndexing } from "../lib/site";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowIndexing
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
