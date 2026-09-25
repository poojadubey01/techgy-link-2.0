import Link from "@/app/components/ui/internal-link";
import { services } from "@/data/catalogue";
import { contributions, solutionConnections } from "@/data/company-content";
import { ArrowUpRight } from "@/app/components/ui/icons";

type Service = (typeof services)[number];

const eyebrowClass =
  "eyebrow text-brand";
const textLinkClass =
  "cta-link inline-flex items-center font-medium text-brand";

export function ServiceContribution({ service }: { service: Service }) {
  const c = contributions[service.id as keyof typeof contributions];
  return (
    <section className="bg-paper section-space my-0">
      <div className="site-container mx-auto">
        <p className="eyebrow text-brand">
          The TechGy Link difference
        </p>
        <div className="grid grid-cols-[1fr_1fr] gap-[90px] items-start mt-[26px] max-[767px]:block max-[767px]:mt-[23px]">
          <h2>
            {c.title}
          </h2>
          <div className="max-[767px]:mt-[25px]">
            <p className="text-[17px] text-[#000000] leading-[1.85] max-[767px]:text-[16px]">
              {c.body}
            </p>
            <p className="text-[13px] mt-[22px] text-brand max-[767px]:leading-[1.8]">
              {c.team}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function SolutionCollaboration({ id }: { id: string }) {
  const c = solutionConnections[id as keyof typeof solutionConnections];
  return (
    <section className="bg-paper section-space">
      <div className="site-container mx-auto">
        <div className="grid grid-cols-[1fr_1fr] gap-[90px] items-end m-0 max-[767px]:block">
          <div>
            <p className={eyebrowClass}>Why a connected partner matters</p>
            <h2 className="mt-6 max-[767px]:mt-5">
              {c.title}
            </h2>
          </div>
          <p className="text-[17px] leading-[1.85] text-[#000000] max-[767px]:text-[16px] max-[767px]:mt-[25px]">
            {c.body}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-[60px] max-[767px]:block max-[767px]:mt-[35px]">
          {c.handoffs.map(([team, title, body], i) => (
            <article
              key={team}
              className="border-t border-t-rule pt-[26px] max-[767px]:pt-[25px] max-[767px]:mt-[30px]"
            >
              <span className={eyebrowClass}>
                0{i + 1} / {team}
              </span>
              <h3 className="text-[30px] leading-[1.2] mt-6 mb-[18px] max-[767px]:text-[29px] max-[767px]:mt-5 max-[767px]:mb-[15px]">
                {title}
              </h3>
              <p className="text-[16px] leading-[1.8] text-[#000000]">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PartnerSignature() {
  return (
    <aside className="site-container mx-auto border-t border-t-rule pt-10 pb-[65px] grid grid-cols-[0.55fr_1.2fr_0.55fr] gap-[45px] items-start max-[1100px]:grid-cols-[1fr_2fr] max-[1100px]:gap-[30px] max-[767px]:block max-[767px]:pt-8 max-[767px]:pb-[50px]">
      <p className="text-[12px] text-brand">
        Specialist work. A wider perspective.
      </p>
      <p className="text-[16px] leading-[1.8] text-[#000000] max-[767px]:mt-5">
        TechGy Link brings design, engineering, marketing and visualisation
        together around your business. Your engagement has a focused team—with a
        wider company to connect to as the need grows.
      </p>
      <Link
        href="/about"
        className={
          textLinkClass +
          " text-[14px] leading-[1.7] max-[1100px]:col-start-2 max-[767px]:mt-[25px]"
        }
      >
        Why we became TechGy Link <ArrowUpRight size={18} />
      </Link>
    </aside>
  );
}
