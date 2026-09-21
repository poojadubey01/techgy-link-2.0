import Link from "@/app/components/ui/internal-link";
import { campaigns } from "@/data/catalogue";
import { Arrow, CTA } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Focused engagements",
  description:
    "Start with one relevant problem: a brand, website, product experience, application, workflow, campaign, property visual or technology decision.",
};
export default function Campaigns() {
  return (
    <main id="main" className="campaigns-page">
      <section className="page-intro wrap">
        <p className="eyebrow">Focused engagements</p>
        <h1>
          One clear challenge.
          <br />
          <span className="blue-text">A useful first step.</span>
        </h1>
        <p>
          Find the starting point that matches what your business needs right
          now.
        </p>
      </section>
      <section className="wrap campaign-list">
        {campaigns.map((c) => (
          <Link
            className="campaign-card"
            key={c.slug}
            href={"/campaigns/" + c.slug}
          >
            <p className="eyebrow">{c.service.short}</p>
            <h3>{c.headline}</h3>
            <span className="text-link">
              {c.cta}
              <Arrow />
            </span>
          </Link>
        ))}
      </section>
      <CTA />
    </main>
  );
}
