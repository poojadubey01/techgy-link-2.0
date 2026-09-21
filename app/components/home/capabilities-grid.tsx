import Link from "@/app/components/ui/internal-link";
import { services } from "@/data/catalogue";
import { ArrowUpRight } from "@/app/components/ui/icons";
import {
  Palette,
  PenTool,
  Globe,
  Code2,
  Smartphone,
  Bot,
  Megaphone,
  Building2,
  Settings2,
  type LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  "branding-identity": Palette,
  "ui-ux-product-design": PenTool,
  "website-design-development": Globe,
  "custom-software-development": Code2,
  "mobile-application-development": Smartphone,
  "ai-automation-system-integration": Bot,
  "digital-marketing-sales-enablement": Megaphone,
  "architectural-visualisation": Building2,
  "technology-consulting-modernisation": Settings2,
};
const groups = [
  {
    title: "Shape how you’re seen.",
    body: "A clear identity. An intuitive experience. A website that feels like your business at its best.",
    ids: [0, 1, 2],
  },
  {
    title: "Build how you work.",
    body: "Products, applications and connected systems that support the way people need to get things done.",
    ids: [3, 4, 5],
  },
  {
    title: "Open what comes next.",
    body: "Reach the market, bring a place to life or make the technology decisions behind your next stage.",
    ids: [6, 7, 8],
  },
];
export function CollectiveCapabilities() {
  return (
    <section
      className="bg-white py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]"
      id="expertise"
    >
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)]">
        <div>
          <p className="text-brand text-[14px] max-[767px]:text-[12px]">
            The strength of the whole company
          </p>
          <h2 className="text-[clamp(40px,4.8vw,72px)] mt-[25px] mb-[30px] leading-[1.15] max-[767px]:text-[37px] max-[767px]:leading-[1.18] max-[767px]:mt-[22px] max-[767px]:mb-[25px]">
            Specialists in the detail.
            <br />
            <span className="text-brand">Partners in the bigger picture.</span>
          </h2>
          <p className="max-w-[700px] text-lg leading-[1.8] text-[#000000] max-[767px]:text-base max-[767px]:leading-[1.85]">
            Nine distinct services. Each strong in its own discipline, with the
            people and perspective to connect it to the rest of your business.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(3,_1fr)] gap-10 mt-[65px] max-[1100px]:gap-[27px] max-[767px]:block max-[767px]:mt-[42px]">
          {groups.map((g, i) => (
            <div
              className="capability-column pt-[23px] border-t border-[#e2e8f0] max-[767px]:pt-6 max-[767px]:mt-[30px]"
              key={g.title}
            >
              <span className="font-display text-[54px] text-[#e2e8f0] tracking-[-0.04em] max-[767px]:text-[41px]">
                0{i + 1}
              </span>
              <h3 className="text-[33px] leading-[1.18] mt-[25px] mb-5 max-w-[340px] max-[1100px]:text-[29px] max-[767px]:text-[31px] max-[767px]:max-w-full max-[767px]:mt-5 max-[767px]:mb-4">
                {g.title}
              </h3>
              <p className="text-base text-[#000000] leading-[1.75] min-h-[115px] max-w-[370px] max-[1100px]:min-h-[140px] max-[767px]:min-h-0 max-[767px]:max-w-full max-[767px]:text-[16px]">
                {g.body}
              </p>
              <div className="mt-[25px] max-[767px]:mt-6">
                {g.ids.map((index) => {
                  const s = services[index];
                  const ServiceIcon = serviceIcons[s.id];
                  return (
                    <Link
                      key={s.id}
                      href={"/services/" + s.id}
                      className="group flex items-center justify-between gap-5 py-5 border-t border-[#e2e8f0] text-[17px] leading-normal hover:text-brand max-[767px]:text-[16px] max-[767px]:py-[18px]"
                    >
                      <span className="capability-link-label flex items-center gap-[14px]">
                        {ServiceIcon && (
                          <ServiceIcon
                            className="capability-icon shrink-0 text-[#000000] transition-[transform,color] duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:text-brand"
                            size={20}
                          />
                        )}
                        <span>{s.name}</span>
                      </span>
                      <ArrowUpRight size={19} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center gap-[30px] pt-[30px] mt-[30px] border-t border-[#e2e8f0] text-[#000000] text-[14px] max-[767px]:block max-[767px]:text-sm max-[767px]:leading-[1.8] max-[767px]:pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand whitespace-nowrap max-[767px]:mt-[22px] max-[767px]:text-[14px]"
          >
            Explore all services <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
