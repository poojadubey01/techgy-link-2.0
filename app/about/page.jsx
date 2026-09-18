import Link from "../components/site-link";
import { ArrowUpRight } from "../components/icons";
import { PartnerPromise } from "../components/partner-promise";
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
export default function About() {
  return (
    <main id="main">
      <section className="story-hero wrap">
        <p className="eyebrow">Our story / A company growing into its name</p>
        <h1>
          We grew.
          <br />
          <span>Our name grew with us.</span>
        </h1>
        <div className="story-hero-bottom">
          <p>
            TechGy Innovations laid our technology foundation. TechGy Link
            expresses the company we’ve grown into: design, engineering,
            marketing, visualisation and advisory expertise around a client’s
            bigger ambition.
          </p>
          <div>
            <span>Founded by Phani Krishna</span>
            <span>Based in Hyderabad, India</span>
            <span>Client relationships in India, the UK and the USA</span>
            <a href="#our-teams" className="text-link">
              Meet the capabilities <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="rebrand-statement">
        <div className="wrap">
          <p className="eyebrow">Why Link?</p>
          <h2>
            The brand.
            <br />
            The experience.
            <br />
            The business behind it.
            <br />
            <span>They belong in the same conversation.</span>
          </h2>
          <p>
            Our capabilities grew one discipline at a time. The rebrand brings
            them into one identity and one way of working: specialists who
            understand their craft and the business it contributes to.
          </p>
        </div>
      </section>
      <section className="section wrap company-journey">
        <div>
          <p className="eyebrow">How we got here</p>
          <h2>
            A foundation.
            <br />A broader view.
            <br />
            <span className="text-brand">A shared future.</span>
          </h2>
        </div>
        <div className="journey-entries">
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
            <article key={date}>
              <span>{date}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap portfolio-team">
        <div className="team-photo-intro">
          <div>
            <p className="eyebrow">The people who make the work possible</p>
            <h2>
              Behind the systems,
              <br />a team that cares.
            </h2>
          </div>
          <p>
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
          />
          <figcaption>
            From the TechGy Innovations chapter.
            <span>Different disciplines, a shared commitment to the work.</span>
          </figcaption>
        </figure>
      </section>
      <section className="team-practice section" id="our-teams">
        <div className="wrap">
          <div className="team-intro">
            <p className="eyebrow">The people behind the possibilities</p>
            <h2>
              Different expertise.
              <br />
              <span>One company to call.</span>
            </h2>
            <p>
              The strength is in the specialisms—and in how they work together.
              The team for each engagement is agreed around the brief, with
              clear delivery and review ownership.
            </p>
          </div>
          <div className="team-disciplines">
            {teams.map((t) => (
              <article className="team-discipline" key={t.n}>
                <span>{t.n}</span>
                <div>
                  <h3>{t.name}</h3>
                  <p className="team-people">{t.people}</p>
                  <p>{t.purpose}</p>
                  <div>
                    {t.services.map(([name, id]) => (
                      <Link href={"/services/" + id} key={id}>
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
      <section className="section wrap company-belief">
        <p className="eyebrow">The company we are building</p>
        <h2>
          Start with one challenge.
          <br />
          Stay with a partner who
          <br />
          <span className="text-brand">sees what comes next.</span>
        </h2>
        <p>
          That is our ambition for TechGy Link. To understand enough of your
          business that each piece of work can contribute to the next—whether
          you need one specialist service today or a connected team for a larger
          chapter.
        </p>
        <Link href="/contact" className="button blue">
          Let’s build your next chapter <ArrowUpRight />
        </Link>
      </section>
      <PartnerPromise />
    </main>
  );
}
