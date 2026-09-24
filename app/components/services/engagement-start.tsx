import { engagements } from "@/data/engagements";
import { services } from "@/data/catalogue";

type Service = (typeof services)[number];

export function EngagementStart({ service: s }: { service: Service }) {
  const e = engagements[s.id as keyof typeof engagements];
  return (
    <section
      className="engagement-start site-container mx-auto bg-[#e2e8f0] rounded-md p-12 mt-0 mb-[35px] scroll-mt-6 max-[1023px]:p-[35px] max-[767px]:py-[29px] max-[767px]:px-[25px] max-[767px]:mb-5"
      id="starting-scope"
    >
      <div className="engagement-heading grid grid-cols-[0.9fr_2fr] gap-[50px] items-start max-[1023px]:gap-[35px] max-[767px]:block">
        <p className="eyebrow pt-[7px] text-brand">
          Your first engagement
        </p>
        <h2 className="text-[38px] leading-[1.17] tracking-[-0.035em] max-w-[750px] max-[1023px]:text-[34px] max-[767px]:text-[32px] max-[767px]:mt-[18px]">
          {e.start}
        </h2>
      </div>
      <div className="engagement-details grid grid-cols-3 gap-[38px] mt-[38px] max-[1023px]:gap-[25px] max-[767px]:grid-cols-1 max-[767px]:gap-[25px] max-[767px]:mt-[30px]">
        {[
          ["What to bring", e.inputs],
          ["What we define", e.output],
          ["Delivery and review", e.ownership],
        ].map(([t, d]) => (
          <div
            key={t}
            className="border-t border-[#e2e8f0] pt-[23px] max-[767px]:pt-[22px]"
          >
            <h3 className="text-[23px] tracking-[-0.025em] max-[767px]:text-[24px]">{t}</h3>
            <p className="text-[15px] leading-[1.85] text-[#000000] mt-[14px] max-[767px]:mt-3">
              {d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
