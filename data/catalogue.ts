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
    "glc-user-website",
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
export const portfolioWork = work.filter((p) => !p.slug.startsWith("glc-"));
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
export const marketing = [
  {
    slug: "marketing-strategy",
    name: "Marketing strategy & research",
    headline: "Find your audience. Give them a reason.",
    intro:
      "Bring customer research, competitor context and a clear offer into a practical acquisition plan.",
    audience:
      "Businesses entering a market, launching an offer or questioning where to invest next.",
    deliverables: [
      [
        "Audience and buying context",
        "Map decision makers, buying triggers, objections and the evidence they need.",
      ],
      [
        "Competitor and message review",
        "Understand alternatives and define a credible reason to choose your business.",
      ],
      [
        "Channel and campaign plan",
        "Choose a small set of campaigns, with a hypothesis, owner, budget and review point.",
      ],
      [
        "Measurement framework",
        "Agree what counts as a relevant enquiry and a qualified opportunity.",
      ],
    ],
    start: "An audience, offer and channel assessment.",
    faq: "Research informs decisions; it does not make uncertain campaign outcomes guaranteed.",
  },
  {
    slug: "seo",
    name: "SEO & content",
    headline: "Be found for the problems you solve.",
    intro:
      "Align search visibility with useful pages, clear site structure and the questions your buyers actually ask.",
    audience:
      "Service businesses and brands whose expertise is difficult to discover online.",
    deliverables: [
      [
        "Search and content audit",
        "Review indexability, page structure, existing content and keyword relevance.",
      ],
      [
        "Search intent mapping",
        "Connect meaningful buyer questions to the right service and landing pages.",
      ],
      [
        "On-page improvements",
        "Improve titles, headings, internal links, copy and technical issues within the agreed scope.",
      ],
      [
        "Reporting and priorities",
        "Track relevant visibility, visitor actions and a prioritised improvement backlog.",
      ],
    ],
    start: "A focused website and search-opportunity review.",
    faq: "Rankings and traffic depend on competition, demand and implementation. No ranking position is guaranteed.",
  },
  {
    slug: "performance-marketing",
    name: "Paid media & campaign management",
    headline: "A clear offer. A measured campaign.",
    intro:
      "Connect audience targeting, creative, landing pages and lead feedback across an agreed paid-media plan.",
    audience:
      "Businesses ready to test a specific offer with a defined media budget and a sales follow-up owner.",
    deliverables: [
      [
        "Campaign planning",
        "Define audience, message, channel, spend limits and qualification criteria.",
      ],
      [
        "Creative and landing alignment",
        "Match the ad promise to the destination, proof and next action.",
      ],
      [
        "Campaign operation",
        "Set up and review scoped Google or Meta activity with an agreed campaign operator.",
      ],
      [
        "Learning and reporting",
        "Review search terms, creative response, enquiry quality and sales-team feedback.",
      ],
    ],
    start: "A campaign-readiness review and one bounded acquisition test.",
    faq: "Advertising spend is separate from service fees unless the proposal says otherwise. Sales are not guaranteed.",
  },
  {
    slug: "social-media-content",
    name: "Social media & campaign creative",
    headline: "Make your work worth stopping for.",
    intro:
      "Turn expertise and approved project work into a consistent visual and editorial presence.",
    audience:
      "Brands with useful work to show and a need for clearer, more consistent communication.",
    deliverables: [
      [
        "Content direction",
        "Define the audience, themes, tone and visual system.",
      ],
      [
        "Source stories",
        "Build useful content from project decisions, demonstrations and buyer questions.",
      ],
      [
        "Channel adaptation",
        "Create platform-appropriate posts, carousels and short reels.",
      ],
      [
        "Publishing and review",
        "Agree approval, publishing responsibilities and what engagement tells us.",
      ],
    ],
    start: "A content and brand-presence review.",
    faq: "Production volume follows the campaign need. Reels can be scoped within a 30-second format.",
  },
  {
    slug: "landing-pages",
    name: "Campaign landing pages",
    headline: "Keep the promise your ad made.",
    intro:
      "Give each campaign a relevant destination with a focused message, credible proof and a clear next step.",
    audience:
      "Teams sending paid or outbound traffic to a page that does not match the offer.",
    deliverables: [
      [
        "Message and page structure",
        "Align the audience, problem, offer, evidence and call to action.",
      ],
      [
        "Design and implementation",
        "Create responsive pages within the approved brand system.",
      ],
      [
        "Enquiry flow",
        "Collect useful context and connect to the agreed contact or CRM destination.",
      ],
      [
        "Verification and iteration",
        "Check mobile usability, loading, forms and source tracking before launch.",
      ],
    ],
    start: "A review of one campaign and its destination page.",
    faq: "Testing needs sufficient traffic and an agreed measurement plan. A redesign alone does not establish conversion lift.",
  },
  {
    slug: "sales-enablement",
    name: "Sales enablement & lead journeys",
    headline: "Give every enquiry a useful next step.",
    intro:
      "Connect sales materials, lead context and follow-up workflows so the conversation can continue.",
    audience:
      "Businesses losing context between marketing enquiries and sales conversations.",
    deliverables: [
      [
        "Lead-journey mapping",
        "Define lead sources, qualification, ownership and the next action.",
      ],
      [
        "Sales materials",
        "Create relevant capability presentations, project stories and proposal inputs.",
      ],
      [
        "CRM workflow planning",
        "Specify routing, statuses, reminders and reporting with the technical team.",
      ],
      [
        "Feedback loop",
        "Bring objections and opportunity outcomes back into campaign decisions.",
      ],
    ],
    start: "A review of enquiry handling and one sales journey.",
    faq: "Sales enablement improves the process and materials. It does not automatically supply an outsourced sales team.",
  },
];
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
