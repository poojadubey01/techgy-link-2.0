"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { portfolioWork as work } from "@/data/catalogue";
import { StoryCard } from "@/app/components/shared/portfolio-highlights";

export function FAQs({ items }: { items: string[][] }) {
  return (
    <div>
      {items.map(([q, a]) => (
        <details
          key={q}
          name="service-faq"
          className="group border-t border-t-rule last:border-b last:border-b-rule"
        >
          <summary className="flex items-center justify-between gap-5 cursor-pointer py-[25px] px-0 list-none text-[20px] font-display tracking-[-0.015em] leading-[1.45] [&::-webkit-details-marker]:hidden max-[767px]:py-[23px]">
            {q}
            <span
              aria-hidden="true"
              className="font-sans text-[25px] font-light text-[#000000] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pt-0 pr-[30px] pb-[25px] pl-0 text-[#000000] leading-[1.85] text-[16px] max-[767px]:text-[15px] max-[767px]:pr-[15px]">
            {a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function WorkExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterParam = searchParams.get("filter") || searchParams.get("tab");
  const initialFilter =
    filterParam && ["Digital", "Visualisation"].includes(filterParam)
      ? filterParam
      : "All";

  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    if (filterParam && ["Digital", "Visualisation", "All"].includes(filterParam)) {
      setFilter(filterParam);
    } else if (!filterParam) {
      setFilter("All");
    }
  }, [filterParam]);

  useEffect(() => {
    const saved = sessionStorage.getItem("work_scroll_pos");
    if (saved) {
      const top = parseInt(saved, 10);
      if (!isNaN(top) && top > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top, behavior: "instant" });
        });
        const t1 = setTimeout(() => {
          window.scrollTo({ top, behavior: "instant" });
        }, 50);
        const t2 = setTimeout(() => {
          window.scrollTo({ top, behavior: "instant" });
        }, 150);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        sessionStorage.setItem("work_scroll_pos", window.scrollY.toString());
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (t: string) => {
    setFilter(t);
    const newUrl = t === "All" ? "/work" : `/work?filter=${t}`;
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div>
      <div
        className="flex gap-[15px] mt-0 mb-12 max-[767px]:gap-2.5 max-[767px]:mt-3 max-[767px]:mb-8"
        role="group"
        aria-label="Filter portfolio"
      >
        {["All", "Digital", "Visualisation"].map((t) => (
          <button
            key={t}
            className="flex items-center gap-[22px] border border-rule rounded-full py-[13px] px-[23px] text-[14px] aria-[pressed=true]:bg-ink aria-[pressed=true]:text-white aria-[pressed=true]:border-ink max-[767px]:gap-[13px] max-[767px]:py-2.5 max-[767px]:px-3.5 max-[767px]:text-[12px]"
            aria-pressed={filter === t}
            onClick={() => handleFilterChange(t)}
          >
            {t}
            <span className="text-[11px] opacity-50">
              {t === "All"
                ? work.length
                : work.filter((p) => p.kind === t).length}
            </span>
          </button>
        ))}
      </div>
      <div
        className="grid grid-cols-[1fr_1fr] gap-y-[60px] gap-x-8 max-[767px]:grid-cols-[1fr] max-[767px]:gap-[35px]"
        aria-live="polite"
      >
        {work
          .filter((p) => filter === "All" || p.kind === filter)
          .map((p) => (
            <StoryCard key={p.slug} project={p} from={filter} />
          ))}
      </div>
    </div>
  );
}
