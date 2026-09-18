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
    <section className="collective-capabilities section" id="expertise">
      <div className="wrap">
        <div className="collective-heading">
          <p className="eyebrow">The strength of the whole company</p>
          <h2>
            Specialists in the detail.
            <br />
            <span className="text-brand">Partners in the bigger picture.</span>
          </h2>
          <p>
            Nine distinct services. Each strong in its own discipline, with the
            people and perspective to connect it to the rest of your business.
          </p>
        </div>
        <div className="capability-columns">
          {groups.map((g, i) => (
            <div className="capability-column" key={g.title}>
              <span className="capability-number">0{i + 1}</span>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
              <div>
                {g.ids.map((index) => {
                  const s = services[index];
                  const ServiceIcon = serviceIcons[s.id];
                  return (
                    <Link key={s.id} href={"/services/" + s.id}>
                      <span className="capability-link-label">
                        {ServiceIcon && (
                          <ServiceIcon className="capability-icon" size={20} />
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
        <div className="collective-note">
          <Link href="/services" className="text-link">
            Explore all services <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
