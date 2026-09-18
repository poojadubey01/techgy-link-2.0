"use client";
import { useState } from "react";
import { portfolioWork as work } from "@/data/catalogue";
import { StoryCard } from "./portfolio-evidence";
export function FAQs({ items }) {
  return (
    <div className="faqs">
      {items.map(([q, a]) => (
        <details key={q} name="service-faq">
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function WorkExplorer() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="work-explorer">
      <div className="work-tabs" role="group" aria-label="Filter portfolio">
        {["All", "Digital", "Visualisation"].map((t) => (
          <button
            key={t}
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
            <span>
              {t === "All"
                ? work.length
                : work.filter((p) => p.kind === t).length}
            </span>
          </button>
        ))}
      </div>
      <div className="work-grid" aria-live="polite">
        {work
          .filter((p) => filter === "All" || p.kind === filter)
          .map((p) => (
            <StoryCard key={p.slug} project={p} />
          ))}
      </div>
    </div>
  );
}
