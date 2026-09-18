import Link from "@/app/components/ui/internal-link";
import { articles } from "@/data/catalogue";
import { CTA, Arrow } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Insights",
  description:
    "Practical perspectives on digital experiences, workflow automation and connected property launches.",
};
export default function Insights() {
  return (
    <main id="main">
      <section className="page-intro wrap">
        <p className="eyebrow">Ideas from the work</p>
        <h1>
          A little clarity.
          <br />
          <span className="blue-text">A better next decision.</span>
        </h1>
        <p>
          Practical perspectives on the questions that come before a successful
          brief.
        </p>
      </section>
      <section className="insight-grid wrap">
        {articles.map((a) => (
          <article className="insight-card" key={a.id}>
            <p className="eyebrow">{a.category}</p>
            <h3>
              <Link href={"/insights/" + a.id}>{a.title}</Link>
            </h3>
            <p>{a.summary}</p>
            <Link className="text-link" href={"/insights/" + a.id}>
              Read the perspective <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <CTA />
    </main>
  );
}
