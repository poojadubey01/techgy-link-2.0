"use client";
import { WebDevCanvas } from "@/app/components/services/web-dev-canvas";
import { UiUxCanvas } from "@/app/components/services/ui-ux-canvas";
import { MobileDevCanvas } from "@/app/components/services/mobile-dev-canvas";
import { AiAutomationCanvas } from "@/app/components/services/ai-automation-canvas";
import { MarketingCanvas } from "@/app/components/services/marketing-canvas";
import { ArchitectureCanvas } from "@/app/components/services/architecture-canvas";
import { ConsultingCanvas } from "@/app/components/services/consulting-canvas";
import { BrandingMotion } from "@/app/components/services/branding-motion";
import { CustomSoftwareDesktop } from "@/app/components/services/custom-software-desktop";
import { services } from "@/data/catalogue";

type Service = (typeof services)[number];

export function ServiceCanvas({ service: s }: { service: Service }) {
  if (s.id === "architectural-visualisation")
    return <ArchitectureCanvas />;

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
