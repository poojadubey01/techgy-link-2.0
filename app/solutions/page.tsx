import Link from "@/app/components/ui/internal-link";
import { solutions } from "@/data/catalogue";
import { CTA, Arrow } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Connected business solutions",
  description:
    "Property launch, connected sales and operations, and digital product delivery: optional service combinations around a clear business problem.",
};
export default function Solutions() {
  return (
    <main id="main">
      <section className="page-intro wrap">
        <p className="eyebrow">Connected solutions</p>
        <h1>
          Your bigger ambition.
          <br />
          <span className="blue-text">Our collective strength.</span>
        </h1>
        <p>
          A property launch. A more connected operation. A new digital
          experience. Our solutions bring different teams into one conversation,
          so the work moves toward the same business goal.
        </p>
      </section>
      <section className="wrap solutions-index">
        {solutions.map((s, i) => (
          <Link
            key={s.id}
            className="solution-editorial-row reveal"
            href={"/solutions/" + s.id}
          >
            <div className="solution-editorial-image">
              <img
                src={s.image}
                alt={s.short + " — related project presentation"}
                width="1600"
                height="1000"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="solution-editorial-copy">
              <p className="eyebrow">
                0{i + 1} / {s.kicker}
              </p>
              <h3>{s.short}</h3>
              <p>{s.description}</p>
              <span className="text-link">
                Explore the solution <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <CTA
        title="One service can be enough."
        text="These are flexible combinations. You can begin with a visualisation brief, a website or one workflow. Expand the scope only when the need is clear."
      />
    </main>
  );
}
