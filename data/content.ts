import { portfolioStories } from "./portfolio-stories";
const componentProjects = [
  {
    slug: "glc-user-mobile",
    name: "Greenland Capital mobile app",
    category: "PropTech / Mobile",
    image: "/work/glc-mobile.webp",
    description:
      "A mobile experience for property discovery, buyer journeys and access to relevant farmland information.",
    scope: [
      "Property discovery",
      "Buyer journeys",
      "Account and subscription flows",
      "Connection to business systems",
    ],
  },
  {
    slug: "glc-user-website",
    name: "Greenland Capital website",
    category: "PropTech / Web",
    image: "/work/optimized/greenland-capital.png",
    description:
      "A property-discovery experience connecting farmland information, customer journeys and enquiry routes.",
    scope: [
      "Property discovery",
      "Customer journeys",
      "Project information",
      "Enquiry routes",
    ],
  },
  {
    slug: "glc-screening-dashboard",
    name: "Greenland Capital screening platform",
    category: "PropTech / Operations",
    image: "/work/glc-ccs.webp",
    description:
      "An operational interface for screening teams reviewing property information, documents and verification workflows.",
    scope: [
      "Document review",
      "Property assessment",
      "Screening workflows",
      "Review roles",
    ],
  },
  {
    slug: "glc-superadmin",
    name: "Greenland Capital administration",
    category: "PropTech / Platform",
    image: "/work/glc-admin.webp",
    description:
      "An administration experience bringing users, land records, approvals and operational reporting into a shared system.",
    scope: [
      "Users and roles",
      "Workflows and approvals",
      "Land records",
      "Operational reporting",
    ],
  },
  {
    slug: "eco-world",
    name: "Eco World",
    category: "Property / Digital experience",
    image: "/work/optimized/eco-world.jpg",
    description:
      "A property website connecting the project story, visual presentation and customer enquiry journey.",
    scope: [
      "Property website",
      "Project communication",
      "Customer enquiry journey",
    ],
  },
];
export const projects = [
  ...portfolioStories.map(
    ({ slug, name, category, image, description, scope }) => ({
      slug,
      name,
      category,
      image,
      description,
      scope,
    }),
  ),
  ...componentProjects,
];
