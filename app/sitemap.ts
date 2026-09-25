import { services, solutions, work, campaigns } from "@/data/catalogue";
import articles from "@/data/insights";
import { siteUrl } from "../lib/site";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/services/",
    "/solutions/",
    "/work/",
    "/contact/",
    "/insights/",
    "/campaigns/",
    "/products/",
    "/privacy/",
    ...services.map((s) => "/services/" + s.id + "/"),
    ...solutions.map((s) => "/solutions/" + s.id + "/"),
    ...work.map((s) => "/work/" + s.slug + "/"),
    ...campaigns.map((s) => "/campaigns/" + s.slug + "/"),
    ...articles.map((s) => "/insights/" + s.id + "/"),
    "/products/sales-crm/",
    "/products/office-tracker-hrms/",
  ];
  return [...new Set(paths)].map((p) => ({ url: siteUrl + p }));
}
