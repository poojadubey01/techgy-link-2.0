import type { NextConfig } from "next";

const legacy: Record<string, string> = {
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

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/projects/:path*",
        destination: "/work/:path*",
        permanent: true,
      },
      {
        source: "/work/glc-:page",
        destination: "/work/greenland-capital/",
        permanent: true,
      },
      {
        source: "/services/digital-marketing-sales-enablement/:detail",
        destination: "/services/digital-marketing-sales-enablement/",
        permanent: true,
      },
      ...Object.entries(legacy).map(([oldSlug, slug]) => ({
        source: "/services/" + oldSlug,
        destination: "/services/" + slug,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
