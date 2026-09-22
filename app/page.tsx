import { Testimonials } from "@/app/components/home/testimonials";
import { GrowthPartners } from "@/app/components/home/growth-partners";
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
    <main id="main" className="bg-[#f8f9fa]">
      <HomeHero />
      <CompanyEvolution />
      <GrowthPartners />
      <CollectiveCapabilities />
      <ConnectedProof />
      <PortfolioBreadth />
      <section className="bg-[#e2e8f0]">
        <div className="py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px] w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] grid grid-cols-[0.85fr_1.4fr] gap-[90px] items-start max-[1100px]:gap-[45px] max-[1100px]:grid-cols-[0.8fr_1.2fr] max-[767px]:block">
          <div className="sticky top-[150px] max-[767px]:static">
            <p className="text-brand text-[13px]">
              Where your next chapter can begin
            </p>
            <h2 className="text-[55px] leading-[1.15] my-[25px] max-[1100px]:text-[43px] max-[767px]:text-[40px] max-[767px]:my-[22px]">
              What are you
              <br />
              <span className="text-brand">moving toward?</span>
            </h2>
            <p className="text-[17px] text-[#000000] leading-[1.8] max-w-[330px] max-[767px]:text-[16px] max-[767px]:max-w-full">
              Start with the business ambition. We’ll bring the relevant
              capabilities into one plan.
            </p>
          </div>
          <div className="max-[767px]:mt-[38px]">
            {starts.map((s) => (
              <Link
                className="growth-start group grid grid-cols-[30px_1fr_30px] gap-[25px] items-start pt-[35px] pb-[42px] border-t border-[#e2e8f0] max-[767px]:grid-cols-[22px_1fr_20px] max-[767px]:gap-[13px] max-[767px]:pt-7 max-[767px]:pb-8"
                key={s.path}
                href={"/solutions/" + s.path}
              >
                <span className="text-[#000000] text-[13px] pt-[3px]">
                  {s.n}
                </span>
                <div>
                  <p className="text-[12px] text-brand max-[767px]:text-xs max-[767px]:leading-[1.7]">
                    {s.name}
                  </p>
                  <h3 className="text-[37px] leading-[1.15] my-5 max-[1100px]:text-[31px] max-[767px]:text-[29px] max-[767px]:my-[18px] group-hover:text-brand">
                    {s.title}
                  </h3>
                  <p className="text-base leading-[1.8] text-[#000000] max-[767px]:text-[16px]">
                    {s.body}
                  </p>
                </div>
                <ArrowUpRight size={30} className="w-6 text-brand max-[767px]:w-5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PartnerPromise />
      <Testimonials />
    </main>
  );
}
