import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
const chapters = [
  {
    label: "Our foundation",
    title: "It started with technology.",
    body: "The entrepreneurial journey began in 2021. TechGy Innovations was registered in 2022, building a foundation in design, software and digital delivery.",
    detail:
      "Understanding the work. Designing the experience. Engineering the solution.",
  },
  {
    label: "Our expansion",
    title: "The brief grew. So did we.",
    body: "A brand needs an experience. A campaign needs a destination. An enquiry needs a next step. We expanded our capabilities as the work connected across those boundaries.",
    detail:
      "Brand and product design. Engineering and mobile. Marketing, visualisation, automation and advisory. More of the business around the same brief.",
  },
  {
    label: "Our next chapter",
    title: "More of your business. Working together.",
    body: "TechGy Link brings that wider company together. A growth partner who can see the brand, the customer experience and the business behind it—and connect the specialists each needs.",
    detail:
      "Start with one challenge. Build with a partner who can understand what comes next.",
  },
];
export function CompanyEvolution() {
  return (
    <section
      className="bg-brand text-white pt-[105px] pb-[60px] max-[767px]:pt-[65px] max-[767px]:pb-[35px]"
      id="why-link"
    >
      <div className="site-container mx-auto">
        <p className="text-[14px] text-[#f8f9fa] max-[767px]:text-[12px]">
          The reason behind the rebrand
        </p>
        <h2 className="text-[clamp(42px,4.5vw,69px)] leading-[1.14] max-w-[1120px] mt-[25px] max-[767px]:text-[36px] max-[767px]:leading-[1.2] max-[767px]:mt-[22px]">
          We kept adding the people
          <br className="max-[767px]:hidden" />
          <span className="max-[767px]:block max-[767px]:mt-[5px]">
            our clients needed next.
          </span>
        </h2>
      </div>
      <div className="site-container mx-auto grid grid-cols-[1fr_1fr] gap-[115px] items-start mt-20 max-[1100px]:gap-[55px] max-[767px]:block max-[767px]:mt-10">
        <div
          className="sticky top-[125px] pt-[35px] px-[35px] pb-[25px] bg-[#0022ff] border border-[#e2e8f0] min-w-0 rounded max-[1100px]:p-[27px] max-[767px]:relative max-[767px]:top-0 max-[767px]:p-[26px] max-[767px]:max-w-[520px] max-[767px]:min-h-0 max-[767px]:mb-10"
          aria-hidden="true"
        >
          <div>
            <span className="text-[12px] uppercase tracking-[0.09em] text-[#f8f9fa]">
              Our foundation
            </span>
            <p className="font-display text-[54px] leading-[1.05] tracking-[-0.04em] mt-[15px] max-[1100px]:text-[44px] max-[767px]:text-[clamp(32px,9vw,43px)] max-[767px]:leading-[1.08]">
              TechGy
              <br />
              Innovations.
            </p>
            <div className="evolution-rule h-px bg-[#e2e8f0] my-[27px] relative">
              <i className="absolute inset-0 bg-white origin-left" />
            </div>
            <span className="text-[12px] uppercase tracking-[0.09em] text-[#f8f9fa]">
              Our collective future
            </span>
            <p className="text-[52px] max-[1100px]:text-[44px] max-[767px]:text-[clamp(30px,8.5vw,40px)]">
              TechGy <strong className="font-normal">Link.</strong>
            </p>
          </div>
          <div className="grid grid-cols-[repeat(3,_1fr)] gap-[7px] mt-7 max-[1100px]:grid-cols-[repeat(2,_1fr)] max-[767px]:grid-cols-[repeat(2,minmax(0,1fr))] max-[767px]:gap-1.5 max-[767px]:mt-6">
            {[
              "Brand",
              "Product design",
              "Websites",
              "Software",
              "Mobile",
              "AI & integration",
              "Marketing",
              "Visualisation",
              "Advisory",
            ].map((s, i) => (
              <span
                key={s}
                data-strength={i}
                className="text-xs border border-[#e2e8f0] py-[9px] px-[7px] text-center rounded-sm text-white leading-normal max-[767px]:text-[12px] max-[767px]:py-2 max-[767px]:px-[5px]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs leading-[1.6] text-[#f8f9fa] mt-[21px] max-[767px]:text-[12px]">
            More capabilities. One connected company.
          </p>
        </div>
        <div>
          {chapters.map((c, i) => (
            <article
              key={c.label}
              className="evolution-chapter min-h-[490px] flex justify-center flex-col py-[45px] border-t border-[#e2e8f07a] scroll-mt-[30px] max-[767px]:min-h-0 max-[767px]:pt-[35px] max-[767px]:pb-[38px]"
              data-evolution-step={i}
            >
              <p className="text-[#f8f9fa] text-[13px] max-[767px]:text-[12px]">
                0{i + 1} / {c.label}
              </p>
              <h3 className="text-5xl leading-[1.12] max-w-[440px] my-6 max-[1100px]:text-[40px] max-[767px]:text-[34px] max-[767px]:my-5">
                {c.title}
              </h3>
              <p className="text-[17px] leading-[1.85] text-[#f8f9fa] max-w-[490px] max-[767px]:text-base">
                {c.body}
              </p>
              <p className="text-[15px]! text-[#f8f9fa]! mt-[22px] leading-[1.75]! max-[767px]:mt-5">
                {c.detail}
              </p>
              {i === 2 && (
                <Link
                  href="/about"
                  className="cta-link inline-flex items-center font-medium text-brand self-start mt-[25px] border-b border-[#e2e8f0] pb-[7px] text-white"
                >
                  The story behind TechGy Link <ArrowUpRight size={20} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
