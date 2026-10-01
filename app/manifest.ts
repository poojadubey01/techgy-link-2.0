import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TechGy Link — Design, Technology & Growth Partner",
    short_name: "TechGy Link",
    description:
      "Your design, technology and growth partner, bringing brand, product, engineering, marketing and visualisation expertise together.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#0022ff",
    icons: [
      { src: "/source/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/source/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
