import { PartnerSignature } from "@/app/components/shared/service-contribution";
import { notFound } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { marketing, enquiry } from "@/data/catalogue";
import { CTA, SectionTitle, Arrow } from "@/app/components/shared/common-blocks";
import { MarketingFocus } from "@/app/components/services/marketing-service-detail";
export function generateStaticParams() {
  return marketing.map((m) => ({ detail: m.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ detail: string }>;
}) {
  const { detail } = await params;
  const m = marketing.find((m) => m.slug === detail);
  return { title: m?.name, description: m?.intro };
}
export default async function MarketingDetail({
  params,
}: {
  params: Promise<{ detail: string }>;
}) {
  const { detail } = await params;
  const m = marketing.find((m) => m.slug === detail);
  if (!m) notFound();
  return (
    <main id="main">
      <section className="page-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/services/digital-marketing-sales-enablement">
            Digital Marketing & Sales Enablement
          </Link>
          <span>/</span>
          <span>{m.name}</span>
        </nav>
        <p className="eyebrow">{m.name}</p>
        <h1>{m.headline}</h1>
        <p>{m.intro}</p>
        <div className="hero-actions">
          <Link className="button blue" href={enquiry(m.name)}>
            Discuss {m.name.toLowerCase()}
            <Arrow />
          </Link>
        </div>
      </section>
      <MarketingFocus slug={m.slug} />
      <section className="section wrap split-section">
        <div>
          <p className="eyebrow">Who this is for</p>
          <h2>Start with the right context.</h2>
        </div>
        <div>
          <p className="large-copy">{m.audience}</p>
          <ul className="outcomes">
            <li>A named decision maker</li>
            <li>A clear business objective</li>
            <li>Access to the relevant material and systems</li>
          </ul>
        </div>
      </section>
      <section className="section wash">
        <div className="wrap">
          <SectionTitle
            label="The engagement"
            title="What we can help you deliver."
            description=""
          />
          <div className="deliverable-grid">
            {m.deliverables.map(([t, d], i) => (
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
      <section className="section wrap split-section">
        <div>
          <p className="eyebrow">How we start</p>
          <h2>{m.start}</h2>
        </div>
        <div>
          <p>
            We review the current situation, identify the priorities and agree a
            bounded scope. The proposal names the delivery responsibilities,
            commercial terms and review points.
          </p>
          <p className="notice" style={{ marginTop: 28 }}>
            {m.faq}
          </p>
        </div>
      </section>
      <CTA title="Connect the next step." service={m.name} text={m.start} />
      <section className="wrap section">
        <Link
          href="/services/digital-marketing-sales-enablement"
          className="text-link"
        >
          Explore all marketing capabilities <Arrow />
        </Link>
      </section>
      <PartnerSignature />
    </main>
  );
}
