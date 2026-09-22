export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://techgy-link-reimagined.phanikrishna.chatgpt.site"
).replace(/\/$/, "");
export const allowIndexing = process.env.SITE_INDEXING === "true";
export const phoneDisplay = "+91 91000 43542";
export const phoneHref = "tel:+919100043542";
export const email = "sales@techgylink.com";
export const whatsappNumber = "919100043542";
export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
