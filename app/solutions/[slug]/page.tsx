import { SolutionEvidence } from "@/app/components/shared/portfolio-highlights";
import { SolutionCollaboration } from "@/app/components/shared/service-contribution";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { solutions, services, enquiry } from "@/data/catalogue";
import { SectionTitle, CTA, Arrow } from "@/app/components/shared/common-blocks";
const aliases = {
  "property-launch-sales-enablement": "property-launch-sales",
  "digital-experience-product-delivery": "digital-experience-product",
};
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.id === slug);
  return { title: s?.title, description: s?.description };
}
export default async function Solution({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (aliases[slug as keyof typeof aliases])
    permanentRedirect(
      "/solutions/" + aliases[slug as keyof typeof aliases],
    );
  const s = solutions.find((s) => s.id === slug);
  if (!s) notFound();
  const selected = s.services.map((i) => services[i]);
  return (
    <main id="main">
      <section className="page-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/solutions">Solutions</Link>
          <span>/</span>
          <span>{s.title}</span>
        </nav>
        <p className="eyebrow">{s.kicker}</p>
        <h1>
          {s.short}
          <br />
          <span className="blue-text">Connect what comes next.</span>
        </h1>
        <p>{s.description}</p>
        <div className="hero-actions">
          <Link href={enquiry(s.title)} className="button blue">
            Discuss this solution <Arrow />
          </Link>
        </div>
      </section>
      <figure className="wrap solution-feature">
        <img
          src={s.image}
          alt={
            s.id === "property-launch-sales"
              ? "Dates County architectural visualisation"
              : s.id === "connected-sales-operations"
                ? "QuickBooks integration project presentation"
                : "Greenland Capital website project presentation"
          }
          width="1600"
          height="900"
        />
      </figure>
      <SolutionCollaboration id={s.id} />
      <SolutionEvidence id={s.id} />
      <section className="section wrap split-section">
        <div>
          <p className="eyebrow">A connected plan</p>
          <h2>
            Bring the handoffs
            <br />
            into the brief.
          </h2>
        </div>
        <div className="solution-steps">
          {s.steps.map((t, i) => (
            <div key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="section wash">
        <div className="wrap">
          <SectionTitle
            label="The expertise behind it"
            title="Select the parts you need."
            description="Each service is independently available. Shared discovery, assets and engineering are identified once in the scope."
          />
          <div className="related-links">
            {selected.map((service) => (
              <Link key={service.id} href={"/services/" + service.id}>
                <h3>{service.name}</h3>
                <p>{service.tagline}</p>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap split-section">
        <div>
          <p className="eyebrow">Your starting engagement</p>
          <h2>A useful first step.</h2>
        </div>
        <div>
          <p className="large-copy">{s.start}</p>
          <ul className="outcomes">
            <li>A documented brief and priorities</li>
            <li>Named delivery and review responsibilities</li>
            <li>A scoped proposal with clear dependencies</li>
            <li>Agreed evidence for acceptance and handover</li>
          </ul>
        </div>
      </section>
      <CTA
        title="Let’s connect the right expertise."
        text={s.start}
        service={s.title}
      />
    </main>
  );
}
