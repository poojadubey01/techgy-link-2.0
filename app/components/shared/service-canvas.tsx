"use client";
import { WebDevCanvas } from "@/app/components/services/web-dev-canvas";
import { UiUxCanvas } from "@/app/components/services/ui-ux-canvas";
import { MobileDevCanvas } from "@/app/components/services/mobile-dev-canvas";
import { AiAutomationCanvas } from "@/app/components/services/ai-automation-canvas";
import { MarketingCanvas } from "@/app/components/services/marketing-canvas";
import { ArchitectureCanvas } from "@/app/components/services/architecture-canvas";
import { ConsultingCanvas } from "@/app/components/services/consulting-canvas";
import { services } from "@/data/catalogue";

type Service = (typeof services)[number];

const meta = {
  "ui-ux-product-design": [
    "Product experience",
    "From structure to interface",
    "Greenland Capital / Product design presentation",
  ],
  "website-design-development": [
    "Digital experience",
    "A place for your brand to come alive",
    "Eco World / Website project",
  ],
  "custom-software-development": [
    "Business applications",
    "Complex work. Clear interfaces.",
    "Greenland Capital / Administration platform presentation",
  ],
  "mobile-application-development": [
    "Mobile experience",
    "Built around the task in hand",
    "Greenland Capital / Mobile application presentation",
  ],
};
const projectCanvasBg: Record<string, string> = {};
const projectCanvasImg: Record<string, string> = {
  "website-design-development":
    "absolute h-auto w-[185%] max-w-none left-[-39%] top-[-17%] object-cover max-[767px]:top-[-8%]",
  "ui-ux-product-design":
    "absolute h-[154%] w-[148%] max-w-none left-[-2%] bottom-0 object-left-bottom",
  "custom-software-development":
    "absolute h-[125%] w-full bottom-0 object-[51%_bottom]",
  "mobile-application-development":
    "absolute h-auto w-[180%] max-w-none left-[-40%] bottom-0 object-cover max-[767px]:w-[200%] max-[767px]:left-[-50%]",
};

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
    return (
      <div
        className="grid grid-cols-[1.15fr_1fr] rounded-md overflow-hidden text-white max-[767px]:block max-[767px]:min-h-0"
        data-image-reveal
      >
        <div className="relative overflow-hidden aspect-square self-start w-full p-[42px] flex flex-col items-start justify-between bg-[#111625] max-[1023px]:p-[30px] max-[767px]:p-[27px] max-[767px]:min-h-[300px] after:content-[''] after:absolute after:inset-0 after:z-[1] after:pointer-events-none after:[background:radial-gradient(ellipse_at_center,transparent_40%,#0022ff_115%)] after:opacity-50">
          <p className="relative z-10 text-[11px] text-paper max-[767px]:text-[10px]">
            Our own identity / TechGy Link
          </p>
          <video
            src="/brand/Union%20Logo%20Reveal.mp4"
            width="541"
            height="111"
            autoPlay
            loop
            muted
            playsInline
            aria-label="TechGy Link visual identity"
            className="absolute inset-0 w-full h-full object-cover z-0 border-0 outline-none [filter:brightness(1.35)_saturate(1.15)_contrast(1.05)]"
          />
          <p className="relative z-10 font-display text-[36px] tracking-[-0.04em] leading-[1.2] [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] max-[767px]:text-[29px]">
            A clear idea.
            <br />A consistent expression.
          </p>
        </div>
        <div className="py-[30px] px-10 bg-paper text-brand flex flex-col justify-center max-[1023px]:p-[30px] max-[767px]:p-[27px]">
          <span className="font-display text-[180px] leading-[1.1] tracking-[-0.075em] max-[1023px]:text-[145px] max-[767px]:text-[135px]">
            Aa
          </span>
          <p className="text-[14px] text-paper mt-[15px] max-[767px]:text-[13px]">
            Character in every detail.
          </p>
          <div className="flex mt-10 h-[60px] max-[767px]:mt-[30px]">
            <span className="w-[33.333%] flex items-end p-[10px] text-[11px] bg-brand text-white">
              Blue
            </span>
            <span className="w-[33.333%] flex items-end p-[10px] text-[11px] bg-[#111625] text-white">
              Ink
            </span>
            <span className="w-[33.333%] flex items-end p-[10px] text-[11px] bg-rule text-paper">
              Silver
            </span>
          </div>
        </div>
      </div>
    );

  const [label, title, caption] = meta[s.id as keyof typeof meta] || [
    "Selected work",
    "Designed around the experience",
    "TechGy Link / Project presentation",
  ];

  return (
    <figure
      className={`${projectCanvasBg[s.id] || "bg-brand"} text-white rounded-md overflow-hidden grid grid-cols-[0.65fr_1fr] min-h-[500px] relative max-[1023px]:min-h-[430px] max-[1023px]:grid-cols-[0.75fr_1fr] max-[767px]:block max-[767px]:min-h-0`}
      data-image-reveal
    >
      <div className="py-[48px] px-[38px] flex flex-col justify-between items-start z-[2] max-[1023px]:p-[30px] max-[767px]:p-7">
        <p className="text-paper text-[11px] max-[767px]:text-[10px]">
          {label}
        </p>
        <div>
          <h3 className="text-[clamp(30px,3.25vw,52px)] leading-[1.13] mb-4 mt-0 tracking-[-0.05em] max-[767px]:text-[33px] max-[767px]:mb-3">
            {title}
          </h3>
          <p className="text-[12px] leading-[1.7] text-paper max-w-[235px] max-[767px]:text-[11px] max-[767px]:max-w-none">
            {caption}
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden min-h-[500px] bg-white max-[1023px]:min-h-[430px] max-[767px]:min-h-0">
        {s.id === "website-design-development" ? (
          <WebDevCanvas />
        ) : s.id === "ui-ux-product-design" ? (
          <UiUxCanvas />
        ) : s.id === "mobile-application-development" ? (
          <MobileDevCanvas />
        ) : (
          <img
            src={s.image}
            alt={caption}
            width="1600"
            height="1000"
            fetchPriority="high"
            className={
              projectCanvasImg[s.id] || "absolute w-full h-full object-cover"
            }
          />
        )}
      </div>
    </figure>
  );
}
