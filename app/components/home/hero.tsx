import Link from "@/app/components/ui/internal-link";
import { ArrowDown, ArrowUpRight } from "@/app/components/ui/icons";
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
      <div
        className="ambition-banner"
        aria-label="Our capabilities, in motion"
        data-image-reveal
      >
        <div className="ambition-banner-track">
          <img
            src="/source/optimized/banner.webp"
            alt=""
            width="13277"
            height="675"
            fetchPriority="high"
          />
          <img
            src="/source/optimized/banner.webp"
            alt=""
            width="13277"
            height="675"
            aria-hidden="true"
          />
        </div>
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
