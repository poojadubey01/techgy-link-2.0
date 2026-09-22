import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { storyFor, portfolioStories } from "@/data/portfolio-stories";

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
  fitImage = false,
}: {
  story: Story;
  compact?: boolean;
  priority?: boolean;
  variant?: "default" | "portfolio" | "proof";
  fitImage?: boolean;
}) {
  const naturalSize = fitImage || p.image.endsWith(".svg");
  const toneBg = p.tone === "spur" ? "bg-navy" : "bg-[#e2e8f0]";
  return (
    <div
      className={`relative overflow-hidden ${toneBg} ${naturalSize ? "h-auto" : caseArtVariants[variant]}`}
    >
      <img
        key={p.image + (naturalSize ? "-natural" : "-framed")}
        style={naturalSize ? { display: "block", position: "static", width: "100%", height: "auto", maxWidth: "100%", transform: "none", translate: "none", scale: "none" } : undefined}
        data-preserve-image-bounds={naturalSize ? "" : undefined}
        src={p.image}
        alt={`${p.name} — ${p.art === "phone" ? "supplied mobile presentation" : "project presentation"}`}
        width={p.image.endsWith(".svg") ? 761 : p.art === "phone" ? 918 : 1600}
        height={p.image.endsWith(".svg") ? 427 : p.art === "phone" ? 1800 : 1000}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={
          naturalSize ? "block w-full h-auto object-contain" : p.art === "phone"
            ? casePhoneImgVariants[variant]
            : "h-full w-full object-cover"
        }
      />
      {!compact && (
        <div className="absolute left-[25px] right-[25px] bottom-[17px] flex justify-between gap-2.5 text-[12px] text-[#000000] max-[767px]:left-[15px] max-[767px]:right-[15px] max-[767px]:bottom-[13px]">
          <span>{p.name}</span>
          <span>Project presentation</span>
        </div>
      )}
    </div>
  );
}
export function StoryCard({
  project: p,
  from,
  showMetadata = true,
  compact = false,
}: {
  project: ProjectLike;
  from?: string;
  showMetadata?: boolean;
  compact?: boolean;
}) {
  const story = storyFor(p.slug);
  const href =
    from && from !== "All"
      ? `/work/${p.slug}?from=${from}`
      : `/work/${p.slug}`;
  return (
    <Link className="work-card portfolio-card block min-w-0 w-full" href={href}>
      <div className={`relative overflow-hidden bg-[#e2e8f0] ${compact || story?.image.endsWith(".svg") ? "" : "aspect-[1.25] max-[767px]:aspect-[1.15]"}`}>
        {story ? (
          <CaseArtwork story={story} compact variant="portfolio" fitImage={compact} />
        ) : (
          <img
            key={p.image + (compact ? "-natural" : "-framed")}
        style={compact ? { display: "block", position: "static", width: "100%", height: "auto", maxWidth: "100%", transform: "none", translate: "none", scale: "none" } : undefined}
        data-preserve-image-bounds={compact ? "" : undefined}
        src={p.image}
            alt={p.name + " project presentation"}
            width="1600"
            height="1000"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
        <span className="absolute bottom-5 right-5 rounded-full bg-white w-[46px] h-[46px] grid place-items-center">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4 mt-[22px]">
        <h3 className="min-w-0 text-[29px] leading-tight tracking-[-0.04em] max-[767px]:text-[24px]">
          {p.name}
        </h3>
        <p className="min-w-0 max-w-[45%] shrink-0 text-[13px] leading-[1.6] text-[#000000]/70 text-right m-0">
          {p.category}
        </p>
      </div>
      {story && (
        <>
          <p className="text-[17px] leading-normal mt-4 tracking-[-0.02em] text-[#000000] truncate max-[767px]:text-[15px] max-[767px]:mt-2.5">
            {story.headline}
          </p>
          {showMetadata && (
            <div className="flex justify-between gap-[15px] border-t border-t-rule mt-5 pt-[15px] text-[12px] text-[#000000]">
              <span>{story.market}</span>
              <span>{story.status}</span>
            </div>
          )}
        </>
      )}
    </Link>
  );
}
export function PortfolioBreadth() {
  return (
    <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto py-[85px] border-b border-b-rule max-[1023px]:py-[70px] max-[767px]:py-[55px]">
      <div className="grid grid-cols-[1.4fr_1fr] gap-[10%] items-end mb-8 max-[1023px]:gap-10 max-[767px]:block max-[767px]:mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
            The work behind our perspective
          </p>
          <h2 className="text-[clamp(34px,4vw,55px)] leading-[1.1] tracking-tighter mt-[23px] max-[767px]:text-[34px]">
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
      <div className="grid grid-cols-2 gap-[30px] max-[1023px]:gap-[22px] max-[767px]:grid-cols-1 max-[767px]:gap-[38px]">
        {["lending-bridge", "planet-green-crm"].map((slug) => (
          <StoryCard key={slug} project={storyFor(slug)!} showMetadata={false} compact />
        ))}
      </div>
      <Link
        href="/work"
        className="cta-link inline-flex items-center font-medium text-brand mt-8"
      >
        Explore the client stories <ArrowUpRight size={20} />
      </Link>
    </section>
  );
}
const solutionProof = {
  "property-launch-sales": ["greenland-capital", "planet-green-crm"],
  "connected-sales-operations": ["planet-green-crm", "quickbooks-integration"],
  "digital-experience-product": ["lending-bridge", "nex2u"],
};
export function SolutionEvidence({ id }: { id: string }) {
  const selected = solutionProof[id as keyof typeof solutionProof] || [];
  return (
    <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
      <div className="grid grid-cols-[1.4fr_1fr] gap-[10%] items-end mb-[42px] max-[1023px]:gap-10 max-[767px]:block max-[767px]:mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
            Relevant project experience
          </p>
          <h2 className="text-[clamp(36px,4.6vw,65px)] leading-[1.1] tracking-tighter mt-[23px] max-[767px]:text-[39px]">
            See the thinking
            <br />
            in the work.
          </h2>
        </div>
        <p className="text-[17px] leading-[1.85] text-[#000000] max-w-[430px] max-[767px]:text-[16px] max-[767px]:mt-6">
          These engagements show relevant parts of the journey. Each story makes
          its contribution and delivery stage clear.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-[45px] max-[767px]:grid-cols-1 max-[767px]:gap-[38px]">
        {selected.map((slug) => (
          <StoryCard
            key={slug}
            project={portfolioStories.find((p) => p.slug === slug)!}
          />
        ))}
      </div>
    </section>
  );
}
