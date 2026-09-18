import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
export function PartnerPromise({ compact = false }) {
  return (
    <section
      className={"partner-promise section" + (compact ? " compact" : "")}
    >
      <div className="wrap partner-promise-grid">
        <div>
          <p className="eyebrow">What being your growth partner means</p>
          <h2>
            You bring the ambition.
            <br />
            <span>We connect the people.</span>
          </h2>
          <p>
            One relationship with a wider view. Your brand, your digital
            experience and your operating systems can be planned together. Begin
            with a focused project and build the relationship around what your
            business needs next.
          </p>
          <Link href="/about" className="text-link">
            Meet the company behind the work <ArrowUpRight />
          </Link>
        </div>
        <div className="partner-promises">
          {[
            [
              "A shared understanding",
              "Your business context stays in the brief as work moves from strategy to design, engineering and marketing.",
            ],
            [
              "Specialists who work together",
              "An in-house team, experienced advisors and consultants are brought together for the engagement.",
            ],
            [
              "Someone connecting the work",
              "A named delivery lead, shared reviews and visible decisions keep the different disciplines moving in the same direction.",
            ],
            [
              "Continuity as you grow",
              "Carry the context, assets and decisions into the next agreed phase, with a team that understands what has already been built.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
