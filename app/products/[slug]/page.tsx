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
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-[min(1424px,calc(100%_-_112px))] mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <nav
          className="flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
          aria-label="Breadcrumb"
        >
          <Link href="/products" className="hover:text-brand">
            Platforms
          </Link>
          <span>/</span>
          {p.name}
        </nav>
        <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
          {p.name}
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          {p.headline}
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          {p.description}
        </p>
      </section>
      <figure className="w-[min(1424px,calc(100%_-_112px))] mx-auto bg-[#f8f9fa]">
        <img
          src={p.image}
          alt={p.name + " presentation"}
          width="1600"
          height="1000"
          className="w-full h-auto max-h-[760px] object-contain rounded-md"
        />
      </figure>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
        <SectionTitle
          label="A fit discussion"
          title="Explore the workflow, not just the features."
          description=""
        />
        <div className="grid grid-cols-[1fr_1fr] gap-y-0 gap-x-[70px] max-[1023px]:gap-x-[45px] max-[767px]:grid-cols-1 max-[767px]:gap-0">
          {p.items.map(([t, d], i) => (
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
        <p className="border-l-2 border-l-brand bg-[#f8f9fa] text-[#000000] text-[14px] leading-[1.85] py-6 px-[30px] mt-[30px] max-[767px]:text-[13px] max-[767px]:p-[22px]">
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
