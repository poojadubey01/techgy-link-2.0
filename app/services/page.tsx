import { ServiceDirectory, CTA } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Our services",
  description:
    "Nine distinct services across branding, UI/UX, websites, software, mobile, AI automation, digital marketing, architectural visualisation and technology consulting.",
};
export default function Services() {
  return (
    <main id="main">
      <section className="page-intro wrap">
        <p className="eyebrow">Our expertise</p>
        <h1>
          Specialists at the craft.
          <br />
          <span className="blue-text">Partners in your growth.</span>
        </h1>
        <p>
          Brand builders, product thinkers, engineers, marketers and
          visualisation artists. Nine distinct services, connected by a shared
          understanding of the business you want to build.
        </p>
      </section>
      <section className="wrap">
        <ServiceDirectory />
      </section>
      <CTA
        title="Not sure where to start?"
        text="Describe the business challenge. We can help identify which expertise belongs in the brief."
      />
    </main>
  );
}
