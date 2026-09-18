import Link from "./site-link";
import { ArrowUpRight } from "./icons";
import { services, enquiry } from "@/data/catalogue";
import { ServiceCanvas } from "./service-canvas";
export const Arrow = () => <ArrowUpRight size={20} strokeWidth={1.6} />;
export function CTA({
  title = "A good starting point.",
  text = "Tell us what you want to change. We will help define the right first engagement.",
  service = "Your project",
  label = "Discuss your project",
}) {
  return (
    <section className="inline-cta wrap reveal">
      <div>
        <p className="eyebrow">Let’s make it happen</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="button blue" href={enquiry(service)}>
        {label}
        <Arrow />
      </Link>
    </section>
  );
}
export function SectionTitle({ label, title, description }) {
  return (
    <div className="section-title reveal">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
export function ServiceDirectory({ compact = false }) {
  return (
    <div className={"service-directory " + (compact ? "compact" : "")}>
      {services.map((s) => (
        <Link
          href={"/services/" + s.id}
          key={s.id}
          className="service-row reveal"
        >
          <span className="service-number">{s.num}</span>
          <div>
            <h3>{s.name}</h3>
            <p>{s.tagline}</p>
          </div>
          <span className="service-group">{s.group}</span>
          <span className="circle-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function WorkCard({ project, large = false }) {
  return (
    <Link
      href={"/work/" + project.slug}
      className={"work-card reveal " + (large ? "large" : "")}
    >
      <div className="work-image">
        <img
          src={project.image}
          alt={project.name + " — project presentation"}
          width="1600"
          height="1000"
          loading="lazy"
        />
        <span className="image-link">
          <Arrow />
        </span>
      </div>
      <div className="work-meta">
        <h3>{project.name}</h3>
        <p>{project.category}</p>
      </div>
    </Link>
  );
}
export function ServiceVisual({ service }) {
  return <ServiceCanvas service={service} />;
}
export function Process({ steps, details }) {
  return (
    <div className="process-list">
      {steps.map((step, i) => (
        <div className="process-step reveal" key={step}>
          <span>0{i + 1}</span>
          <h3>{step}</h3>
          <p>{details[i]}</p>
        </div>
      ))}
    </div>
  );
}
