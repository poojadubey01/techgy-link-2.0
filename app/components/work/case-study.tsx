import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { services } from "@/data/catalogue";
import { CTA } from "@/app/components/shared/common-blocks";
import { CaseArtwork } from "@/app/components/shared/portfolio-highlights";
import { ProjectBlueprint } from "@/app/components/work/project-blueprint";
import { portfolioStories } from "@/data/portfolio-stories";

type Story = (typeof portfolioStories)[number];

const eyebrow =
  "text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:tracking-[0.085em]";
const sectionH2 =
  "text-[clamp(35px,4vw,57px)] leading-[1.12] tracking-[-0.045em] mt-6 max-[767px]:text-[37px] max-[767px]:mt-5 max-[767px]:mb-[30px]";
const bodyCopy = "text-[17px] leading-[1.85] text-[#000000] max-[767px]:text-[16px]";

export function CaseStudy({
  story: p,
  from,
}: {
  story: Story;
  from?: string;
}) {
  const backHref =
    from === "Visualisation"
      ? "/work?filter=Visualisation"
      : from === "Digital"
        ? "/work?filter=Digital"
        : "/work";
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="pt-[35px] max-[767px]:pt-7 w-[min(1424px,calc(100%_-_112px))] mx-auto">
        <nav
          className="flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
          aria-label="Breadcrumb"
        >
          <Link href={backHref} scroll={false} className="hover:text-brand">
            Our work
          </Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
        <div className="grid grid-cols-[1.08fr_1fr] gap-[6%] items-center pt-[15px] pb-[50px] max-[1023px]:gap-[35px] max-[767px]:block max-[767px]:pt-0 max-[767px]:pb-[30px]">
          <div>
            <p className={eyebrow}>
              {p.name} / {p.market}
            </p>
            <h1 className="text-[clamp(42px,4.5vw,73px)] leading-[1.08] tracking-[-0.055em] my-[27px] mx-0 max-[767px]:text-[43px] max-[767px]:leading-[1.13] max-[767px]:my-6">
              {p.headline}
            </h1>
            <p className="text-lg leading-[1.75] max-w-[580px] text-[#000000] max-[767px]:text-[16px]">
              {p.description}
            </p>
          </div>
          <CaseArtwork
            story={p}
            priority
            showCaption={false}
          />
        </div>
        <dl className="grid grid-cols-[1fr_1.3fr_1fr] border-y border-[#e2e8f0] py-6 gap-[25px] max-[767px]:grid-cols-2 max-[767px]:gap-y-6 max-[767px]:gap-x-4 max-[767px]:py-[23px]">
          <div>
            <dt className="text-[12px] uppercase tracking-[0.08em] text-[#000000] mb-[9px]">
              Project
            </dt>
            <dd className="text-[16px] m-0 max-[767px]:text-[14px]">{p.name}</dd>
          </div>
          <div className="max-[767px]:col-span-full max-[767px]:row-start-2">
            <dt className="text-[12px] uppercase tracking-[0.08em] text-[#000000] mb-[9px]">
              Focus
            </dt>
            <dd className="text-[16px] m-0 max-[767px]:text-[14px]">{p.category}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-[0.08em] text-[#000000] mb-[9px]">
              Engagement
            </dt>
            <dd className="text-[16px] m-0 max-[767px]:text-[14px]">{p.status}</dd>
          </div>
        </dl>
      </section>
      <section
        className="grid grid-cols-[0.85fr_1.15fr] gap-[9%] max-[1023px]:gap-[50px] max-[767px]:block py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto"
        id="the-challenge"
      >
        <div>
          <p className={eyebrow}>01 / Understand the business</p>
          <h2 className={sectionH2}>
            The real work
            <br />
            starts with
            <br />
            <span className="text-brand">the problem.</span>
          </h2>
        </div>
        <div>
          <div>
            <h3 className="text-[21px] tracking-[-0.02em] mb-4">The challenge</h3>
            <p className={bodyCopy}>{p.challenge}</p>
          </div>
          <div className="mt-[38px] max-[767px]:mt-[30px]">
            <h3 className="text-[21px] tracking-[-0.02em] mb-4">Our approach</h3>
            <p className={bodyCopy}>{p.approach}</p>
          </div>
        </div>
      </section>
      <section
        className={
          "py-[70px] max-[767px]:py-12 " +
          (p.tone === "spur" ? "bg-[#0f1a34] text-white" : "bg-[#e2e8f0]")
        }
      >
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto">
          <p className={eyebrow + (p.tone === "spur" ? " text-[#000000]" : "")}>
            02 / Connect the journey
          </p>
          <h2 className="text-[clamp(35px,4vw,58px)] leading-[1.15] tracking-[-0.045em] max-w-[800px] mt-[22px] mx-0 mb-[45px] max-[767px]:text-[36px] max-[767px]:mb-[35px]">
            {p.journeyTitle}
          </h2>
          <ol className="case-flow grid grid-cols-4 list-none gap-7 p-0 m-0 max-[1023px]:gap-5 max-[767px]:grid-cols-1 max-[767px]:gap-6">
            {p.journey.map((step, i) => (
              <li
                key={step.title}
                data-case-step
                className="border-t border-[#e2e8f0] pt-5 relative max-[767px]:pl-[43px]"
              >
                <span className="block text-[14px] text-[#000000] mb-[27px] max-[767px]:absolute max-[767px]:left-0 max-[767px]:top-[23px] max-[767px]:m-0">
                  0{i + 1}
                </span>
                <h3 className="text-[25px] tracking-[-0.035em] leading-tight mb-[15px] max-[1023px]:text-[22px] max-[767px]:text-[24px] max-[767px]:mb-3">
                  {step.title}
                </h3>
                <p className="text-base leading-[1.8] text-[#000000] max-[767px]:text-[16px]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-[12px] text-[#000000] mt-9 max-[767px]:mt-7">
            A simplified view of the project workflow.
          </p>
        </div>
      </section>
      <ProjectBlueprint slug={p.slug} />
      <section className="py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[0.85fr_1.15fr] gap-[9%] max-[1023px]:gap-[50px] max-[767px]:block">
        <div>
          <p className={eyebrow}>03 / Design the important details</p>
          <h2 className={sectionH2}>
            Where the
            <br />
            thinking shows.
          </h2>
        </div>
        <div>
          {p.decisions.map((item, i) => (
            <article
              key={item.title}
              className="case-decision grid grid-cols-[30px_1fr] gap-[17px] pt-[25px] px-0 pb-[32px] border-t border-[#e2e8f0] max-[767px]:grid-cols-[23px_1fr] max-[767px]:gap-3.5 max-[767px]:pb-[25px]"
            >
              <span className="text-[13px] text-brand pt-1.5">0{i + 1}</span>
              <div>
                <h3 className="text-[29px] leading-[1.2] tracking-[-0.04em] mb-[17px] max-[767px]:text-[27px]">
                  {item.title}
                </h3>
                <p className={bodyCopy}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-[1.2fr_1fr] gap-[12%] border-t border-[#e2e8f0] max-[767px]:block py-[120px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto">
        <div>
          <p className={eyebrow}>The engagement</p>
          <h2 className={`${sectionH2} mb-[23px] max-[767px]:mb-[30px]`}>
            {p.deliveryTitle}
          </h2>
          <p className={bodyCopy}>{p.delivery}</p>
        </div>
        <div className="max-[767px]:mt-[35px]">
          <h3 className="text-[24px] mb-[25px] tracking-[-0.03em]">Scope at a glance</h3>
          <ul className="list-none p-0">
            {p.scope.map((s) => (
              <li
                key={s}
                className="py-[17px] px-0 border-t border-[#e2e8f0] text-[16px]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-brand text-white py-[75px] max-[767px]:py-12">
        <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1.3fr_1fr] gap-[10%] items-center max-[767px]:block">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-[#f8f9fa] max-[767px]:tracking-[0.085em]">
              The TechGy Link perspective
            </p>
            <h2 className="text-[clamp(32px,3.6vw,54px)] leading-[1.15] tracking-[-0.045em] my-6 max-[767px]:text-[35px]">
              Understand the whole.
              <br />
              Connect the right strengths.
            </h2>
            <p className="text-[17px] leading-[1.8] text-[#f8f9fa] max-[767px]:text-[16px]">
              {p.connection}
            </p>
          </div>
          <div className="max-[767px]:mt-[35px]">
            {p.services.map((id) => {
              const s = services.find((s) => s.id === id);
              return s ? (
                <Link
                  key={id}
                  href={"/services/" + id}
                  className="flex gap-[25px] items-center justify-between border-t border-[#f8f9fa4d] py-6 px-0 text-lg leading-normal max-[767px]:text-[16px] max-[767px]:py-5"
                >
                  {s.name}
                  <ArrowUpRight size={20} className="shrink-0" />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <CTA
        title="What is your business trying to make possible?"
        text="Share the challenge, the people involved and the systems around it. We’ll help shape the right starting point."
        service={p.name + " — related enquiry"}
        label="Discuss your challenge"
      />
      <p className="w-[min(1424px,calc(100%_-_112px))] mx-auto text-[12px] text-[#000000] mb-[50px] max-[767px]:mb-10">
        Project imagery from TechGy’s client portfolio. Interface figures and
        sample content are illustrative, not measured business results.
      </p>
    </main>
  );
}
