import Link from "./site-link";
import { services } from "@/data/catalogue";
import { contributions, solutionConnections } from "@/data/company-content";
import { ArrowUpRight } from "./icons";
export function ServiceContribution({ service }) {
  const c = contributions[service.id];
  return (
    <section className="service-contribution" id="connected-expertise">
      <div className="wrap">
        <p className="eyebrow">The TechGy Link difference</p>
        <div className="contribution-intro">
          <h2>{c.title}</h2>
          <div>
            <p>{c.body}</p>
            <p className="contribution-team">{c.team}</p>
          </div>
        </div>
        <div className="contribution-connections">
          {c.connections.map(([id, body]) => (
            <Link
              className="service-contribution-link"
              key={id}
              href={"/services/" + id}
            >
              <span>
                {services.find((s) => s.id === id)?.name}
                <ArrowUpRight size={18} />
              </span>
              <p>{body}</p>
            </Link>
          ))}
        </div>
        <p className="contribution-note">
          Available as a standalone service, with connected expertise when your
          brief needs it.
        </p>
      </div>
    </section>
  );
}
export function SolutionCollaboration({ id }) {
  const c = solutionConnections[id];
  return (
    <section className="solution-collaboration section">
      <div className="wrap">
        <div className="contribution-intro">
          <div>
            <p className="eyebrow">Why a connected partner matters</p>
            <h2>{c.title}</h2>
          </div>
          <p>{c.body}</p>
        </div>
        <div className="collaboration-handoffs">
          {c.handoffs.map(([team, title, body], i) => (
            <article key={team}>
              <span className="eyebrow">
                0{i + 1} / {team}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PartnerSignature() {
  return (
    <aside className="partner-signature wrap">
      <p className="eyebrow">Specialist work. A wider perspective.</p>
      <p>
        TechGy Link brings design, engineering, marketing and visualisation
        together around your business. Your engagement has a focused team—with a
        wider company to connect to as the need grows.
      </p>
      <Link href="/about" className="text-link">
        Why we became TechGy Link <ArrowUpRight size={18} />
      </Link>
    </aside>
  );
}
