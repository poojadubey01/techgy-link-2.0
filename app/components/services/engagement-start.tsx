import { engagements } from "@/data/engagements";
import { services } from "@/data/catalogue";

type Service = (typeof services)[number];

export function EngagementStart({ service: s }: { service: Service }) {
  const e = engagements[s.id as keyof typeof engagements];
  return (
    <section className="engagement-start wrap" id="starting-scope">
      <div className="engagement-heading">
        <p className="eyebrow">Your first engagement</p>
        <h2>{e.start}</h2>
      </div>
      <div className="engagement-details">
        {[
          ["What to bring", e.inputs],
          ["What we define", e.output],
          ["Delivery and review", e.ownership],
        ].map(([t, d]) => (
          <div key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
