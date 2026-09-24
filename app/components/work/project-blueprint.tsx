import {
  BookText,
  Building2,
  ChartColumn,
  CircleCheck,
  Eye,
  FileText,
  Layers,
  Link2,
  Map as MapIcon,
  MessageSquare,
  Radar,
  Route,
  Settings2,
  ShieldCheck,
  Smartphone,
  Users,
  Watch,
  type LucideIcon,
} from "lucide-react";

const glyphs = {
  building: Building2,
  chart: ChartColumn,
  check: CircleCheck,
  connect: Link2,
  document: FileText,
  eye: Eye,
  layers: Layers,
  ledger: BookText,
  map: MapIcon,
  message: MessageSquare,
  mobile: Smartphone,
  people: Users,
  route: Route,
  scan: Radar,
  settings: Settings2,
  shield: ShieldCheck,
  watch: Watch,
} satisfies Record<string, LucideIcon>;

type GlyphName = keyof typeof glyphs;
type Node = { label: string; detail: string; icon: GlyphName };
type Blueprint = {
  title: string;
  centre: Node;
  inputs: Node[];
  outputs: Node[];
  note: string;
};

const blueprints: Record<string, Blueprint> = {
  "quickbooks-integration": {
    title: "A clear path from source data to reviewed posting.",
    centre: {
      label: "Review before posting",
      detail: "Memo matching · preview · validation",
      icon: "shield",
    },
    inputs: [
      {
        label: "Bank statements",
        detail: "The transaction source",
        icon: "document",
      },
      { label: "Memo Map 2.0", detail: "Categorisation rules", icon: "ledger" },
    ],
    outputs: [
      {
        label: "QuickBooks Desktop",
        detail: "SDK-based journal posting",
        icon: "connect",
      },
      {
        label: "Exception review",
        detail: "Unmatched records stay visible",
        icon: "eye",
      },
    ],
    note: "Posting follows review. Unmatched records have their own resolution path.",
  },
  "greenland-capital": {
    title: "One property journey. Connected on both sides.",
    centre: {
      label: "Farmland platform",
      detail: "Customer experience + operational workflows",
      icon: "building",
    },
    inputs: [
      { label: "Location & land", detail: "Geospatial discovery", icon: "map" },
      {
        label: "Property records",
        detail: "Documents and manual review",
        icon: "document",
      },
    ],
    outputs: [
      {
        label: "Web & mobile",
        detail: "The buyer’s discovery journey",
        icon: "mobile",
      },
      {
        label: "Operational teams",
        detail: "Screening, agents and administration",
        icon: "people",
      },
    ],
    note: "A simplified scope map for the ongoing platform. Component availability follows its release stage.",
  },
  "lending-bridge": {
    title: "The loan product shapes the application.",
    centre: {
      label: "Product-specific logic",
      detail: "The right information for the lending case",
      icon: "settings",
    },
    inputs: [
      {
        label: "Loan requirement",
        detail: "Residential, commercial or development",
        icon: "building",
      },
      {
        label: "Fact-find & documents",
        detail: "Application context",
        icon: "document",
      },
    ],
    outputs: [
      {
        label: "Underwriting review",
        detail: "An organised decision workflow",
        icon: "shield",
      },
      {
        label: "Completion tracking",
        detail: "Through to drawdown",
        icon: "check",
      },
    ],
    note: "The software supports the lender’s process. Lending decisions remain with the lender.",
  },
  "kingdom-healthcare": {
    title: "Carry the candidate’s context into the next decision.",
    centre: {
      label: "Recruitment bridge",
      detail: "Structured capture and controlled routing",
      icon: "route",
    },
    inputs: [
      {
        label: "Private candidate links",
        detail: "A defined entry point",
        icon: "shield",
      },
      {
        label: "Credential information",
        detail: "Qualifications and supporting records",
        icon: "document",
      },
    ],
    outputs: [
      {
        label: "Recruiter review",
        detail: "Information mapped for assessment",
        icon: "people",
      },
      {
        label: "Interview dashboard",
        detail: "The next step in the hiring journey",
        icon: "message",
      },
    ],
    note: "The engagement covers the internal recruitment workflow and its handoffs.",
  },
  "planet-green-crm": {
    title: "Source context stays with the sales conversation.",
    centre: {
      label: "Connected CRM",
      detail: "Lead intake · ownership · activity trail",
      icon: "connect",
    },
    inputs: [
      {
        label: "WhatsApp & web",
        detail: "Enquiry capture channels",
        icon: "message",
      },
      {
        label: "Call context",
        detail: "Post-call summaries and analysis",
        icon: "document",
      },
    ],
    outputs: [
      {
        label: "Sales follow-up",
        detail: "Assignments and next actions",
        icon: "people",
      },
      {
        label: "Journey visibility",
        detail: "Touchpoints in one activity trail",
        icon: "chart",
      },
    ],
    note: "Ongoing engagement connecting lead sources, sales activity and the next action.",
  },
  "spur-fit": {
    title: "The wearable becomes part of the product journey.",
    centre: {
      label: "Workout integration",
      detail: "Synchronisation with the existing platform",
      icon: "connect",
    },
    inputs: [
      {
        label: "Apple Watch",
        detail: "Heart-rate and movement inputs",
        icon: "watch",
      },
      {
        label: "iOS experience",
        detail: "The connected mobile journey",
        icon: "mobile",
      },
    ],
    outputs: [
      {
        label: "Workout analytics",
        detail: "Inputs to the coaching loop",
        icon: "chart",
      },
      {
        label: "Haptic cues",
        detail: "Workout-phase notifications",
        icon: "watch",
      },
    ],
    note: "TechGy’s contribution is the iOS and wearable integration within Spur.fit’s wider platform.",
  },
  nex2u: {
    title: "Discovery with control over participation.",
    centre: {
      label: "Proximity discovery",
      detail: "Location-aware profile exploration",
      icon: "map",
    },
    inputs: [
      {
        label: "Profile context",
        detail: "Professional or social",
        icon: "people",
      },
      {
        label: "Visibility preferences",
        detail: "Stealth mode and granular controls",
        icon: "eye",
      },
    ],
    outputs: [
      {
        label: "Nearby profiles",
        detail: "Discovery within a selected radius",
        icon: "scan",
      },
      {
        label: "Relevant connections",
        detail: "Profile and conversation journeys",
        icon: "message",
      },
    ],
    note: "Product in development. The map describes the intended connected experience.",
  },
};

