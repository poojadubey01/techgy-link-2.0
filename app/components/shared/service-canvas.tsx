"use client";
import dynamic from "next/dynamic";
import { services } from "@/data/catalogue";

const WebDevCanvas = dynamic(() => import("@/app/components/services/web-dev-canvas").then((module) => module.WebDevCanvas));
const UiUxCanvas = dynamic(() => import("@/app/components/services/ui-ux-canvas").then((module) => module.UiUxCanvas));
const MobileDevCanvas = dynamic(() => import("@/app/components/services/mobile-dev-canvas").then((module) => module.MobileDevCanvas));
const AiAutomationCanvas = dynamic(() => import("@/app/components/services/ai-automation-canvas").then((module) => module.AiAutomationCanvas));
const MarketingCanvas = dynamic(() => import("@/app/components/services/marketing-canvas").then((module) => module.MarketingCanvas));
const ArchitectureShowreel = dynamic(() => import("@/app/components/services/architecture-showreel").then((module) => module.ArchitectureShowreel));
const ConsultingCanvas = dynamic(() => import("@/app/components/services/consulting-canvas").then((module) => module.ConsultingCanvas));
const BrandingMotion = dynamic(() => import("@/app/components/services/branding-motion").then((module) => module.BrandingMotion));
const CustomSoftwareDesktop = dynamic(() => import("@/app/components/services/custom-software-desktop").then((module) => module.CustomSoftwareDesktop));

type Service = (typeof services)[number];

function pick(s: Service) {
  if (s.id === "architectural-visualisation")
    return <ArchitectureShowreel />;

  if (s.id === "ai-automation-system-integration")
    return <AiAutomationCanvas />;

  if (s.id === "digital-marketing-sales-enablement")
    return <MarketingCanvas />;

  if (s.id === "technology-consulting-modernisation")
    return <ConsultingCanvas />;

  if (s.id === "branding-identity")
    return <BrandingMotion />;

  if (s.id === "ui-ux-product-design")
    return <UiUxCanvas />;

  if (s.id === "website-design-development")
    return <WebDevCanvas />;

  if (s.id === "mobile-application-development")
    return <MobileDevCanvas />;

  return <CustomSoftwareDesktop />;
}

export function ServiceCanvas({ service }: { service: Service }) {
  return <div className="service-visual">{pick(service)}</div>;
}
