import { ArrowRight, ArrowUpRight } from "@/app/components/ui/icons";
import { services } from "@/data/catalogue";

type Service = (typeof services)[number];

const meta = {
  "ui-ux-product-design": [
    "Product experience",
    "From structure to interface",
    "Greenland Capital / Product design presentation",
  ],
  "website-design-development": [
    "Digital experience",
    "A place for your brand to come alive",
    "Eco World / Website project",
  ],
  "custom-software-development": [
    "Business applications",
    "Complex work. Clear interfaces.",
    "Greenland Capital / Administration platform presentation",
  ],
  "mobile-application-development": [
    "Mobile experience",
    "Built around the task in hand",
    "Greenland Capital / Mobile application presentation",
  ],
};
export function ServiceCanvas({ service: s }: { service: Service }) {
  if (s.id === "architectural-visualisation")
    return (
      <figure className="service-image architecture-hero" data-image-reveal>
        <img
          src={s.image}
          width="1600"
          height="1000"
          alt="Vasavi Atlantis architectural visualisation at dusk"
          fetchPriority="high"
        />
        <figcaption>Selected work / Vasavi Atlantis</figcaption>
      </figure>
    );
  if (s.id === "branding-identity")
    return (
      <div className="brand-canvas" data-image-reveal>
        <div className="brand-canvas-primary">
          <p className="eyebrow">Our own identity / TechGy Link</p>
          <img
            src="/brand/logo.png"
            width="541"
            height="111"
            alt="TechGy Link visual identity"
          />
          <p>
            A clear idea.
            <br />A consistent expression.
          </p>
        </div>
        <div className="brand-canvas-type">
          <span>Aa</span>
          <p>Character in every detail.</p>
          <div>
            <span>Blue</span>
            <span>Ink</span>
            <span>Silver</span>
          </div>
        </div>
      </div>
    );
  if (s.id === "ai-automation-system-integration")
    return (
      <div className="workflow-canvas" data-diagram>
        <div className="canvas-heading">
          <div>
            <p className="eyebrow">Illustrative workflow</p>
            <h3>
              Less repetition.
              <br />
              More connection.
            </h3>
          </div>
          <p>
            Connect the routine steps.
            <br />
            Keep people in control of the decisions.
          </p>
        </div>
        <ol className="workflow-nodes">
          {[
            ["01", "Capture", "An enquiry arrives"],
            ["02", "Validate", "Check the information"],
            ["03", "Review", "A person approves"],
            ["04", "Connect", "Update the business system"],
          ].map(([n, t, d]) => (
            <li key={n}>
              <span>{n}</span>
              <h4>{t}</h4>
              <p>{d}</p>
              <ArrowRight size={20} />
            </li>
          ))}
        </ol>
        <div className="workflow-return">
          <span>Exceptions remain visible</span>
          <span>Human approval where needed</span>
          <span>Every handoff has an owner</span>
        </div>
      </div>
    );
  if (s.id === "digital-marketing-sales-enablement")
    return (
      <div className="marketing-canvas" data-diagram>
        <div className="canvas-heading">
          <div>
            <p className="eyebrow">A connected acquisition journey</p>
            <h3>
              Attention is
              <br />
              the beginning.
            </h3>
          </div>
          <p>
            Make the offer, destination and follow-up <br />
            part of the same plan.
          </p>
        </div>
        <ol className="marketing-path">
          {[
            ["Reach", "The right audience"],
            ["Resonate", "A relevant offer"],
            ["Convert", "A clear next step"],
            ["Continue", "An informed conversation"],
          ].map(([t, d], i) => (
            <li key={t}>
              <span>0{i + 1}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className="canvas-note">
          Example journey / Performance is measured against an agreed campaign
          brief.
        </p>
      </div>
    );
  if (s.id === "technology-consulting-modernisation")
    return (
      <div className="consulting-canvas" data-diagram>
        <div className="canvas-heading">
          <div>
            <p className="eyebrow">The assessment framework</p>
            <h3>
              See the system.
              <br />
              Plan the change.
            </h3>
          </div>
          <p>
            Senior technical review, connected <br />
            to practical implementation.
          </p>
        </div>
        <div className="assessment-map">
          {[
            ["01", "Understand today", "Systems, constraints, dependencies"],
            ["02", "Evaluate the options", "Architecture, risk, integration"],
            ["03", "Define the path", "Priorities, ownership, milestones"],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <h4>{t}</h4>
              <p>{d}</p>
              <ArrowUpRight size={20} />
            </div>
          ))}
        </div>
        <p className="canvas-note">
          Assessment → Architecture decisions → Phased roadmap
        </p>
      </div>
    );
  const [label, title, caption] = meta[s.id as keyof typeof meta] || [
    "Selected work",
    "Designed around the experience",
    "TechGy Link / Project presentation",
  ];
  return (
    <figure className={"project-canvas canvas-" + s.id} data-image-reveal>
      <div className="project-canvas-intro">
        <p className="eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{caption}</p>
      </div>
      <div className="project-canvas-image">
        <img
          src={s.image}
          alt={caption}
          width="1600"
          height="1000"
          fetchPriority="high"
        />
      </div>
    </figure>
  );
}
