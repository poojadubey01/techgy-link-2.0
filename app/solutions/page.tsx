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
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto section-space">
        <p className="eyebrow text-brand">
          Connected solutions
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          Your bigger ambition.
          <br />
          <span className="text-brand">Our collective strength.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          A property launch. A more connected operation. A new digital
          experience. Our solutions bring different teams into one conversation,
          so the work moves toward the same business goal.
        </p>
      </section>
      <section>
        <div className="site-container mx-auto">
          {solutions.map((s, i) => (
            <Link
              key={s.id}
              className="solution-editorial-row reveal grid grid-cols-[1fr_1fr] gap-[95px] items-center py-[55px] border-t border-rule max-[1023px]:gap-[35px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[26px] max-[767px]:py-8"
              href={"/solutions/" + s.id}
            >
              <div
                className={
                  "overflow-hidden bg-[#e2e8f0] w-full rounded-md relative" +
                  (i % 2 === 1 ? " md:order-2" : "")
                }
              >
                <img
                  className="block w-full h-auto rounded-md"
                  src={s.image}
                  alt={s.short + " — related project presentation"}
                  width="1600"
                  height="1000"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="max-w-[480px] px-[15px] max-[1023px]:px-0">
                <p className="eyebrow text-brand">
                  {s.kicker}
                </p>
                <h3 className="text-[clamp(34px,3.5vw,56px)] my-[25px] mx-0 max-[1023px]:text-[36px] max-[767px]:text-[34px] max-[767px]:my-[18px] max-[767px]:mx-0">
                  {s.short}
                </h3>
                <p className="text-[#000000] text-[16px] max-[767px]:text-[15px]">
                  {s.description}
                </p>
                <span className="cta-link inline-flex items-center font-medium text-brand mt-8 max-[767px]:mt-[23px]">
                  Explore the solution <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTA
        title="One service can be enough."
        text="These are flexible combinations. You can begin with a visualisation brief, a website or one workflow. Expand the scope only when the need is clear."
      />
    </main>
  );
}
