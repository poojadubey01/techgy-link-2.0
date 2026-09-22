import { WorkExplorer } from "@/app/components/shared/faq-and-explorer";
import { CTA } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Our work",
  description:
    "Explore lending, recruitment, property, sales operations, mobile integrations and architectural visualisation by TechGy Link.",
};
export default function Work() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-[min(1424px,calc(100%_-_112px))] mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <p className="eyebrow text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
          Selected work
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          Different challenges.
          <br />
          <span className="text-brand">Considered answers.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          The business challenge, the important decisions and the expertise
          behind the answer. Explore completed engagements, ongoing projects and
          architectural visualisation.
        </p>
      </section>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto pt-4 pb-5 max-[767px]:pt-2 max-[767px]:pb-0">
        <WorkExplorer />
      </section>
      <CTA />
    </main>
  );
}
