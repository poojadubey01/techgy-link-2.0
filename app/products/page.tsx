import Link from "@/app/components/ui/internal-link";
import { CTA, Arrow } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Business platforms",
  description:
    "Discuss a Sales CRM or HRMS implementation with TechGy Link. Review a demonstration, fit, scope, integrations and support before committing.",
};
export default function Products() {
  return (
    <main id="main">
      <section className="page-intro wrap">
        <p className="eyebrow">Business platforms</p>
        <h1>
          See the fit.
          <br />
          <span className="blue-text">Then define the implementation.</span>
        </h1>
        <p>
          Explore Sales CRM and HRMS capabilities with our team. Begin with a
          demonstration and an assessment of your workflow, integrations and
          support needs.
        </p>
      </section>
      <section className="wrap product-grid">
        {[
          [
            "sales-crm",
            "Sales CRM",
            "/source/optimized/crm.webp",
            "Connect enquiries, lead assignment, follow-up and sales reporting.",
          ],
          [
            "office-tracker-hrms",
            "HRMS & workforce workflows",
            "/source/optimized/hrms.webp",
            "Bring employee records, attendance, leave and approval journeys into a clearer system.",
          ],
        ].map(([slug, t, img, d]) => (
          <article className="product-card" key={slug}>
            <img
              src={img}
              alt={t + " interface presentation"}
              width="1500"
              height="1000"
            />
            <h2>{t}</h2>
            <p>{d}</p>
            <Link href={"/products/" + slug} className="text-link">
              Explore the capabilities <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <CTA
        title="Start with a fit discussion."
        service="Business platform demonstration"
        text="Product availability, licensing, deployment, implementation and support are confirmed in the proposal. Review current capabilities before making a purchase decision."
        label="Request a demonstration"
      />
    </main>
  );
}
