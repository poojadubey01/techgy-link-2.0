import { contributions } from "@/data/company-content";
import { ServiceContribution } from "@/app/components/shared/service-contribution";
import { GrowthPartners } from "@/app/components/home/growth-partners";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import {
  services,
  oldServiceRoutes,
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
  const showServiceEvidence = ![
    "ui-ux-product-design",
    "website-design-development",
  ].includes(s.id);
  return (
    <main id="main" className="service-page bg-[#f8f9fa]">
      <section className="detail-hero bg-[#f8f9fa] w-full section-space">
        <div className="site-container mx-auto">
          <nav
            className="breadcrumb flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] [&_a:hover]:text-brand max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
            aria-label="Breadcrumb"
          >
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>{s.name}</span>
          </nav>
          <div className="detail-hero-grid grid grid-cols-[1fr] gap-12 max-[767px]:gap-8">
            <div className="detail-copy grid grid-cols-[1.3fr_1fr] gap-x-[85px] max-[767px]:block">
              <h1 className="service-title">{s.headline}</h1>
              <p className="text-[#000000] text-[17px] leading-[1.8] pt-[7px] max-[767px]:text-[16px] max-[767px]:mt-[25px]">
                {s.description}
              </p>
              <div className="hero-actions col-span-full flex items-center gap-6 mt-[30px] max-[1100px]:flex-wrap max-[767px]:mt-[25px]">
                <Link
                  href={enquiry(s.name)}
                  className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-brand text-white hover:brightness-90 shrink-0 max-[370px]:max-w-full"
                >
                  {s.cta}
                  <Arrow />
                </Link>
                <p className="hero-teamline text-[14px] leading-[1.6] text-brand max-w-[480px]">
                  {contributions[s.id as keyof typeof contributions].team}
                </p>
              </div>
            </div>
            <ServiceVisual service={s} />
          </div>
        </div>
      </section>
      <section
        className="section-space site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]"
        id="overview"
      >
        <div>
          <p className="eyebrow text-brand">
            The starting point
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">{s.problem}</h2>
        </div>
        <div>
          <p className="large-copy font-display text-[clamp(23px,2.35vw,35px)] leading-[1.4] tracking-[-0.025em] max-[767px]:text-[25px]">
            {s.tagline}
          </p>
          <ul className="outcomes my-8 mx-0">
            {s.outcomes.map((o) => (
              <li
                key={o}
                className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand"
              >
                {o}
              </li>
            ))}
          </ul>
          <p className="small text-sm leading-[1.8]">
            <strong>Who this is for:</strong> {s.audience}
          </p>
        </div>
      </section>
      <ServiceContribution service={s} />
      <GrowthPartners />
      <section
        className="bg-transparent section-space"
        id="deliverables"
      >
        <div className="site-container mx-auto">
          <SectionTitle
            label="What we deliver"
            title="Purpose in every detail."
            description="A defined set of deliverables, shaped around the work your business needs."
          />
          <div className="deliverable-grid grid grid-cols-[1fr_1fr] gap-y-0 gap-x-[70px] max-[1023px]:gap-x-[45px] max-[767px]:grid-cols-1">
            {s.deliverables.map(([t, d], i) => (
              <article
                className="deliverable reveal grid grid-cols-[32px_1fr] gap-[22px] pt-[35px] px-0 pb-[42px] border-t border-t-[#e2e8f0] max-[767px]:py-7"
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
      {architecture ? (
        <div className="architecture-proof bg-[#e2e8f0]" id="proof">
          <ArchitectureGallery />
        </div>
      ) : showServiceEvidence ? (
        <ServiceEvidence service={s} />
      ) : null}
      <section
        className="section-space site-container mx-auto"
        id="process"
      >
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
      <section
        className="bg-transparent section-space"
        id="questions"
      >
        <div className="site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
          <div>
            <p className="eyebrow text-brand">
              A little more clarity
            </p>
            <h2 className="mt-6 max-[767px]:mt-5">Before we begin.</h2>
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
