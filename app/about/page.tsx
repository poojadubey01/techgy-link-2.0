import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { PartnerPromise } from "@/app/components/shared/promise-banner";
export const metadata = {
  title: "Our story — from TechGy Innovations to TechGy Link",
  description:
    "How a technology foundation grew into a connected design, technology and growth partner. Meet the capabilities and people behind TechGy Link.",
};
const teams = [
  {
    n: "01",
    name: "Brand & digital experience",
    people:
      "Brand thinkers, visual designers, product designers and creative technologists.",
    purpose:
      "Give the business a clear identity and make its digital experiences understandable, distinctive and useful.",
    services: [
      ["Branding & Identity", "branding-identity"],
      ["UI/UX & Product Design", "ui-ux-product-design"],
      ["Website Design & Development", "website-design-development"],
    ],
  },
  {
    n: "02",
    name: "Software & mobile engineering",
    people:
      "Application engineers, backend and mobile developers, business analysts and QA.",
    purpose:
      "Turn the agreed experience and business rules into software people can use, with shared engineering where the work connects.",
    services: [
      ["Custom Software Development", "custom-software-development"],
      ["Mobile Application Development", "mobile-application-development"],
    ],
  },
  {
    n: "03",
    name: "Automation & connected systems",
    people:
      "Automation specialists, integration engineers and technical reviewers.",
    purpose:
      "Connect tools, remove repeated manual steps and make the important decisions and exceptions visible.",
    services: [
      [
        "AI Automation & System Integration",
        "ai-automation-system-integration",
      ],
    ],
  },
  {
    n: "04",
    name: "Marketing & sales enablement",
    people:
      "Marketing strategy, execution, creative and enquiry-journey support.",
    purpose:
      "Connect the audience, offer, landing experience and sales follow-up into a more considered path to opportunity.",
    services: [
      [
        "Digital Marketing & Sales Enablement",
        "digital-marketing-sales-enablement",
      ],
    ],
  },
  {
    n: "05",
    name: "Architectural visualisation",
    people:
      "Visualisation leads, CGI artists and finishing specialists where required.",
    purpose:
      "Make a proposed space understandable through composition, light and material—and prepare it for the way it will be presented.",
    services: [["Architectural Visualisation", "architectural-visualisation"]],
  },
  {
    n: "06",
    name: "Senior technology advisory",
    people:
      "Experienced advisors and engagement-specific consultants working with delivery owners.",
    purpose:
      "Bring assessment, architecture and review into the decisions that shape implementation.",
    services: [
      [
        "Technology Consulting & Modernisation",
        "technology-consulting-modernisation",
      ],
    ],
  },
];
const manifestoLines = [
  "The brand.",
  "The experience.",
  "The business behind it.",
  "They belong in the same conversation.",
];
export default function About() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto pt-[65px] pb-20 max-[767px]:pt-[35px] max-[767px]:pb-[50px]">
        <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[12px]">
          Our story / A company growing into its name
        </p>
        <h1 className="text-[clamp(59px,7.8vw,117px)] leading-[1.08] tracking-[-0.06em] mt-[33px] mb-[50px] max-[767px]:text-[48px] max-[767px]:leading-[1.1] max-[767px]:mt-[26px] max-[767px]:mb-[30px]">
          We grew.
          <br />
          <span className="text-brand">Our name grew with us.</span>
        </h1>
        <div className="grid grid-cols-[1.25fr_0.75fr] gap-[100px] max-[1100px]:gap-[50px] max-[767px]:block">
          <p className="text-[21px] leading-[1.8] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.85]">
            TechGy Innovations laid our technology foundation. TechGy Link
            expresses the company we’ve grown into: design, engineering,
            marketing, visualisation and advisory expertise around a client’s
            bigger ambition.
          </p>
          <div className="flex flex-col gap-[15px] text-[14px] text-[#000000] pt-1.5 max-[767px]:mt-7 max-[767px]:gap-3">
            <span>Founded by Phani Krishna</span>
            <span>Based in Hyderabad, India</span>
            <span>Client relationships in India, the UK and the USA</span>
            <a
              href="#our-teams"
              className="inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand max-[767px]:text-[14px]"
            >
              Meet the capabilities <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="rebrand-statement bg-brand text-white pt-[90px] pb-[100px] overflow-hidden max-[767px]:pt-[55px] max-[767px]:pb-[65px]">
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-[#f8f9fa] max-[767px]:text-[12px]">
            Why Link?
          </p>
          <h2
            className="text-[clamp(43px,5.8vw,87px)] leading-[1.13] max-w-[1160px] mt-[35px] mb-10 max-[767px]:text-[39px] max-[767px]:leading-[1.2] max-[767px]:mt-[26px] max-[767px]:mb-[30px]"
            aria-label={manifestoLines.join(" ")}
          >
            {manifestoLines.map((line, lineIndex) => (
              <span
                className="block text-[#f8f9fa]"
                key={line}
                aria-hidden="true"
              >
                {line.split(" ").map((word, wordIndex) => (
                  <span
                    data-rebrand-word
                    className="inline-block will-change-transform"
                    key={`${lineIndex}-${wordIndex}`}
                  >
                    {word}
                    {wordIndex < line.split(" ").length - 1 ? "\u00a0" : ""}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="text-[19px] leading-[1.85] text-[#f8f9fa] max-w-[770px] ml-auto max-[767px]:text-[17px]">
            Our capabilities grew one discipline at a time. The rebrand brings
            them into one identity and one way of working: specialists who
            understand their craft and the business it contributes to.
          </p>
        </div>
      </section>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] grid grid-cols-[1fr_1fr] gap-[110px] max-[1100px]:gap-[60px] max-[767px]:block">
        <div className="sticky top-[140px] self-start max-[767px]:static">
          <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand">
            How we got here
          </p>
          <h2 className="text-[52px] leading-[1.2] mt-[26px] max-[1100px]:text-[44px] max-[767px]:text-[39px] max-[767px]:mt-[22px]">
            A foundation.
            <br />A broader view.
            <br />
            <span className="text-brand">A shared future.</span>
          </h2>
        </div>
        <div className="max-[767px]:mt-10">
          {[
            [
              "November 2021",
              "The entrepreneurial journey begins.",
              "Phani Krishna starts the chapter that leads to TechGy Innovations.",
            ],
            [
              "2022",
              "TechGy Innovations is registered.",
              "A technology-services foundation, with design and engineering at the heart of the work.",
            ],
            [
              "As the company grew",
              "The capabilities broaden.",
              "Our expertise expands across brand, digital products, software, mobile, AI integration, marketing and architectural visualisation. Different teams add their perspective to the work.",
            ],
            [
              "TechGy Link today",
              "The wider company comes together.",
              "Nine independently available services. In-house teams supported by senior advisors and specialists. A growth-partner approach that connects the client’s ambition to the right people.",
            ],
          ].map(([date, title, body]) => (
            <article
              key={date}
              className="border-t border-[#e2e8f0] pt-8 pb-[42px] max-[767px]:pt-[25px] max-[767px]:pb-8"
            >
              <span className="text-[15px] text-brand max-[767px]:text-[14px]">
                {date}
              </span>
              <h3 className="text-[34px] leading-[1.2] mt-[22px] mb-5 max-[767px]:text-[30px] max-[767px]:mt-5 max-[767px]:mb-[17px]">
                {title}
              </h3>
              <p className="text-[17px] leading-[1.85] text-[#000000] max-[767px]:text-[16px]">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-0 mb-0 bg-[#0f1a34] py-20 text-white max-[767px]:py-[55px]">
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <div className="grid grid-cols-2 gap-[10%] items-end mb-[30px] max-[767px]:block">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-[#f8f9fa]">
                The people who make the work possible
              </p>
              <h2 className="text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-[-0.04em] mt-[22px] max-[767px]:text-[36px]">
                Behind the systems,
                <br />a team that cares.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.8] text-[#f8f9fa] max-[767px]:text-[16px] max-[767px]:mt-[23px]">
              Business analysts, designers, engineers and project owners bring
              different perspectives to the same challenge. That shared
              understanding is the foundation we continue to build on.
            </p>
          </div>
          <figure>
            <img
              src="/portfolio/techgy-team.webp"
              alt="TechGy team group photograph from the company portfolio"
              width="1280"
              height="341"
              loading="lazy"
              className="block w-full h-auto rounded-[5px] max-[767px]:rounded-[3px]"
            />
            <figcaption className="flex justify-between gap-5 text-xs leading-[1.6] mt-4 text-[#f8f9fa] max-[767px]:block max-[767px]:text-[12px]">
              From the TechGy Innovations chapter.
              <span className="max-[767px]:block max-[767px]:mt-1.5">
                Different disciplines, a shared commitment to the work.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        className="bg-[#f8f9fa] py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]"
        id="our-teams"
      >
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand">
              The people behind the possibilities
            </p>
            <h2 className="text-[clamp(41px,4.7vw,71px)] leading-[1.12] my-[25px]">
              Different expertise.
              <br />
              <span className="text-brand">One company to call.</span>
            </h2>
            <p className="text-[18px] leading-[1.85] max-w-[730px] text-[#000000]">
              The strength is in the specialisms—and in how they work together.
              The team for each engagement is agreed around the brief, with
              clear delivery and review ownership.
            </p>
          </div>
          <div className="team-disciplines grid grid-cols-[1fr_1fr] gap-y-10 gap-x-[75px] mt-[60px] max-[1100px]:gap-y-[38px] max-[1100px]:gap-x-10 max-[767px]:block max-[767px]:mt-[35px]">
            {teams.map((t) => (
              <article
                className="team-discipline flex gap-[23px] border-t border-[#e2e8f0] pt-[30px] max-[767px]:pt-[25px] max-[767px]:mt-8 max-[767px]:gap-[15px]"
                key={t.n}
              >
                <span className="text-[13px] text-brand pt-[7px]">{t.n}</span>
                <div>
                  <h3 className="text-[33px] leading-[1.18] mb-6 max-[767px]:text-[29px] max-[767px]:mb-5">
                    {t.name}
                  </h3>
                  <p className="text-[#000000] mb-[15px]">{t.people}</p>
                  <p className="text-[16px] leading-[1.85] text-[#000000]">
                    {t.purpose}
                  </p>
                  <div className="flex flex-col gap-3.5 mt-[25px]">
                    {t.services.map(([name, id]) => (
                      <Link
                        href={"/services/" + id}
                        key={id}
                        className="flex items-center gap-[15px] text-[14px] text-brand leading-[1.6]"
                      >
                        {name}
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#e2e8f0] py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <p className="text-brand text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6]">
            The company we are building
          </p>
          <h2 className="text-[clamp(43px,5.2vw,79px)] mt-[27px] mb-[35px] leading-[1.12] max-[767px]:text-[39px] max-[767px]:leading-[1.2] max-[767px]:mt-[23px] max-[767px]:mb-7">
            Start with one challenge.
            <br />
            Stay with a partner who
            <br />
            <span className="text-brand">sees what comes next.</span>
          </h2>
          <p className="text-[19px] leading-[1.8] max-w-[730px] text-[#000000] max-[767px]:text-[17px]">
            That is our ambition for TechGy Link. To understand enough of your
            business that each piece of work can contribute to the next—whether
            you need one specialist service today or a connected team for a
            larger chapter.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-7 px-7 py-4 text-sm font-medium min-h-14 border border-transparent rounded-full bg-brand text-white hover:brightness-90 mt-[35px] max-[767px]:text-[14px] max-[767px]:min-h-[51px] max-[767px]:py-[14px] max-[767px]:px-[18px] max-[767px]:gap-5"
          >
            Let’s build your next chapter <ArrowUpRight />
          </Link>
        </div>
      </section>
      <PartnerPromise />
    </main>
  );
}
