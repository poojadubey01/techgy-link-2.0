import { WorkExplorer } from "../components/explore";
import { CTA } from "../components/connected";
export const metadata = {
  title: "Our work",
  description:
    "Explore lending, recruitment, property, sales operations, mobile integrations and architectural visualisation by TechGy Link.",
};
export default function Work() {
  return (
    <main id="main">
      <section className="page-intro wrap portfolio-work-intro">
        <p className="eyebrow">Selected work</p>
        <h1>
          Different challenges.
          <br />
          <span className="blue-text">Considered answers.</span>
        </h1>
        <p>
          The business challenge, the important decisions and the expertise
          behind the answer. Explore completed engagements, ongoing projects and
          architectural visualisation.
        </p>
      </section>
      <section className="wrap">
        <WorkExplorer />
      </section>
      <CTA />
    </main>
  );
}
