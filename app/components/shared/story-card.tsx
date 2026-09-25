"use client";
import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { storyFor, portfolioStories } from "@/data/portfolio-stories";
import { CaseArtwork } from "@/app/components/shared/portfolio-highlights";

type ProjectLike = {
  slug: string;
  name: string;
  category: string;
  image: string;
};

type Story = (typeof portfolioStories)[number];

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
  const story = storyFor(p.slug) as Story | undefined;
  const href =
    from && from !== "All"
      ? `/work/${p.slug}?from=${from}`
      : `/work/${p.slug}`;

  const saveScroll = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("work_scroll_pos", window.scrollY.toString());
    }
  };

  return (
    <Link
      className="work-card portfolio-card"
      href={href}
      onClick={saveScroll}
    >
      <div className={`relative overflow-hidden rounded-md bg-[#e2e8f0] ${story && story.art !== "phone" ? "" : compact ? "aspect-[1.25] max-[767px]:aspect-[1.2]" : "aspect-[1.25] max-[767px]:aspect-[1.15]"}`}>
        {story ? (
          <CaseArtwork story={story} compact variant="portfolio" />
        ) : (
          <img
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
          <p className="text-[17px] leading-normal mt-4 tracking-[-0.02em] text-[#000000] truncate max-[1023px]:whitespace-normal max-[1023px]:line-clamp-2 max-[767px]:text-[15px] max-[767px]:mt-2.5">
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
