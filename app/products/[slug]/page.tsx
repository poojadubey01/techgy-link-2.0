import { notFound } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { CTA, SectionTitle } from "@/app/components/shared/common-blocks";
const products = [
  {
    slug: "sales-crm",
    name: "Sales CRM",
    headline: "Give the sales journey a shared view.",
    image: "/source/optimized/crm.webp",
    description:
      "Discuss a CRM implementation around how enquiries enter your business, who owns the next action and what the team needs to see.",
    items: [
      [
        "Lead sources",
        "Capture where an enquiry came from and the relevant campaign context.",
      ],
      [
        "Assignment & follow-up",
        "Define ownership, status changes, reminders and escalation rules.",
      ],
      [
        "Pipeline & reporting",
        "Review opportunities with a useful view of activity and next actions.",
      ],
      [
        "Integrations",
        "Assess how the CRM should connect with your current business tools.",
      ],
    ],
  },
  {
    slug: "office-tracker-hrms",
    name: "HRMS & workforce workflows",
    headline: "Bring people operations into focus.",
    image: "/source/optimized/hrms.webp",
    description:
      "Discuss the fit of employee records, attendance, leave and approval workflows within your organisation.",
    items: [
      [
        "Employee information",
        "Define the records, access and lifecycle changes your teams need.",
      ],
      [
        "Attendance & leave",
        "Map policies and the approval journeys before implementation.",
      ],
      [
        "Workforce operations",
        "Review asset, reporting and payroll connection requirements.",
      ],
      [
        "Access & approvals",
        "Define who can view employee information, approve requests and review changes.",
      ],
    ],
  },
];
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return { title: p?.name, description: p?.description };
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main">
      <section className="page-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/products">Platforms</Link>
          <span>/</span>
          {p.name}
        </nav>
        <p className="eyebrow">{p.name}</p>
        <h1>{p.headline}</h1>
        <p>{p.description}</p>
      </section>
      <figure className="project-hero wrap">
        <img
          src={p.image}
          alt={p.name + " presentation"}
          width="1600"
          height="1000"
        />
      </figure>
      <section className="section wrap">
        <SectionTitle
          label="A fit discussion"
          title="Explore the workflow, not just the features."
          description=""
        />
        <div className="deliverable-grid">
          {p.items.map(([t, d], i) => (
            <article className="deliverable" key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="notice">
          Review the current demonstration with our team. Availability,
          licensing, implementation, migration, hosting and support depend on
          the agreed scope. This page is not a self-service subscription offer.
        </p>
      </section>
      <CTA
        title="See it in context."
        service={p.name + " demonstration"}
        label="Request a demonstration"
      />
    </main>
  );
}
