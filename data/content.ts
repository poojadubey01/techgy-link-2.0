import { portfolioStories } from "./portfolio-stories";
const componentProjects = [
  {
    slug: "eco-world",
    name: "Eco World",
    category: "Property / Digital experience",
    image: "/mockup/eco world.png",
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
