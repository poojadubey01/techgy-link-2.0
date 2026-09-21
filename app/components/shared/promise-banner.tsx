import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
export function PartnerPromise({ compact = false }) {
  return (
    <section className="bg-paper py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1100px]:gap-[50px] max-[767px]:block">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[12px]">
            What being your growth partner means
          </p>
          <h2 className="text-[49px] leading-[1.17] my-[26px] max-[1100px]:text-[42px] max-[767px]:text-[36px] max-[767px]:leading-[1.2]">
            You bring the ambition.
            <br />
            <span className="text-brand">We connect the people.</span>
          </h2>
          <p className="text-[17px] leading-[1.85] text-[#000000] max-w-[510px] max-[767px]:text-[16px]">
            One relationship with a wider view. Your brand, your digital
            experience and your operating systems can be planned together. Begin
            with a focused project and build the relationship around what your
            business needs next.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand mt-[30px] text-[14px]"
          >
            Meet the company behind the work <ArrowUpRight />
          </Link>
        </div>
        <div className="partner-promises max-[767px]:mt-10">
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
            <article
              key={t}
              className="flex gap-[25px] py-7 border-t border-t-rule max-[767px]:gap-[18px] max-[767px]:py-[26px]"
            >
              <span className="text-[13px] text-brand pt-1.5">0{i + 1}</span>
              <div>
                <h3 className="text-[29px] leading-[1.2] mb-[18px] max-[767px]:text-[28px]">
                  {t}
                </h3>
                <p className="text-base leading-[1.8] text-[#000000] max-[767px]:text-[16px]">
                  {d}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
