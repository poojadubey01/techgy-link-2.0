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
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <p className="eyebrow text-brand">
          Focused engagements
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          One clear challenge.
          <br />
          <span className="text-brand">A useful first step.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          Find the starting point that matches what your business needs right
          now.
        </p>
      </section>
      <section className="site-container mx-auto grid grid-cols-3 gap-[35px] max-[1023px]:grid-cols-2 max-[767px]:grid-cols-1 max-[767px]:gap-[25px]">
        {campaigns.map((c) => (
          <Link
            className="group p-8 border border-[#e2e8f0] bg-[#f8f9fa] min-h-[340px] flex items-start flex-col rounded-[5px] hover:bg-brand hover:border-brand transition-all duration-300 max-[767px]:min-h-[300px] max-[767px]:p-7"
            key={c.slug}
            href={"/campaigns/" + c.slug}
          >
            <p className="eyebrow text-brand group-hover:text-white/80 transition-colors duration-300">
              {c.service.short}
            </p>
            <h3 className="text-[33px] my-[35px] mx-0 max-[767px]:text-[32px] max-[767px]:my-[25px] text-ink group-hover:text-white transition-colors duration-300">
              {c.headline}
            </h3>
            <span className="cta-link inline-flex items-center font-medium text-brand group-hover:text-white mt-auto transition-colors duration-300">
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
