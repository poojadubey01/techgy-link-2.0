"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { portfolioWork as work } from "@/data/catalogue";
import { StoryCard } from "@/app/components/shared/portfolio-highlights";

export function FAQs({ items }: { items: string[][] }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="faq-list divide-y divide-rule border-y border-rule">
      {items.map(([q, a], i) => {
        const isOpen = openIndexes.includes(i);
        return (
          <div key={q} className="group">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 text-left py-[24px] px-0 bg-transparent border-0 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand max-[767px]:py-[20px]"
            >
              <span className="text-[20px] font-display tracking-[-0.015em] leading-[1.4] text-ink group-hover:text-brand transition-colors duration-200 max-[767px]:text-[18px]">
                {q}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 w-[34px] h-[34px] rounded-full border border-rule flex items-center justify-center text-[22px] font-light text-ink/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:text-brand ${
                  isOpen ? "rotate-45 bg-brand text-white border-brand shadow-sm" : "bg-white"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-0 pr-[40px] pb-[25px] pl-0 text-[#000000]/80 leading-[1.85] text-[16px] max-[767px]:text-[15px] max-[767px]:pr-[10px] max-[767px]:pb-[20px]">
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
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
            className={`flex items-center gap-[22px] border rounded-full py-[13px] px-[23px] text-[14px] transition-all duration-200 cursor-pointer max-[767px]:gap-[13px] max-[767px]:py-2.5 max-[767px]:px-3.5 max-[767px]:text-[12px] ${
              filter === t
                ? "bg-brand text-white border-brand shadow-sm"
                : "bg-transparent text-ink border-rule hover:border-brand/40"
            }`}
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