// Decorative wires. The viewBox stretches to the map, so each run starts and
// ends behind a node card: source → centre on the left, centre → destination
// on the right.
const wires =
  "M250 63H300Q320 63 320 83V140Q320 160 340 160H390" +
  "M250 257H300Q320 257 320 237V180Q320 160 340 160H390" +
  "M610 160H635Q655 160 655 140V83Q655 63 675 63H750" +
  "M610 160H635Q655 160 655 180V237Q655 257 675 257H750";

const Glyph = ({ name, size = 22 }: { name: GlyphName; size?: number }) => {
  const Icon = glyphs[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
};

function BlueprintNode({ node, centre }: { node: Node; centre?: boolean }) {
  return (
    <div
      className={
        "flex gap-[18px] items-start rounded-[5px] border p-[22px] max-[767px]:gap-[15px] max-[767px]:p-5 " +
        (centre
          ? "bg-brand text-white border-brand"
          : "flex-1 bg-white border-[#e2e8f0]")
      }
    >
      <span
        className={
          "grid place-items-center w-11 h-11 shrink-0 rounded-full max-[767px]:w-10 max-[767px]:h-10 " +
          (centre ? "bg-[#ffffff26] text-white" : "bg-paper text-brand")
        }
      >
        <Glyph name={node.icon} size={centre ? 24 : 22} />
      </span>
      <div>
        <h3 className="text-[19px] leading-[1.25] tracking-[-0.03em] max-[767px]:text-[18px]">
          {node.label}
        </h3>
        <p
          className={
            "text-[14px] leading-[1.7] mt-2 " +
            (centre ? "text-[#f8f9fa]" : "text-[#000000]")
          }
        >
          {node.detail}
        </p>
      </div>
    </div>
  );
}

const connector = "hidden max-[1023px]:block h-8 w-px bg-[#e2e8f0] mx-auto";

export function ProjectBlueprint({ slug }: { slug: string }) {
  const b = blueprints[slug];
  if (!b) return null;
  return (
    <section
      id="inside-solution"
      aria-label="Solution scope diagram"
      className="py-[120px] max-[767px]:py-[70px] site-container mx-auto"
    >
      <div className="flex gap-10 justify-between items-end mb-[55px] max-[767px]:block max-[767px]:mb-9">
        <div>
          <p className="eyebrow text-brand">
            Inside the solution
          </p>
          <h2 className="max-w-[760px] mt-6 max-[767px]:mt-5">
            {b.title}
          </h2>
        </div>
        <span className="inline-flex gap-[10px] items-center shrink-0 text-[13px] text-brand bg-white border border-[#e2e8f0] rounded-full py-[9px] px-4 max-[767px]:mt-6">
          <Glyph name="layers" size={18} /> Scope map
        </span>
      </div>
      <div className="relative grid grid-cols-3 gap-x-[8%] items-center min-h-[320px] max-[1023px]:grid-cols-1 max-[1023px]:min-h-0">
        <svg
          className="blueprint-wires absolute inset-0 w-full h-full max-[1023px]:hidden"
          viewBox="0 0 1000 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={wires} />
          <path data-wire-draw d={wires} pathLength="1" />
        </svg>
        <div className="relative flex flex-col gap-[80px] self-stretch max-[1023px]:gap-4">
          {b.inputs.map((n) => (
            <BlueprintNode key={n.label} node={n} />
          ))}
        </div>
        <span aria-hidden="true" className={connector} />
        <div className="relative">
          <BlueprintNode node={b.centre} centre />
        </div>
        <span aria-hidden="true" className={connector} />
        <div className="relative flex flex-col gap-[80px] self-stretch max-[1023px]:gap-4">
          {b.outputs.map((n) => (
            <BlueprintNode key={n.label} node={n} />
          ))}
        </div>
      </div>
      <p className="text-[12px] text-[#000000] mt-9 max-[767px]:mt-7">{b.note}</p>
    </section>
  );
}
