import { PartnerSignature } from "@/app/components/shared/service-contribution";
import { GrowthPartners } from "@/app/components/home/growth-partners";
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
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-full bg-[#f8f9fa] py-[72px] max-[767px]:py-[45px]">
        <div className="site-container mx-auto">
          <nav
            className="breadcrumb flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] [&_a:hover]:text-brand max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
            aria-label="Breadcrumb"
          >
            <Link href="/services/digital-marketing-sales-enablement">
              Digital Marketing & Sales Enablement
            </Link>
            <span>/</span>
            <span>{m.name}</span>
          </nav>
          <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[46px] max-[767px]:leading-[1.13] max-[767px]:mt-[22px]">
            {m.headline}
          </h1>
          <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
            {m.intro}
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-6 mt-8">
            <Link
              className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-brand text-white hover:brightness-90 max-[370px]:max-w-full"
              href={enquiry(m.name)}
            >
              Discuss {m.name.toLowerCase()}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <MarketingFocus slug={m.slug} />
      <section className="py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="eyebrow text-brand">
            Who this is for
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            Start with the right context.
          </h2>
        </div>
        <div>
          <p className="large-copy font-display text-[clamp(23px,2.35vw,35px)] leading-[1.4] tracking-[-0.025em] max-[767px]:text-[25px]">
            {m.audience}
          </p>
          <ul className="outcomes my-8 mx-0">
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              A named decision maker
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              A clear business objective
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              Access to the relevant material and systems
            </li>
          </ul>
        </div>
      </section>
      <GrowthPartners />
      <section className="bg-paper py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
        <div className="site-container mx-auto">
          <SectionTitle
            label="The engagement"
            title="What we can help you deliver."
            description=""
          />
          <div className="deliverable-grid grid grid-cols-[1fr_1fr] max-[767px]:grid-cols-1 gap-y-0 gap-x-[70px] max-[1023px]:gap-x-[45px]">
            {m.deliverables.map(([t, d], i) => (
              <article
                className="deliverable grid grid-cols-[32px_1fr] gap-[22px] pt-[35px] px-0 pb-[42px] border-t border-t-[#e2e8f0] max-[767px]:py-7"
                key={t}
              >
                <span className="text-brand text-[12px] pt-[7px]">0{i + 1}</span>
                <div>
                  <h3 className="text-[30px] font-normal leading-[1.2] max-[1023px]:text-[27px]">
                    {t}
                  </h3>
                  <p className="text-[#000000] leading-[1.85] mt-[17px] text-[16px]">{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="eyebrow text-brand">
            How we start
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">{m.start}</h2>
        </div>
        <div>
          <p>
            We review the current situation, identify the priorities and agree a
            bounded scope. The proposal names the delivery responsibilities,
            commercial terms and review points.
          </p>
          <p
            className="notice border-l-2 border-l-brand bg-[#f8f9fa] text-[#000000] text-[14px] leading-[1.85] py-6 px-[30px] max-[767px]:text-[13px] max-[767px]:p-[22px]"
            style={{ marginTop: 28 }}
          >
            {m.faq}
          </p>
        </div>
      </section>
      <CTA title="Connect the next step." service={m.name} text={m.start} />
      <section className="site-container mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
        <Link
          href="/services/digital-marketing-sales-enablement"
          className="cta-link inline-flex items-center font-medium text-brand hover:text-brand"
        >
          Explore all marketing capabilities <Arrow />
        </Link>
      </section>
      <PartnerSignature />
    </main>
  );
}
