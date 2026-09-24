import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { portfolioStories } from "@/data/portfolio-stories";
import architecture from "@/data/architecture";
import { StoryCard } from "@/app/components/shared/story-card";

type Story = (typeof portfolioStories)[number];
type ProjectLike = {
  slug: string;
  name: string;
  category: string;
  image: string;
};

const caseArtVariants = {
  default: "h-[550px] rounded-[5px] max-[1023px]:h-[470px] max-[767px]:h-[400px]",
  portfolio: "h-full rounded-none",
  proof: "h-[480px] max-[767px]:h-[365px]",
};
const casePhoneImgVariants = {
  default:
    "absolute h-[88%] w-auto max-w-[80%] left-1/2 top-[7%] -translate-x-1/2 object-contain [filter:drop-shadow(0_15px_18px_#0f1a341c)]",
  portfolio:
    "absolute h-[92%] w-auto max-w-[65%] left-1/2 top-[10%] -translate-x-1/2 object-contain [filter:drop-shadow(0_15px_18px_#0f1a341c)] max-[767px]:h-[93%] max-[767px]:top-[9%] max-[767px]:max-w-[60%]",
  proof:
    "absolute h-[88%] w-auto max-w-[80%] left-1/2 top-[7%] -translate-x-1/2 object-contain min-h-0 aspect-auto [filter:drop-shadow(0_15px_18px_#0f1a341c)]",
};

export function CaseArtwork({
  story: p,
  compact = false,
  priority = false,
  variant = "default",
  showCaption = true,
}: {
  story: Story;
  compact?: boolean;
  priority?: boolean;
  variant?: "default" | "portfolio" | "proof";
  fitImage?: boolean;
  showCaption?: boolean;
}) {
  const toneBg = p.tone === "spur" ? "bg-navy" : "bg-[#e2e8f0]";
  return (
    <div
      className={`relative overflow-hidden ${toneBg} ${caseArtVariants[variant]}`}
    >
      <img
        src={p.image}
        alt={`${p.name} — ${p.art === "phone" ? "supplied mobile presentation" : "project presentation"}`}
        width={p.art === "phone" ? 918 : 1600}
        height={p.art === "phone" ? 1800 : 1000}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={
          p.art === "phone"
            ? casePhoneImgVariants[variant]
            : "h-full w-full object-cover"
        }
      />
      {!compact && showCaption && (
        <div className="absolute left-[25px] right-[25px] bottom-[17px] flex justify-between gap-2.5 text-[12px] text-[#000000] max-[767px]:left-[15px] max-[767px]:right-[15px] max-[767px]:bottom-[13px]">
          <span>{p.name}</span>
          <span>Project presentation</span>
        </div>
      )}
    </div>
  );
}

export { StoryCard } from "@/app/components/shared/story-card";

export function PortfolioBreadth() {
  return (
    <section className="site-container mx-auto py-[85px] border-b border-b-rule max-[1023px]:py-[70px] max-[767px]:py-[55px]">
      <div className="grid grid-cols-[1.4fr_1fr] gap-[10%] items-end mb-8 max-[1023px]:gap-10 max-[767px]:block max-[767px]:mb-6">
        <div>
          <p className="eyebrow text-brand">
            The work behind our perspective
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            Every business has
            <br />
            its own <span className="text-brand">moving parts.</span>
          </h2>
        </div>
        <p className="text-[17px] leading-[1.85] text-[#000000] max-w-[430px] max-[767px]:text-[16px] max-[767px]:mt-6">
          A lender’s decision process. A sales team’s next conversation. A
          workout in motion. We get close to the task, then connect the
          expertise it needs.
        </p>
      </div>
      <Link
        href="/work"
        className="cta-button inline-flex items-center justify-center rounded-full bg-brand text-white"
      >
        Explore our projects <ArrowUpRight size={20} />
      </Link>
    </section>
  );
}

const solutionProof = {
  "connected-sales-operations": ["planet-green-crm", "quickbooks-integration"],
  "digital-experience-product": ["lending-bridge", "nex2u"],
};

const propertyLaunchProof = ["dates-county", "vasavi-atlantis"].map((slug) => {
  const project = architecture.find((p) => p.slug === slug)!;
  return {
    slug: project.slug,
    name: project.title,
    category: project.sector,
    image: project.coverImage,
  };
});

export function SolutionEvidence({ id }: { id: string }) {
  const isPropertyLaunch = id === "property-launch-sales";
  const selected = isPropertyLaunch
    ? propertyLaunchProof
    : (solutionProof[id as keyof typeof solutionProof] || []).map(
        (slug) => portfolioStories.find((p) => p.slug === slug)!,
      );
  return (
    <section className="site-container mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
      <div className="grid grid-cols-[1.4fr_1fr] gap-[10%] items-end mb-[42px] max-[1023px]:gap-10 max-[767px]:block max-[767px]:mb-8">
        <div>
          <p className="eyebrow text-brand">
            Relevant project experience
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            See the thinking
            <br />
            in the work.
          </h2>
        </div>
        <p className="text-[17px] leading-[1.85] text-[#000000] max-w-[430px] max-[767px]:text-[16px] max-[767px]:mt-6">
          {isPropertyLaunch
            ? "These visualisation projects show how composition, light and material detail help people understand a proposed place."
            : "These engagements show relevant parts of the journey. Each story makes its contribution and delivery stage clear."}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[45px] max-[767px]:grid-cols-1 max-[767px]:gap-[38px]">
        {selected.map((project) => (
          <StoryCard
            key={project.slug}
            project={project}
            from={isPropertyLaunch ? "Visualisation" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
