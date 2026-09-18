import Link from "./site-link";
import { ArrowUpRight } from "./icons";
const chapters = [
  {
    id: "property-launch",
    n: "01",
    label: "Property launch",
    title: "Make the place visible.\nMake the next step clear.",
    text: "For developers and property teams bringing a project to market. Connect architectural visuals, the project identity, website and enquiry journey around approved project facts.",
    start: "Begin with a visualisation brief, project website or launch plan.",
    solution: "property-launch-sales",
    links: [
      ["Architectural Visualisation", "architectural-visualisation"],
      ["Branding & Identity", "branding-identity"],
      [
        "Digital Marketing & Sales Enablement",
        "digital-marketing-sales-enablement",
      ],
    ],
    image: "/architecture/vijetha-vaibhogam/Cam_09_.webp",
    alt: "Vijetha Vaibhogam architectural visualisation",
    caption: "Visualisation example / Vijetha Vaibhogam",
    crop: "space",
  },
  {
    id: "sales-operations",
    n: "02",
    label: "Sales & operations",
    title: "Connect the tools.\nKeep the work moving.",
    text: "For teams repeating data entry, losing enquiry context or reporting by hand. Map the handoffs, connect the systems and make exceptions visible to the right people.",
    start:
      "Begin with one workflow assessment and a scoped implementation plan.",
    solution: "connected-sales-operations",
    links: [
      [
        "AI Automation & System Integration",
        "ai-automation-system-integration",
      ],
      ["Custom Software Development", "custom-software-development"],
      [
        "Technology Consulting & Modernisation",
        "technology-consulting-modernisation",
      ],
    ],
    image: "/work/quickbooks.webp",
    alt: "QuickBooks Desktop integration project presentation",
    caption: "Integration example / QuickBooks Desktop",
    crop: "integration",
  },
  {
    id: "digital-delivery",
    n: "03",
    label: "Digital experiences",
    title: "Turn the user journey\ninto a working experience.",
    text: "For businesses improving a website, portal or application. Bring product design, engineering and release verification together around the tasks your customers or teams need to complete.",
    start:
      "Begin with a website brief or product discovery, depending on complexity.",
    solution: "digital-experience-product",
    links: [
      ["UI/UX & Product Design", "ui-ux-product-design"],
      ["Website Design & Development", "website-design-development"],
      ["Mobile Application Development", "mobile-application-development"],
    ],
    image: "/work/glc-web.webp",
    alt: "Greenland Capital product design presentation",
    caption: "Product design example / Greenland Capital",
    crop: "product",
  },
];
export function ConnectionStory() {
  return (
    <section className="connection-story" id="perspective">
      <div className="wrap connection-intro">
        <p className="eyebrow">Three ways to connect our expertise</p>
        <h2>
          The right specialists.
          <br />
          <span>Around your business challenge.</span>
        </h2>
        <p>
          These solutions bring relevant services together. You can start with
          one service and expand the scope when the need is clear.
        </p>
      </div>
      <div className="wrap connection-body">
        <div className="connection-chapters">
          {chapters.map((c) => (
            <article
              className="connection-chapter"
              data-chapter={c.n}
              id={c.id}
              key={c.id}
            >
              <p className="chapter-label">
                <span>{c.n}</span>
                {c.label}
              </p>
              <h3>
                {c.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>{c.text}</p>
              <p className="chapter-start">{c.start}</p>
              <Link
                className="chapter-solution-link"
                href={"/solutions/" + c.solution}
              >
                Explore this solution <ArrowUpRight size={19} />
              </Link>
              <div className="chapter-links" aria-label="Related services">
                {c.links.map(([label, slug]) => (
                  <Link key={slug} href={"/services/" + slug}>
                    {label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
              <figure className={"chapter-mobile-image story-crop-" + c.crop}>
                <img
                  src={c.image}
                  alt={c.alt}
                  width="1200"
                  height="900"
                  loading="lazy"
                />
                <figcaption>{c.caption}</figcaption>
              </figure>
            </article>
          ))}
        </div>
        <div className="connection-stage" aria-hidden="true">
          <div className="connection-stage-top">
            <span>Solutions / Connected services</span>
            <span>01 — 03</span>
          </div>
          <div className="connection-frames">
            {chapters.map((c, i) => (
              <figure
                key={c.n}
                className={
                  "connection-frame story-crop-" +
                  c.crop +
                  (i === 0 ? " first" : "")
                }
                data-story-frame={c.n}
              >
                <div className="connection-frame-image">
                  <img
                    src={c.image}
                    alt=""
                    width="1200"
                    height="900"
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>{c.caption}</span>
                  <span>{c.n}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="connection-progress">
            {chapters.map((c) => (
              <span key={c.n} data-story-progress={c.n}>
                <i />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
