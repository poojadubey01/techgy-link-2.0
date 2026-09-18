"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "@/app/components/ui/internal-link";
import { services } from "@/data/catalogue";
import { ArrowUpRight } from "@/app/components/ui/icons";
export function ExpertiseIndex() {
  const [active, setActive] = useState(2);
  const image = useRef(null);
  useEffect(() => {
    if (
      image.current &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const tween = gsap.fromTo(
        image.current,
        { opacity: 0.25, scale: 1.025 },
        { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" },
      );
      return () => {
        tween.kill();
      };
    }
  }, [active]);
  return (
    <div className="expertise-index">
      <div className="expertise-preview">
        <div className={"expertise-image expertise-" + services[active].id}>
          <img
            ref={image}
            src={services[active].image}
            alt={"Visual reference for " + services[active].name}
            width="1200"
            height="1000"
            loading="lazy"
          />
        </div>
        <p className="eyebrow">
          {services[active].group} / {services[active].num}
        </p>
        <p className="expertise-caption">{services[active].tagline}</p>
      </div>
      <div className="expertise-list">
        {services.map((s, i) => (
          <Link
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            key={s.id}
            href={"/services/" + s.id}
            className={
              i === active ? "expertise-item active" : "expertise-item"
            }
          >
            <span>{s.num}</span>
            <h3>{s.name}</h3>
            <ArrowUpRight size={23} />
          </Link>
        ))}
      </div>
    </div>
  );
}
