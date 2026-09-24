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
    <main id="main" className="bg-[#f8f9fa]">
      <section className="site-container mx-auto bg-[#f8f9fa] py-[65px] max-[767px]:py-10">
        <div className="grid grid-cols-[1.05fr_1fr] gap-[60px] items-center max-[1023px]:gap-[30px] max-[767px]:grid-cols-1 max-[767px]:gap-8">
          <div className="block">
            <p className="eyebrow text-brand">
              TechGy Link / {s.name}
            </p>
            <h1 className="text-[clamp(42px,4.8vw,72px)] max-[1023px]:text-[46px] max-[767px]:text-[43px]">
              {c.headline}
            </h1>
            <p className="text-[#000000] text-[17px] mt-[25px]">{s.tagline}</p>
            <div className="flex flex-wrap items-center gap-6 mt-8 content-start">
              <a
                className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-brand text-white hover:brightness-90"
                href="#start"
              >
                {c.cta}
                <Arrow />
              </a>
            </div>
            <div className="flex gap-2.5 flex-wrap mt-[25px]">
              <span className="border border-[#e2e8f0] rounded-full text-[12px] py-1.5 px-[11px]">
                Defined scope
              </span>
              <span className="border border-[#e2e8f0] rounded-full text-[12px] py-1.5 px-[11px]">
                Named delivery owner
              </span>
              <span className="border border-[#e2e8f0] rounded-full text-[12px] py-1.5 px-[11px]">
                Visible review points
              </span>
            </div>
          </div>
          <ServiceVisual service={s} />
        </div>
      </section>
      <section className="py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] bg-[#e2e8f0]">
        <div className="site-container mx-auto">
          <SectionTitle
            label="A focused engagement"
            title={s.problem}
            description=""
          />
          <div className="grid grid-cols-[1fr_1fr] gap-y-0 gap-x-[70px] max-[1023px]:gap-x-[45px] max-[767px]:grid-cols-1 max-[767px]:gap-0">
            {s.deliverables.slice(0, 4).map(([t, d], i) => (
              <article
                className="grid grid-cols-[32px_1fr] gap-[22px] px-0 pt-[35px] pb-[42px] border-t border-t-[#e2e8f0] max-[767px]:grid-cols-[24px_1fr] max-[767px]:gap-[15px] max-[767px]:py-7"
                key={t}
              >
                <span className="text-brand text-[12px] pt-[7px]">0{i + 1}</span>
                <div>
                  <h3 className="text-[30px] font-normal leading-[1.2] max-[1023px]:text-[27px] max-[767px]:text-[29px]">
                    {t}
                  </h3>
                  <p className="text-[#000000] leading-[1.85] mt-[17px] text-[16px] max-[767px]:text-[15px] max-[767px]:leading-[1.8] max-[767px]:mt-3.5">
                    {d}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ServiceEvidence service={s} campaign />
      <section
        className="py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] bg-[#0f1a34] text-white"
        id="start"
      >
        <div className="site-container mx-auto grid grid-cols-[1fr_1fr] gap-[95px] max-[1023px]:gap-[50px] max-[767px]:grid-cols-1 max-[767px]:gap-[35px]">
          <div>
            <p className="eyebrow text-white">
              Your first step
            </p>
            <h2 className="my-6 max-[767px]:my-5">{c.cta}.</h2>
            <p className="text-[17px] text-white max-[767px]:text-[16px]">
              {s.description}
            </p>
            <ul className="outcomes my-8 mx-0 max-[767px]:my-[25px]">
              {s.outcomes.map((o) => (
                <li
                  key={o}
                  className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-white/24 text-[16px] text-white before:content-['—'] before:absolute before:left-0 before:text-white max-[767px]:text-[15px] max-[767px]:py-[15px]"
                >
                  {o}
                </li>
              ))}
            </ul>
            <p className="text-[17px] text-white max-[767px]:text-[16px]">
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
      <section className="site-container mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] grid grid-cols-[1fr_1fr] gap-[100px] max-[1023px]:gap-[50px] max-[767px]:grid-cols-1 max-[767px]:gap-[30px]">
        <div>
          <p className="eyebrow text-brand">
            Before we start
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            Useful answers.
          </h2>
        </div>
        <FAQs items={s.faqs} />
      </section>
      <PartnerSignature />
    </main>
  );
}
