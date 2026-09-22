import { ServiceDirectory, CTA } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Our services",
  description:
    "Nine distinct services across branding, UI/UX, websites, software, mobile, AI automation, digital marketing, architectural visualisation and technology consulting.",
};
export default function Services() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-full mx-auto bg-[#f8f9fa] py-[72px] px-[max(56px,calc((100vw_-_1424px)/2))] max-[767px]:py-[45px] max-[767px]:px-5">
        <p className="eyebrow text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
          Our expertise
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[46px] max-[767px]:leading-[1.13] max-[767px]:mt-[22px]">
          Specialists at the craft.
          <br />
          <span className="blue-text text-brand">Partners in your growth.</span>
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          Brand builders, product thinkers, engineers, marketers and
          visualisation artists. Nine distinct services, connected by a shared
          understanding of the business you want to build.
        </p>
      </section>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)]">
        <ServiceDirectory />
      </section>
      <CTA
        title="Not sure where to start?"
        text="Describe the business challenge. We can help identify which expertise belongs in the brief."
      />
    </main>
  );
}
