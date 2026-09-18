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
    <main id="main">
      <section className="page-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/work">Our work</Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
        <p className="eyebrow">{p.category}</p>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
      </section>
      <figure className="project-hero wrap">
        <img
          src={p.image}
          alt={p.name + " project presentation"}
          width="1600"
          height="1000"
          fetchPriority="high"
        />
      </figure>
      <section className="wrap project-overview">
        <div>
          <h2>
            {gallery ? "A sense of place." : "A closer look at the work."}
          </h2>
          <p>
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
            <p className="notice" style={{ marginTop: 25 }}>
              QuickBooks is the integrated platform. This project does not imply
              that Intuit or QuickBooks commissioned TechGy Link.
            </p>
          )}
          {slug.startsWith("glc-") ? (
            <div className="component-context">
              <span className="case-status">Part of an ongoing project</span>
              <p>
                This interface is one part of the Greenland Capital platform.
                Explore the wider business challenge and the connected scope.
              </p>
              <Link href="/work/greenland-capital" className="text-link">
                The Greenland Capital story <Arrow />
              </Link>
            </div>
          ) : (
            !gallery && (
              <p className="small" style={{ marginTop: 24 }}>
                Project presentation. For a current demonstration and a
                discussion of the delivered scope, speak with our team.
              </p>
            )
          )}
        </div>
        <div className="project-facts">
          <div>
            <h3>Focus</h3>
            <ul>
              {p.scope.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Explore the expertise</h3>
            {(relatedServices.length ? relatedServices : [services[3]]).map(
              (s) => (
                <p key={s.id}>
                  <Link href={"/services/" + s.id} className="text-link">
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
        <section className="section wrap">
          <SectionTitle
            label={gallery.images.length + " original images"}
            title="Explore the collection."
            description=""
          />
          <div className="project-images">
            {gallery.images.map((im, i) => (
              <figure key={im.url}>
                <a
                  href={im.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={"Open full image " + (i + 1)}
                >
                  <img
                    src={im.url}
                    alt={p.name + " — " + im.caption}
                    width={im.width}
                    height={im.height}
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {im.caption.replaceAll("_", " ")}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : slug.startsWith("glc-") ? (
        <section className="section wrap">
          <SectionTitle
            label="The connected platform"
            title="One business. Multiple experiences."
            description=""
          />
          <div className="work-grid">
            {digitalProjects
              .filter((x) => x.slug.startsWith("glc-") && x.slug !== slug)
              .map((x) => (
                <WorkCard key={x.slug} project={x} />
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
