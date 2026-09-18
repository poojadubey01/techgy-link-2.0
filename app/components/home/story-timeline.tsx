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
    <section className="company-evolution" id="why-link">
      <div className="wrap evolution-heading">
        <p className="eyebrow">The reason behind the rebrand</p>
        <h2>
          We kept adding the people
          <br />
          <span>our clients needed next.</span>
        </h2>
      </div>
      <div className="wrap evolution-grid">
        <div className="evolution-stage" aria-hidden="true">
          <div className="evolution-identity">
            <span>Our foundation</span>
            <p>
              TechGy
              <br />
              Innovations.
            </p>
            <div className="evolution-rule">
              <i />
            </div>
            <span>Our collective future</span>
            <p className="evolution-link">
              TechGy <strong>Link.</strong>
            </p>
          </div>
          <div className="evolution-strengths">
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
              <span key={s} data-strength={i}>
                {s}
              </span>
            ))}
          </div>
          <p className="evolution-caption">
            More capabilities. One connected company.
          </p>
        </div>
        <div className="evolution-chapters">
          {chapters.map((c, i) => (
            <article
              key={c.label}
              className="evolution-chapter"
              data-evolution-step={i}
            >
              <p className="eyebrow">
                0{i + 1} / {c.label}
              </p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <p className="evolution-detail">{c.detail}</p>
              {i === 2 && (
                <Link href="/about" className="text-link">
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
