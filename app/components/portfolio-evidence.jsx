import Link from "./site-link";
import { ArrowUpRight } from "./icons";
import { storyFor, portfolioStories } from "@/data/portfolio-stories";
export function CaseArtwork({ story: p, compact = false, priority = false }) {
  return (
    <div
      className={`case-art art-${p.art} tone-${p.tone}${compact ? " art-compact" : ""}`}
    >
      <img
        src={p.image}
        alt={`${p.name} — ${p.art === "phone" ? "supplied mobile presentation" : "project presentation"}`}
        width={p.art === "phone" ? 918 : 1600}
        height={p.art === "phone" ? 1800 : 1000}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      {!compact && (
        <div className="case-art-note">
          <span>{p.name}</span>
          <span>Project presentation</span>
        </div>
      )}
    </div>
  );
}
export function StoryCard({ project: p }) {
  const story = storyFor(p.slug);
  return (
    <Link
      className={`work-card portfolio-card${story ? " has-story" : ""}`}
      href={"/work/" + p.slug}
    >
      <div className="work-image">
        {story ? (
          <CaseArtwork story={story} compact />
        ) : (
          <img
            src={p.image}
            alt={p.name + " project presentation"}
            width="1600"
            height="1000"
            loading="lazy"
          />
        )}
        <span className="image-link">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="work-meta">
        <h3>{p.name}</h3>
        <p>{p.category}</p>
      </div>
      {story && (
        <>
          <p className="story-card-line">{story.headline}</p>
          <div className="story-card-footer">
            <span>{story.market}</span>
            <span>{story.status}</span>
          </div>
        </>
      )}
    </Link>
  );
}
export function PortfolioBreadth() {
  return (
    <section className="portfolio-breadth section wrap">
      <div className="portfolio-section-heading">
        <div>
          <p className="eyebrow">The work behind our perspective</p>
          <h2>
            Every business has
            <br />
            its own <span className="text-brand">moving parts.</span>
          </h2>
        </div>
        <p>
          A lender’s decision process. A sales team’s next conversation. A
          workout in motion. We get close to the task, then connect the
          expertise it needs.
        </p>
      </div>
      <div className="portfolio-three">
        {["lending-bridge", "planet-green-crm", "spur-fit"].map((slug) => (
          <StoryCard key={slug} project={storyFor(slug)} />
        ))}
      </div>
      <Link href="/work" className="text-link">
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
export function SolutionEvidence({ id }) {
  const selected = solutionProof[id] || [];
  return (
    <section className="section wrap solution-project-proof">
      <div className="portfolio-section-heading">
        <div>
          <p className="eyebrow">Relevant project experience</p>
          <h2>
            See the thinking
            <br />
            in the work.
          </h2>
        </div>
        <p>
          These engagements show relevant parts of the journey. Each story makes
          its contribution and delivery stage clear.
        </p>
      </div>
      <div className="portfolio-two">
        {selected.map((slug) => (
          <StoryCard
            key={slug}
            project={portfolioStories.find((p) => p.slug === slug)}
          />
        ))}
      </div>
    </section>
  );
}
