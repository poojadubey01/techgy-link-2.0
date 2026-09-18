import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
export function ConnectedProof() {
  return (
    <section className="connected-proof section" id="selected-work">
      <div className="wrap">
        <div className="connected-proof-heading">
          <p className="eyebrow">The thinking, made tangible</p>
          <h2>
            One business.
            <br />
            Several experiences.
            <br />
            <span>Connected expertise.</span>
          </h2>
          <div>
            <h3>Greenland Capital</h3>
            <p>
              A farmland marketplace connecting customer discovery, geospatial
              information, document review and the operational teams behind it.
              A shared business challenge, approached through design and
              engineering.
            </p>
            <p className="proof-context">
              <span className="case-status">Ongoing project</span>
            </p>
            <Link
              href="/work/greenland-capital"
              className="text-link glc-story-link"
            >
              Read the connected project story <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="glc-ensemble">
          <Link className="ensemble-web" href="/work/glc-user-website">
            <div>
              <img
                src="/work/glc-web.webp"
                alt="Greenland Capital website project presentation"
                width="1600"
                height="900"
                loading="lazy"
              />
            </div>
            <span>
              The customer introduction <small>Website & experience</small>
              <ArrowUpRight />
            </span>
          </Link>
          <Link className="ensemble-app" href="/work/glc-user-mobile">
            <div>
              <img
                src="/work/glc-mobile.webp"
                alt="Greenland Capital mobile application project presentation"
                width="1600"
                height="900"
                loading="lazy"
              />
            </div>
            <span>
              The experience on the move <small>Mobile application</small>
              <ArrowUpRight />
            </span>
          </Link>
          <Link className="ensemble-ops" href="/work/glc-superadmin">
            <div>
              <img
                src="/work/glc-admin.webp"
                alt="Greenland Capital administration platform project presentation"
                width="1600"
                height="900"
                loading="lazy"
              />
            </div>
            <span>
              The business behind it <small>Custom software</small>
              <ArrowUpRight />
            </span>
          </Link>
        </div>
        <Link href="/work" className="text-link proof-all">
          Explore more of our work <ArrowUpRight />
        </Link>
      </div>
    </section>
  );
}
