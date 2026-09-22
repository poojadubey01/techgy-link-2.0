import { storyFor } from "@/data/portfolio-stories";
import { CaseStudy } from "@/app/components/work/case-study";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { work, architecture, services, digitalProjects } from "@/data/catalogue";
import { CTA, SectionTitle, WorkCard, Arrow } from "@/app/components/shared/common-blocks";
export function generateStaticParams() {
  return work.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = work.find((p) => p.slug === slug);
  return { title: p?.name || "Project", description: p?.description };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "architectural-portfolio")
    permanentRedirect("/services/architectural-visualisation");
  const p = work.find((p) => p.slug === slug);
  if (!p) notFound();
  const story = storyFor(slug);
  if (story) return <CaseStudy story={story} />;
  const gallery = architecture.find((p) => p.slug === slug);
  const relatedServices = services.filter(
    (s) =>
      s.proof === slug || (gallery && s.id === "architectural-visualisation"),
  );
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro w-[min(1424px,calc(100%_-_112px))] mx-auto">
        <nav
          className="flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
          aria-label="Breadcrumb"
        >
          <Link href="/work" className="hover:text-brand">
            Our work
          </Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
        <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:tracking-[0.085em]">
          {p.category}
        </p>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
      </section>
      <figure className="w-[min(1424px,calc(100%_-_112px))] mx-auto bg-[#f8f9fa]">
        <img
          className="w-full h-auto max-h-[760px] object-contain rounded-md"
          src={p.image}
          alt={p.name + " project presentation"}
          width="1600"
          height="1000"
          fetchPriority="high"
        />
      </figure>
      <section className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1.1fr_1fr] gap-[95px] py-[65px] border-b border-rule max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px] max-[767px]:py-10">
        <div>
          <h2 className="mb-[25px] text-[43px] max-[767px]:text-[35px]">
            {gallery ? "A sense of place." : "A closer look at the work."}
          </h2>
          <p className="text-[#000000] text-[16px] max-[767px]:text-[15px]">
            {gallery
              ? "This collection explores the architecture at different scales, from its wider setting to individual spaces. Composition, light and material detail are used to make the proposed environment understandable."
              : slug === "quickbooks-integration"
                ? "This engagement connects business operations with QuickBooks Desktop through an accounting integration. The focus is the flow of information between systems, including invoicing and financial data."
                : slug.startsWith("glc-")
                  ? "Greenland Capital brings property discovery, screening and administration into connected digital journeys. This project view focuses on " +
                    p.name.replace("GLC ", "").toLowerCase() +
                    " and the scope shown in the published project presentation."
                  : p.description}
          </p>
          {slug === "quickbooks-integration" && (
            <p
              className="border-l-2 border-l-brand bg-[#f8f9fa] text-[#000000] text-[14px] leading-[1.85] py-6 px-[30px] mt-[30px] max-[767px]:text-[13px] max-[767px]:p-[22px]"
              style={{ marginTop: 25 }}
            >
              QuickBooks is the integrated platform. This project does not imply
              that Intuit or QuickBooks commissioned TechGy Link.
            </p>
          )}
          {slug.startsWith("glc-") ? (
            <div className="mt-7 [&>p]:my-[18px]!">
              <span className="inline-block text-[13px] text-brand bg-[#f8f9fa] border border-[#e2e8f0] rounded-full py-[7px] px-[14px]">
                Part of an ongoing project
              </span>
              <p>
                This interface is one part of the Greenland Capital platform.
                Explore the wider business challenge and the connected scope.
              </p>
              <Link
                href="/work/greenland-capital"
                className="inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand text-[14px]"
              >
                The Greenland Capital story <Arrow />
              </Link>
            </div>
          ) : (
            !gallery && (
              <p className="text-sm leading-[1.8]" style={{ marginTop: 24 }}>
                Project presentation. For a current demonstration and a
                discussion of the delivered scope, speak with our team.
              </p>
            )
          )}
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-[30px] border-l border-rule pl-[35px] max-[767px]:gap-6 max-[767px]:border-l-0 max-[767px]:pl-0">
          <div>
            <h3 className="text-[16px] mb-[18px] tracking-[0] text-brand">Focus</h3>
            <ul>
              {p.scope.map((t) => (
                <li key={t} className="text-[14px] text-[#000000] mb-3">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] mb-[18px] tracking-[0] text-brand">
              Explore the expertise
            </h3>
            {(relatedServices.length ? relatedServices : [services[3]]).map(
              (s) => (
                <p key={s.id} className="text-[14px] text-[#000000] mb-3">
                  <Link
                    href={"/services/" + s.id}
                    className="inline-flex items-center gap-5 text-sm font-medium leading-[1.6] text-brand"
                  >
                    {s.name}
                    <Arrow />
                  </Link>
                </p>
              ),
            )}
          </div>
        </div>
      </section>
      {gallery ? (
        <section className="py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <SectionTitle
            label={gallery.images.length + " original images"}
            title="Explore the collection."
            description=""
          />
          <div className="grid grid-cols-[1fr_1fr] gap-[30px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[25px]">
            {gallery.images.map((im, i) => (
              <figure
                key={im.url}
                className="overflow-hidden [&:nth-child(3n+1)]:col-span-full max-[767px]:[&:nth-child(3n+1)]:col-auto"
              >
                <a
                  href={im.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={"Open full image " + (i + 1)}
                >
                  <img
                    className="w-full h-auto rounded-[5px]"
                    src={im.url}
                    alt={p.name + " — " + im.caption}
                    width={im.width}
                    height={im.height}
                    loading="lazy"
                  />
                </a>
                <figcaption className="text-[12px] text-[#000000] mt-[15px] max-[767px]:text-[11px] max-[767px]:mt-3">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {im.caption.replaceAll("_", " ")}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : slug.startsWith("glc-") ? (
        <section className="py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <SectionTitle
            label="The connected platform"
            title="One business. Multiple experiences."
            description=""
          />
          <div className="grid grid-cols-[1fr_1fr] gap-y-[60px] gap-x-8 max-[767px]:grid-cols-[1fr] max-[767px]:gap-[35px]">
            {digitalProjects
              .filter((x) => x.slug.startsWith("glc-") && x.slug !== slug)
              .map((x, i) => (
                <WorkCard
                  key={x.slug}
                  project={x}
                  className={
                    i % 4 === 1 ? "pt-[85px] max-[767px]:pt-0" : undefined
                  }
                />
              ))}
          </div>
        </section>
      ) : null}
      <CTA
        title="Have a similar challenge?"
        service={
          gallery
            ? "Architectural Visualisation"
            : p.name + " — related enquiry"
        }
        text="Share your context and what you need to achieve. We can discuss a relevant approach and the work involved."
      />
    </main>
  );
}
