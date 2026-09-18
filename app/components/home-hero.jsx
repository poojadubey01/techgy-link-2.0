import Link from "./site-link";
import { ArrowDown, ArrowUpRight } from "./icons";
export function HomeHero() {
  return (
    <section className="ambition-hero" aria-labelledby="home-title">
      <div className="wrap ambition-top">
        <p className="eyebrow">TechGy Link / Your growth partner</p>
        <Link href="/about">Built on experience. Growing in possibility.</Link>
      </div>
      <div className="wrap ambition-title">
        <h1 id="home-title">
          <span data-ambition-line>Your ambition.</span>
          <span data-ambition-line>All our strengths.</span>
        </h1>
        <p className="ambition-side">
          Design.
          <br />
          Technology.
          <br />
          Growth.
          <br />
          <span>Together.</span>
        </p>
      </div>
      <div className="wrap ambition-intro">
        <p>
          From the first brand idea to the systems behind your growth, we bring
          design, technology, marketing and visualisation together—so your next
          move has the right people behind it.
        </p>
        <div>
          <Link href="/contact" className="button blue">
            Build your next chapter <ArrowUpRight size={20} />
          </Link>
          <a href="#why-link" className="text-link">
            Why we became TechGy Link <ArrowDown size={18} />
          </a>
        </div>
      </div>
      <div className="ambition-work" aria-label="Work across our disciplines">
        <Link href="/work/eco-world" className="ambition-project ambition-web">
          <div className="ambition-project-image">
            <img
              src="/work/eco-world.webp"
              alt="Eco World property website"
              width="1600"
              height="898"
              fetchPriority="high"
            />
          </div>
          <div className="ambition-project-label">
            <span>
              Make the brand an experience.<small>Eco World / Website</small>
            </span>
            <ArrowUpRight />
          </div>
        </Link>
        <Link
          href="/work/glc-user-mobile"
          className="ambition-project ambition-mobile"
        >
          <div className="ambition-project-image">
            <img
              src="/work/glc-mobile.webp"
              alt="Greenland Capital mobile application project"
              width="1600"
              height="898"
              fetchPriority="high"
            />
          </div>
          <div className="ambition-project-label">
            <span>
              Put the business in their hands.
              <small>Greenland Capital / Mobile</small>
            </span>
            <ArrowUpRight />
          </div>
        </Link>
        <Link
          href="/work/vasavi-atlantis"
          className="ambition-project ambition-space"
        >
          <div className="ambition-project-image">
            <img
              src="/architecture/vasavi-atlantis/Aerial_Night.webp"
              alt="Vasavi Atlantis architectural visualisation at dusk"
              width="1200"
              height="900"
              fetchPriority="high"
            />
          </div>
          <div className="ambition-project-label">
            <span>
              Make the future visible.
              <small>Vasavi Atlantis / Visualisation</small>
            </span>
            <ArrowUpRight />
          </div>
        </Link>
      </div>
      <div className="wrap ambition-foot">
        <span>Independent specialists. A shared view of your business.</span>
        <a href="#expertise">
          Meet the capabilities <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
