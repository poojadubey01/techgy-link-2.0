import { contributions } from "@/data/company-content";
import { ServiceContribution } from "@/app/components/shared/service-contribution";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import {
  services,
  oldServiceRoutes,
  marketing,
  enquiry,
} from "@/data/catalogue";
import {
  ServiceVisual,
  SectionTitle,
  Process,
  CTA,
  Arrow,
} from "@/app/components/shared/common-blocks";
import { FAQs } from "@/app/components/shared/faq-and-explorer";
import { engagements } from "@/data/engagements";
import { ServiceEvidence } from "@/app/components/shared/service-evidence";
import { EngagementStart } from "@/app/components/services/engagement-start";
import { ArchitectureGallery } from "@/app/components/services/architecture-gallery";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.id === slug);
  return {
    title: s?.name || "Services",
    description: s?.tagline,
    alternates: { canonical: "/services/" + slug },
  };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (oldServiceRoutes[slug as keyof typeof oldServiceRoutes])
    permanentRedirect(
      "/services/" + oldServiceRoutes[slug as keyof typeof oldServiceRoutes],
    );
  const s = services.find((s) => s.id === slug);
  if (!s) notFound();
  const architecture = s.id === "architectural-visualisation";
  const isMarketing = s.id === "digital-marketing-sales-enablement";
  return (
    <main id="main" className="service-page">
      <section className="detail-hero wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/services">Services</Link>
          <span>/</span>
          <span>{s.name}</span>
        </nav>
        <div className="detail-hero-grid">
          <div className="detail-copy">
            <p className="eyebrow">
              {s.num} / {s.name}
            </p>
            <h1>{s.headline}</h1>
            <p>{s.description}</p>
            <div className="hero-actions">
              <Link href={enquiry(s.name)} className="button blue">
                {s.cta}
                <Arrow />
              </Link>
              <p className="hero-teamline">
                {contributions[s.id as keyof typeof contributions].team}
              </p>
            </div>
          </div>
          <ServiceVisual service={s} />
        </div>
      </section>
      <section className="section wrap split-section" id="overview">
        <div>
          <p className="eyebrow">The starting point</p>
          <h2>{s.problem}</h2>
        </div>
        <div>
          <p className="large-copy">{s.tagline}</p>
          <ul className="outcomes">
            {s.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="small">
            <strong>Who this is for:</strong> {s.audience}
          </p>
        </div>
      </section>
      <ServiceContribution service={s} />
      <section className="wash section" id="deliverables">
        <div className="wrap">
          <SectionTitle
            label="What we deliver"
            title="Purpose in every detail."
            description="A defined set of deliverables, shaped around the work your business needs."
          />
          <div className="deliverable-grid">
            {s.deliverables.map(([t, d], i) => (
              <article className="deliverable reveal" key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {isMarketing && (
        <section className="section wrap">
          <SectionTitle
            label="Explore the disciplines"
            title="One journey. Different specialisms."
            description=""
          />
          <div className="related-links">
            {marketing.map((m) => (
              <Link
                href={"/services/digital-marketing-sales-enablement/" + m.slug}
                key={m.slug}
              >
                <h3>{m.name}</h3>
                <p>{m.intro}</p>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>
      )}
      {architecture ? (
        <div className="architecture-proof" id="proof">
          <ArchitectureGallery />
          <div className="wrap architecture-film">
            <video
              controls
              playsInline
              preload="none"
              poster="/source/3d/hero-poster.jpg"
              aria-label="TechGy Link architectural visualisation showreel"
            >
              <source src="/source/3d/hero.mp4" type="video/mp4" />
            </video>
            <p>Architectural showreel / TechGy Link</p>
          </div>
        </div>
      ) : (
        <ServiceEvidence service={s} />
      )}
      <section className="section wrap" id="process">
        <SectionTitle
          label="Our process"
          title="Clear steps. Shared decisions."
          description=""
        />
        <Process
          steps={s.process}
          details={engagements[s.id as keyof typeof engagements].process}
        />
      </section>
      <EngagementStart service={s} />
      <section className="section wash" id="questions">
        <div className="wrap split-section">
          <div>
            <p className="eyebrow">A little more clarity</p>
            <h2>Before we begin.</h2>
          </div>
          <FAQs items={s.faqs} />
        </div>
      </section>
      <CTA
        title={s.cta + "."}
        service={s.name}
        label={s.cta}
        text={
          engagements[s.id as keyof typeof engagements].start +
          " " +
          engagements[s.id as keyof typeof engagements].output
        }
      />
    </main>
  );
}
