import { services, solutions, work, marketing, campaigns } from "@/data/catalogue";
import articles from "@/data/insights";
import { siteUrl } from "../lib/site";
export default function sitemap() {
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
    ...marketing.map(
      (s) => "/services/digital-marketing-sales-enablement/" + s.slug + "/",
    ),
    ...campaigns.map((s) => "/campaigns/" + s.slug + "/"),
    ...articles.map((s) => "/insights/" + s.slug + "/"),
    "/products/sales-crm/",
    "/products/office-tracker-hrms/",
  ];
  return [...new Set(paths)].map((p) => ({ url: siteUrl + p }));
}
