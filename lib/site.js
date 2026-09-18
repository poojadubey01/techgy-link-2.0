export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://techgy-link-reimagined.phanikrishna.chatgpt.site"
).replace(/\/$/, "");
export const allowIndexing = process.env.SITE_INDEXING === "true";
