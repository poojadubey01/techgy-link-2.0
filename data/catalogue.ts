import serviceData from "./services";
import solutionData from "./solutions";
import articles from "./insights";
import architecture from "./architecture";
import { projects as oldProjects } from "./content";
export const services = serviceData.map((s, i) => ({
  ...s,
  image: [
    "/brand/logo.png",
    "/work/optimized/greenland-capital.png",
    "/work/optimized/eco-world.jpg",
    "/work/glc-admin.webp",
    "/work/glc-mobile.webp",
    "/work/optimized/quickbooks.png",
    "/work/optimized/eco-world.jpg",
    "/architecture/vasavi-atlantis/Aerial_Night.webp",
    "/work/glc-ccs.webp",
  ][i],
  proof: [
    "",
    "greenland-capital",
    "eco-world",
    "lending-bridge",
    "spur-fit",
    "quickbooks-integration",
    "planet-green-crm",
    "vasavi-atlantis",
    "",
  ][i],
}));
export const solutions = solutionData.map((s, i) => ({
  ...s,
  image: [
    "/architecture/dates-county/Aerial_view_-Dates_County.webp",
    "/work/optimized/quickbooks.png",
    "/work/optimized/greenland-capital.png",
  ][i],
}));
export { articles, architecture };
export const digitalProjects = oldProjects.map((p) => ({
  ...p,
  kind: "Digital",
}));
const excludedWorkSlugs = new Set(["spur-fit", "nex2u"]);
export const work = [
  ...digitalProjects.filter((p) => !excludedWorkSlugs.has(p.slug)),
  ...architecture.map((p) => ({
    slug: p.slug,
    name: p.title,
    kind: "Visualisation",
    category: p.sector,
    image: p.coverImage,
    description:
      "Architectural visualisation exploring the project through composition, light, materials and its surrounding landscape.",
    scope: p.tags,
  })).filter((p) => !excludedWorkSlugs.has(p.slug)),
];
export const portfolioWork = work;
export const oldServiceRoutes = {
  "cloud-infrastructure-migration": "technology-consulting-modernisation",
  "enterprise-system-integration": "ai-automation-system-integration",
  "enterprise-solution-architecture-consulting":
    "technology-consulting-modernisation",
  "ui-ux-design-services": "ui-ux-product-design",
  "fintech-services": "ai-automation-system-integration",
  "enterprise-ai-machine-learning": "ai-automation-system-integration",
  "custom-enterprise-software-development": "custom-software-development",
  "ai-powered-legacy-modernization": "technology-consulting-modernisation",
  "3d-architectural-visualization": "architectural-visualisation",
  "iot-solutions": "technology-consulting-modernisation",
  cybersecurity: "technology-consulting-modernisation",
};
const campaignHeadlines = [
  "Your business has evolved. Has your brand kept up?",
  "Your product has the features. Can people use them?",
  "Your website should feel like your business at its best.",
  "Outgrown spreadsheets? Build around the work.",
  "Put the right workflow in their hands.",
  "Your people should not be the link between your tools.",
  "Connect the campaign to the sales conversation.",
  "Let them experience the place before it exists.",
  "Make the next technology decision with clarity.",
];
export const campaigns = services.map((s, i) => ({
  slug: s.id,
  service: s,
  headline: campaignHeadlines[i],
  start: s.process[0],
  cta: s.cta,
}));
export const enquiry = (service: string) =>
  "/contact?service=" + encodeURIComponent(service);
