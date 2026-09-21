import { CaseArtwork } from "@/app/components/shared/portfolio-highlights";
import { storyFor } from "@/data/portfolio-stories";
import Link from "@/app/components/ui/internal-link";
import { work, services } from "@/data/catalogue";
import { ArrowUpRight } from "@/app/components/ui/icons";

type Service = (typeof services)[number];

const sectionClass =
  "py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]";
const eyebrowClass =
  "text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]";
const textLinkClass =
  "inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand max-[767px]:text-[14px]";

export function ServiceEvidence({
  service: s,
  campaign = false,
}: {
  service: Service;
  campaign?: boolean;
}) {
  if (s.id === "technology-consulting-modernisation")
    return (
      <section className={sectionClass} id={campaign ? undefined : "proof"}>
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1.15fr] gap-[95px] items-start max-[1023px]:gap-[45px] max-[767px]:block">
          <div>
            <p className={eyebrowClass}>Example assessment outputs</p>
            <h2 className="text-[clamp(36px,3.9vw,62px)] mt-[22px] mb-[25px] max-[767px]:text-[37px]">
              Advice you can
              <br />
              make decisions with.
            </h2>
            <p className="text-[16px] leading-[1.85] text-[#000000] max-w-[440px]">
              An assessment can bring the current systems, available options and
              implementation priorities into a practical decision pack. The exact
              deliverables follow the agreed review scope.
            </p>
          </div>
          <ol className="p-0 list-none m-0 max-[767px]:mt-8">
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
              <li
                key={t}
                className="flex gap-6 border-t border-t-rule py-[25px] max-[767px]:py-[23px] max-[767px]:gap-[18px]"
              >
                <span className="text-[12px] text-brand pt-[7px]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[26px] tracking-[-0.025em] max-[767px]:text-[25px]">
                    {t}
                  </h3>
                  <p className="text-[15px] text-[#000000] mt-3 leading-[1.8]">
                    {d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  if (s.id === "branding-identity")
    return (
      <section className={sectionClass} id={campaign ? undefined : "proof"}>
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1200px]:gap-[50px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
          <div>
            <p className={eyebrowClass}>Our own identity</p>
            <h2 className="mt-6 max-[767px]:text-[37px] max-[767px]:mt-5">
              A complete system.
              <br />
              Beyond the logo.
            </h2>
          </div>
          <div>
            <p className="font-display text-[clamp(23px,2.35vw,35px)] leading-[1.4] tracking-[-0.025em] max-[767px]:text-[25px]">
              The TechGy Link identity connects a precise wordmark, electric blue
              and a consistent visual language.
            </p>
            <p className="text-[#000000] mt-6">
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
    <section className={sectionClass} id={campaign ? undefined : "proof"}>
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1.4fr_1fr] gap-[85px] items-center max-[1200px]:gap-[50px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <Link
          href={"/work/" + p.slug}
          className="overflow-hidden bg-rule block"
        >
          {story ? (
            <CaseArtwork story={story} compact variant="proof" />
          ) : (
            <img
              src={p.image}
              alt={p.name + " project presentation"}
              width="1600"
              height="1000"
              loading="lazy"
              className="w-full h-auto min-h-[360px] object-cover max-[767px]:min-h-0 max-[767px]:aspect-[1.3]"
            />
          )}
        </Link>
        <div>
          <p className={eyebrowClass}>
            {marketing
              ? "Sales-system engagement"
              : s.id === "ai-automation-system-integration"
                ? "Integration project"
                : "Selected work"}{" "}
            / {p.category}
          </p>
          <h2 className="text-[50px] my-[25px] mx-0 max-[1023px]:text-[38px] max-[767px]:text-[38px] max-[767px]:my-5 max-[767px]:mx-0">
            {p.name}
          </h2>
          <p className="text-[#000000] my-[25px] mx-0 max-[767px]:text-[15px] max-[767px]:my-5 max-[767px]:mx-0">
            {marketing
              ? "The Planet Green CRM engagement connects enquiry sources, post-call context and sales follow-up. It shows the operational side of a marketing-to-sales journey; the project is ongoing."
              : p.description}
          </p>
          <Link href={"/work/" + p.slug} className={textLinkClass}>
            {marketing ? "Explore the CRM scope" : "Explore the project"}{" "}
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
