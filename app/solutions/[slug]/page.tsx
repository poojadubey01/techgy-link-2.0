import { SolutionEvidence } from "@/app/components/shared/portfolio-highlights";
import { SolutionCollaboration } from "@/app/components/shared/service-contribution";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { solutions, enquiry } from "@/data/catalogue";
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
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-[min(1424px,calc(100%_-_112px))] mx-auto pt-[75px] pb-[60px] max-[767px]:pt-[50px] max-[767px]:pb-[40px]">
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
        <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
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
      <figure className="w-[min(1424px,calc(100%_-_112px))] mx-auto mb-[60px] bg-[#e2e8f0] rounded-md overflow-hidden max-[767px]:mb-[35px]">
        <img
          className="w-full h-auto max-h-[820px] object-cover rounded-md max-[767px]:max-h-none"
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
          fetchPriority="high"
        />
      </figure>
      <SolutionCollaboration id={s.id} />
      <section className="py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1200px]:gap-[50px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:tracking-[0.085em]">
            A connected plan
          </p>
          <h2 className="mt-6 max-[767px]:text-[37px] max-[767px]:mt-5">
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
      <section className="py-[120px] max-[767px]:py-[70px] bg-paper">
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto [&>.section-title]:mb-0">
          <SectionTitle
            label="The expertise behind it"
            title="Select the parts you need."
            description="Each service is independently available. Shared discovery, assets and engineering are identified once in the scope."
          />
        </div>
      </section>
      <section className="py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1200px]:gap-[50px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:tracking-[0.085em]">
            Your starting engagement
          </p>
          <h2 className="mt-6 max-[767px]:text-[37px] max-[767px]:mt-5">A useful first step.</h2>
        </div>
        <div>
          <p className="font-display text-[clamp(23px,2.35vw,35px)] leading-[1.4] tracking-[-0.025em] max-[767px]:text-[25px]">
            {s.start}
          </p>
          <ul className="outcomes my-8 mx-0 max-[767px]:my-[25px]">
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              A documented brief and priorities
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              Named delivery and review responsibilities
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              A scoped proposal with clear dependencies
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              Agreed evidence for acceptance and handover
            </li>
          </ul>
        </div>
      </section>
      <SolutionEvidence id={s.id} />
      <CTA
        title="Let’s connect the right expertise."
        text={s.start}
        service={s.title}
      />
    </main>
  );
}
