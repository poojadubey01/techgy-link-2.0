import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { services, enquiry, digitalProjects } from "@/data/catalogue";
import { ServiceCanvas } from "@/app/components/shared/service-canvas";

type Service = (typeof services)[number];
type Project = (typeof digitalProjects)[number];

export const Arrow = () => <ArrowUpRight size={20} strokeWidth={1.6} />;
export function CTA({
  title = "A good starting point.",
  text = "Tell us what you want to change. We will help define the right first engagement.",
  service = "Your project",
  label = "Discuss your project",
}: {
  title?: string;
  text?: string;
  service?: string;
  label?: string;
}) {
  return (
    <section className="reveal flex items-center justify-between gap-[50px] bg-[#0022ff] text-white rounded-md py-[55px] px-[60px] my-[var(--section-space)] site-container mx-auto max-[1200px]:p-10 max-[767px]:flex-col max-[767px]:items-start max-[767px]:py-[35px] max-[767px]:px-[25px]">
      <div className="max-w-[800px]">
        <p className="eyebrow text-white/80">
          Let’s make it happen
        </p>
        <h2 className="text-[46px] text-white max-w-[800px] my-5 mx-0 max-[1200px]:text-[39px] max-[767px]:text-[34px] max-[767px]:my-[18px] max-[767px]:mx-0">
          {title}
        </h2>
        <p className="text-[16px] text-white/90 max-w-[750px] max-[767px]:text-[15px]">
          {text}
        </p>
      </div>
      <Link
        className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-white text-[#0022ff] hover:bg-[#f8f9fa] shrink-0 max-[767px]:mt-[27px]"
        href={enquiry(service)}
      >
        {label}
        <Arrow />
      </Link>
    </section>
  );
}
export function SectionTitle({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-title reveal flex items-end justify-between gap-[60px] mb-14 max-[1023px]:gap-[30px] max-[767px]:block max-[767px]:mb-[35px]">
      <div>
        <p className="eyebrow text-brand">
          {label}
        </p>
        <h2 className="max-w-[800px] max-[767px]:max-w-[550px] mt-6 max-[767px]:mt-5">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-[#000000] text-[16px] max-w-[295px] leading-[1.75] shrink-0 max-[1023px]:max-w-[240px] max-[1023px]:text-[15px] max-[767px]:max-w-[450px] max-[767px]:mt-[22px]">
          {description}
        </p>
      )}
    </div>
  );
}

export function ServiceDirectory({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-[35px]">
      {services.map((s) => (
        <Link
          href={"/services/" + s.id}
          key={s.id}
          className="reveal group grid grid-cols-[45px_1fr_120px_48px] gap-5 items-center border-t border-t-rule py-[34px] px-0 last:border-b last:border-b-rule max-[767px]:grid-cols-[24px_1fr_35px] max-[767px]:gap-[13px] max-[767px]:py-[25px]"
        >
          <span className="text-[12px] text-[#000000] self-start pt-2 max-[767px]:text-[11px]">
            {s.num}
          </span>
          <div>
            <h3 className="text-[39px] font-normal group-hover:text-brand max-[1023px]:text-[33px] max-[767px]:text-[28px] max-[767px]:leading-[1.18]">
              {s.name}
            </h3>
            <p className="text-[15px] text-[#000000] mt-[15px] max-w-[690px] max-[767px]:text-[14px] max-[767px]:leading-[1.8] max-[767px]:mt-3">
              {s.tagline}
            </p>
          </div>
          <span className="text-[13px] text-[#000000] max-[767px]:hidden">
            {s.group}
          </span>
          <span className="border border-rule rounded-full h-[47px] w-[47px] grid place-items-center group-hover:bg-brand group-hover:text-white group-hover:border-brand max-[767px]:w-[34px] max-[767px]:h-[34px] max-[767px]:self-start max-[767px]:mt-[3px] [&>svg]:max-[767px]:w-[17px]">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function WorkCard({
  project,
  large = false,
  className = "",
}: {
  project: Project;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={"/work/" + project.slug}
      className={"work-card block" + (className ? " " + className : "")}
    >
      <div className="aspect-[1.34] bg-[#e2e8f0] relative overflow-hidden rounded-md">
        <img
          src={project.image}
          alt={project.name + " — project presentation"}
          width="1600"
          height="1000"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-5 right-5 rounded-full bg-white w-[46px] h-[46px] grid place-items-center">
          <Arrow />
        </span>
      </div>
      <div className="flex justify-between items-baseline gap-5 mt-[22px] max-[767px]:mt-[18px] max-[767px]:gap-[15px]">
        <h3 className="text-[27px] leading-[1.25] max-[767px]:text-[25px]">
          {project.name}
        </h3>
        <p className="text-[12px] text-[#000000]/70 shrink-0 text-right max-[767px]:text-[11px]">
          {project.category}
        </p>
      </div>
    </Link>
  );
}
export function ServiceVisual({ service }: { service: Service }) {
  return <ServiceCanvas service={service} />;
}
export function Process({
  steps,
  details,
}: {
  steps: string[];
  details: string[];
}) {
  return (
    <div className="grid grid-cols-[repeat(4,1fr)] gap-[35px] max-[1023px]:grid-cols-[1fr_1fr] max-[1023px]:gap-10 max-[767px]:grid-cols-1 max-[767px]:gap-8">
      {steps.map((step, i) => (
        <div
          className="reveal border-t border-t-rule pt-[22px] max-[767px]:pt-[19px]"
          key={step}
        >
          <span className="text-[14px] text-brand">0{i + 1}</span>
          <h3 className="text-[27px] mt-[45px] mx-0 mb-5 font-normal leading-[1.2] max-[767px]:text-[24px] max-[767px]:mt-6 max-[767px]:mb-4">
            {step}
          </h3>
          <p className="text-[15px] text-[#000000] leading-[1.85] max-[767px]:text-[14px] max-[767px]:leading-[1.8]">
            {details[i]}
          </p>
        </div>
      ))}
    </div>
  );
}
