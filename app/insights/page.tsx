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
    <main id="main" className="flow-root bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <p className="eyebrow text-brand">
          Ideas from the work
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          A little clarity.
          <br />
          <span className="text-brand">A better next decision.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          Practical perspectives on the questions that come before a successful
          brief.
        </p>
      </section>
      <section className="site-container mx-auto grid grid-cols-3 gap-[45px] max-[1023px]:gap-7 max-[767px]:grid-cols-1 max-[767px]:gap-[35px]">
        {articles.map((a) => (
          <article
            className="border-t border-t-[#e2e8f0] pt-[30px]"
            key={a.id}
          >
            <p className="eyebrow text-[#111625]">
              {a.category}
            </p>
            <h3 className="text-[32px] my-[26px] mx-0 leading-[1.18] max-[1023px]:text-[28px]">
              <Link href={"/insights/" + a.id}>{a.title}</Link>
            </h3>
            <p className="text-[#000000] text-[16px]">{a.summary}</p>
            <Link
              className="cta-link inline-flex items-center font-medium text-brand mt-[30px]"
              href={"/insights/" + a.id}
            >
              Read the perspective <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <CTA />
    </main>
  );
}
