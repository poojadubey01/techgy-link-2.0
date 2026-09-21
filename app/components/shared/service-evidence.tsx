import { CaseArtwork } from "@/app/components/shared/portfolio-highlights";
import { storyFor } from "@/data/portfolio-stories";
import Link from "@/app/components/ui/internal-link";
import { work, services } from "@/data/catalogue";
import { ArrowUpRight } from "@/app/components/ui/icons";

type Service = (typeof services)[number];

export function ServiceEvidence({
  service: s,
  campaign = false,
}: {
  service: Service;
  campaign?: boolean;
}) {
  if (s.id === "technology-consulting-modernisation")
    return (
      <section
        className="section proof-section"
        id={campaign ? undefined : "proof"}
      >
        <div className="wrap assessment-evidence">
          <div>
            <p className="eyebrow">Example assessment outputs</p>
            <h2>
              Advice you can
              <br />
              make decisions with.
            </h2>
            <p>
              An assessment can bring the current systems, available options and
              implementation priorities into a practical decision pack. The exact
              deliverables follow the agreed review scope.
            </p>
          </div>
          <ol>
            {[
              [
                "Current-state map",
                "Systems, data flows, owners and dependencies.",
              ],
              [
                "Options and trade-offs",
                "What to retain, change, integrate or replace—and why.",
              ],
              [
                "Risk and dependency register",
                "The constraints and decisions that affect delivery.",
              ],
              [
                "Phased roadmap",
                "Priorities, review points and implementation responsibilities.",
              ],
            ].map(([t, d], i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  if (s.id === "branding-identity")
    return (
      <section
        className="section proof-section"
        id={campaign ? undefined : "proof"}
      >
        <div className="wrap split-section">
          <div>
            <p className="eyebrow">Our own identity</p>
            <h2>
              A complete system.
              <br />
              Beyond the logo.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              The TechGy Link identity connects a precise wordmark, electric blue
              and a consistent visual language.
            </p>
            <p>
              It is one example of how a brand system works across a website and
              communication materials. We can discuss identity work relevant to
              your own brief.
            </p>
          </div>
        </div>
      </section>
    );
  const p = work.find((p) => p.slug === s.proof);
  if (!p) return null;
  const story = storyFor(p.slug);
  const marketing = s.id === "digital-marketing-sales-enablement";
  return (
    <section
      className="section proof-section"
      id={campaign ? undefined : "proof"}
    >
      <div className="wrap proof-row">
        <Link href={"/work/" + p.slug}>
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
        </Link>
        <div>
          <p className="eyebrow">
            {marketing
              ? "Sales-system engagement"
              : s.id === "ai-automation-system-integration"
                ? "Integration project"
                : "Selected work"}{" "}
            / {p.category}
          </p>
          <h2>{p.name}</h2>
          <p>
            {marketing
              ? "The Planet Green CRM engagement connects enquiry sources, post-call context and sales follow-up. It shows the operational side of a marketing-to-sales journey; the project is ongoing."
              : p.description}
          </p>
          <Link href={"/work/" + p.slug} className="text-link">
            {marketing ? "Explore the CRM scope" : "Explore the project"}{" "}
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
