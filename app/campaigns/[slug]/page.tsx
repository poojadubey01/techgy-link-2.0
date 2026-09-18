import { PartnerSignature } from "@/app/components/shared/service-contribution";
import { notFound } from "next/navigation";
import { campaigns } from "@/data/catalogue";
import { ServiceVisual, SectionTitle, Arrow } from "@/app/components/shared/common-blocks";
import { FAQs } from "@/app/components/shared/faq-and-explorer";
import { ServiceEvidence } from "@/app/components/shared/service-evidence";
import { engagements } from "@/data/engagements";
import { ContactForm } from "@/app/components/shared/contact-form";
export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = campaigns.find((c) => c.slug === slug);
  return { title: c?.headline, description: c?.service.tagline };
}
export default async function Campaign({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = campaigns.find((c) => c.slug === slug);
  if (!c) notFound();
  const s = c.service;
  return (
    <main id="main">
      <section className="campaign-hero wrap">
        <div className="detail-hero-grid">
          <div className="detail-copy">
            <p className="eyebrow">TechGy Link / {s.name}</p>
            <h1>{c.headline}</h1>
            <p>{s.tagline}</p>
            <div className="hero-actions">
              <a className="button blue" href="#start">
                {c.cta}
                <Arrow />
              </a>
            </div>
            <div className="campaign-benefits">
              <span>Defined scope</span>
              <span>Named delivery owner</span>
              <span>Visible review points</span>
            </div>
          </div>
          <ServiceVisual service={s} />
        </div>
      </section>
      <section className="section wash">
        <div className="wrap">
          <SectionTitle
            label="A focused engagement"
            title={s.problem}
            description=""
          />
          <div className="deliverable-grid">
            {s.deliverables.slice(0, 4).map(([t, d], i) => (
              <article className="deliverable" key={t}>
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
      <ServiceEvidence service={s} campaign />
      <section className="section campaign-form-section" id="start">
        <div className="wrap campaign-form-layout">
          <div>
            <p className="eyebrow">Your first step</p>
            <h2>{c.cta}.</h2>
            <p>{s.description}</p>
            <ul className="outcomes">
              {s.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p>
              {engagements[s.id as keyof typeof engagements].start}{" "}
              {engagements[s.id as keyof typeof engagements].output}
            </p>
          </div>
          <ContactForm
            initialService={s.name}
            campaign={"campaign/" + c.slug}
          />
        </div>
      </section>
      <section className="section wrap split-section">
        <div>
          <p className="eyebrow">Before we start</p>
          <h2>Useful answers.</h2>
        </div>
        <FAQs items={s.faqs} />
      </section>
      <PartnerSignature />
    </main>
  );
}
