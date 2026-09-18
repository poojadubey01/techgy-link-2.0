import { siteUrl, allowIndexing } from "../lib/site";
export default function robots() {
  return {
    rules: allowIndexing
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
