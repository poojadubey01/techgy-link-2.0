import Link from "./site-link";
import { ArrowUpRight } from "./icons";
import { services, digitalProjects } from "@/data/catalogue";
import { CTA, WorkCard } from "./connected";
import { CaseArtwork } from "./portfolio-evidence";
export function CaseStudy({ story: p }) {
  return (
    <main id="main" className="case-study">
      <section className="case-hero wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/work">Our work</Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
        <div className="case-hero-grid">
          <div className="case-hero-copy">
            <p className="eyebrow">
              {p.name} / {p.market}
            </p>
            <h1>{p.headline}</h1>
            <p>{p.description}</p>
            <a href="#the-challenge" className="text-link">
              Explore the thinking <ArrowUpRight size={20} />
            </a>
          </div>
          <CaseArtwork story={p} priority />
        </div>
        <dl className="case-facts">
          <div>
            <dt>Project</dt>
            <dd>{p.name}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt>Engagement</dt>
            <dd>{p.status}</dd>
          </div>
        </dl>
      </section>
      <section className="case-challenge section wrap" id="the-challenge">
        <div>
          <p className="eyebrow">01 / Understand the business</p>
          <h2>
            The real work
            <br />
            starts with
            <br />
            <span className="text-brand">the problem.</span>
          </h2>
        </div>
        <div className="case-problem-copy">
          <div>
            <h3>The challenge</h3>
            <p>{p.challenge}</p>
          </div>
          <div>
            <h3>Our approach</h3>
            <p>{p.approach}</p>
          </div>
        </div>
      </section>
      <section className={`case-journey tone-${p.tone}`}>
        <div className="wrap">
          <p className="eyebrow">02 / Connect the journey</p>
          <h2>{p.journeyTitle}</h2>
          <ol className="case-flow">
            {p.journey.map((step, i) => (
              <li key={step.title} data-case-step>
                <span className="case-step-index">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="case-diagram-caption">
            A simplified view of the project workflow.
          </p>
        </div>
      </section>
      <section className="section wrap case-decisions">
        <div>
          <p className="eyebrow">03 / Design the important details</p>
          <h2>
            Where the
            <br />
            thinking shows.
          </h2>
        </div>
        <div>
          {p.decisions.map((item, i) => (
            <article key={item.title} className="case-decision">
              <span>0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {p.slug === "greenland-capital" && (
        <section className="section wrap case-components">
          <div className="portfolio-section-heading">
            <div>
              <p className="eyebrow">The connected platform</p>
              <h2>
                Different roles.
                <br />A shared business.
              </h2>
            </div>
            <p>
              Explore the customer experiences and the operational interfaces as
              individual parts of the wider platform.
            </p>
          </div>
          <div className="work-grid">
            {digitalProjects
              .filter((x) => x.slug.startsWith("glc-"))
              .map((x) => (
                <WorkCard key={x.slug} project={x} />
              ))}
          </div>
        </section>
      )}
      <section className="case-delivery section wrap">
        <div>
          <p className="eyebrow">The engagement</p>
          <h2>{p.deliveryTitle}</h2>
          <p>{p.delivery}</p>
        </div>
        <div>
          <h3>Scope at a glance</h3>
          <ul>
            {p.scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="case-connected">
        <div className="wrap">
          <div>
            <p className="eyebrow">The TechGy Link perspective</p>
            <h2>
              Understand the whole.
              <br />
              Connect the right strengths.
            </h2>
            <p>{p.connection}</p>
          </div>
          <div className="case-service-links">
            {p.services.map((id) => {
              const s = services.find((s) => s.id === id);
              return s ? (
                <Link key={id} href={"/services/" + id}>
                  {s.name}
                  <ArrowUpRight size={20} />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <CTA
        title="What is your business trying to make possible?"
        text="Share the challenge, the people involved and the systems around it. We’ll help shape the right starting point."
        service={p.name + " — related enquiry"}
        label="Discuss your challenge"
      />
      <p className="case-image-credit wrap">
        Project imagery from TechGy’s client portfolio. Interface figures and
        sample content are illustrative, not measured business results.
      </p>
    </main>
  );
}
