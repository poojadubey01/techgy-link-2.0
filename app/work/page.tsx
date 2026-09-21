import { WorkExplorer } from "@/app/components/shared/faq-and-explorer";
import { CTA } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Our work",
  description:
    "Explore lending, recruitment, property, sales operations, mobile integrations and architectural visualisation by TechGy Link.",
};
export default function Work() {
  return (
    <main id="main" className="bg-paper">
      <section className="page-intro w-[min(1424px,calc(100%_-_112px))] mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:tracking-[0.085em]">
          Selected work
        </p>
        <h1>
          Different challenges.
          <br />
          <span className="text-brand">Considered answers.</span>
        </h1>
        <p className="text-sm text-[#000000] mt-5 max-w-[780px] leading-[1.8]">
          The business challenge, the important decisions and the expertise
          behind the answer. Explore completed engagements, ongoing projects and
          architectural visualisation.
        </p>
      </section>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
        <WorkExplorer />
      </section>
      <CTA />
    </main>
  );
}
