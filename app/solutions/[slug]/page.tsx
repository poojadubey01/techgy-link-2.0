import { GrowthPartners } from "@/app/components/home/growth-partners";
import { SolutionEvidence } from "@/app/components/shared/portfolio-highlights";
import { SolutionCollaboration } from "@/app/components/shared/service-contribution";
import { ConnectedWorkspaceCanvas } from "@/app/components/services/connected-workspace-canvas";
import { DigitalExperienceHeroCanvas } from "@/app/components/solutions/digital-experience-hero-laptop";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { solutions, enquiry, services } from "@/data/catalogue";
import { CTA, Arrow, ClientsFor } from "@/app/components/shared/common-blocks";
const aliases = {
  "property-launch-sales-enablement": "property-launch-sales",
  "digital-experience-product-delivery": "digital-experience-product",
};
const startingOutcomes = [
  "A documented brief and priorities",
  "Named delivery and review responsibilities",
  "A scoped proposal with clear dependencies",
  "Agreed evidence for acceptance and handover",
];
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
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto section-space">
        <nav
          className="flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
          aria-label="Breadcrumb"
        >
          <Link href="/solutions" className="hover:text-brand">
            Solutions
          </Link>
          <span>/</span>
          <span>{s.title}</span>
        </nav>
        <p className="eyebrow text-brand">
          {s.kicker}
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          {s.short}
          <br />
          <span className="text-brand">Connect what comes next.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          {s.description}
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-[35px] max-[767px]:mt-[25px]">
          <Link
            href={enquiry(s.title)}
            className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-brand text-white hover:brightness-90 max-[767px]:max-w-full"
          >
            Discuss this solution <Arrow />
          </Link>
        </div>
      </section>
      {s.id === "connected-sales-operations" ? (
        <div className="site-container mx-auto mb-[60px] max-[767px]:mb-[35px]">
          <ConnectedWorkspaceCanvas />
        </div>
      ) : s.id === "digital-experience-product" ? (
        <div className="site-container mx-auto mb-[60px] max-[767px]:mb-[35px]">
          <DigitalExperienceHeroCanvas />
        </div>
      ) : (
        <figure className="site-container mx-auto mb-[60px] bg-[#e2e8f0] rounded-md overflow-hidden max-[767px]:mb-[35px]">
          <img
            className="w-full h-auto max-h-[820px] object-cover rounded-md max-[767px]:max-h-none"
            src={s.image}
            alt={
              s.id === "property-launch-sales"
                ? "Eco World architectural visualisation"
                : "Greenland Capital website project presentation"
            }
            width="1600"
            height="900"
            fetchPriority="high"
          />
        </figure>
      )}
      <SolutionCollaboration id={s.id} />
      <section className="section-space border-t border-t-rule site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1200px]:gap-[50px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="eyebrow text-brand">
            A connected plan
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            Bring the handoffs
            <br />
            into the brief.
          </h2>
        </div>
        <div>
          {s.steps.map((t, i) => (
            <div
              key={t}
              className="grid grid-cols-[32px_1fr] gap-[22px] py-[30px] px-0 border-t border-t-[#e2e8f0]"
            >
              <span className="text-[13px] text-[#000000]">0{i + 1}</span>
              <h3 className="text-[28px] max-[767px]:text-[26px]">{t}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white section-space">
        <div className="site-container mx-auto">
          <div className="grid grid-cols-[0.9fr_1.1fr] items-end gap-[10%] border-b border-rule pb-12 max-[767px]:block max-[767px]:pb-8">
            <div>
              <p className="eyebrow text-brand">Your starting engagement</p>
              <h2 className="mt-6 max-w-[680px] max-[767px]:mt-5">A useful first step.</h2>
            </div>
            <p className="max-w-[700px] font-display text-[clamp(23px,2.3vw,34px)] leading-[1.4] tracking-[-0.025em] max-[767px]:mt-7 max-[767px]:text-[23px]">
              {s.start}
            </p>
          </div>
          <ol className="grid grid-cols-2 gap-x-14 max-[767px]:grid-cols-1">
            {startingOutcomes.map((outcome, i) => (
              <li key={outcome} className="flex gap-5 border-b border-rule py-7 max-[767px]:py-6">
                <span className="shrink-0 pt-1 text-[12px] font-medium text-brand">0{i + 1}</span>
                <span className="text-[17px] leading-[1.55] max-[767px]:text-[16px]">{outcome}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SolutionEvidence id={s.id} />
      <GrowthPartners />
      <ClientsFor services={s.services.map((i) => services[i])} />
      <CTA
        title="Let’s connect the right expertise."
        text={s.start}
        service={s.title}
      />
    </main>
  );
}
