import Link from "./site-link";
import { services } from "@/data/catalogue";
import { ArrowUpRight } from "./icons";
export function ServiceFinder() {
  return (
    <section
      className="service-finder wrap"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="finder-heading">
        <div>
          <p className="eyebrow">What we do</p>
          <h2 id="expertise-title">Find your starting point.</h2>
        </div>
        <p>
          Nine specialist services. Engage one, or connect several around a
          shared brief.
        </p>
      </div>
      <div className="finder-links">
        {services.map((s) => (
          <Link key={s.id} href={"/services/" + s.id}>
            <span>{s.num}</span>
            <h3>{s.name}</h3>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </div>
      <div className="finder-end">
        <p>
          Each service has its own scope, delivery process and enquiry route.
        </p>
        <Link href="/services" className="text-link">
          Compare the services <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
