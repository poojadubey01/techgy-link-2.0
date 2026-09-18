import { PortfolioBreadth } from "@/app/components/shared/portfolio-highlights";
import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
import { HomeHero } from "@/app/components/home/hero";
import { CompanyEvolution } from "@/app/components/home/story-timeline";
import { CollectiveCapabilities } from "@/app/components/home/capabilities-grid";
import { ConnectedProof } from "@/app/components/home/client-results";
import { PartnerPromise } from "@/app/components/shared/promise-banner";
const starts = [
  {
    n: "01",
    title: "Bring a project to market.",
    name: "Property Launch & Sales Enablement",
    body: "Visualise the place. Shape the story. Connect the launch, website and enquiry journey.",
    path: "property-launch-sales",
  },
  {
    n: "02",
    title: "Make the business work together.",
    name: "Connected Sales & Operations",
    body: "Connect the tools, follow-ups and everyday workflows that keep your team moving.",
    path: "connected-sales-operations",
  },
  {
    n: "03",
    title: "Build the next customer experience.",
    name: "Digital Experience & Product Delivery",
    body: "Turn a website, portal or app ambition into a considered experience and a working product.",
    path: "digital-experience-product",
  },
];
export default function Home() {
  return (
    <main id="main">
      <HomeHero />
      <CompanyEvolution />
      <CollectiveCapabilities />
      <ConnectedProof />
      <PortfolioBreadth />
      <section className="growth-starts-section">
        <div className="growth-starts section wrap">
          <div className="growth-starts-intro">
            <p className="eyebrow">Where your next chapter can begin</p>
            <h2>
              What are you
              <br />
              <span className="text-brand">moving toward?</span>
            </h2>
            <p>
              Start with the business ambition. We’ll bring the relevant
              capabilities into one plan.
            </p>
          </div>
          <div className="growth-start-rows">
            {starts.map((s) => (
              <Link
                className="growth-start"
                key={s.path}
                href={"/solutions/" + s.path}
              >
                <span>{s.n}</span>
                <div>
                  <p className="eyebrow">{s.name}</p>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <ArrowUpRight size={30} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PartnerPromise />
    </main>
  );
}
