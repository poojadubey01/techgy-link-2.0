"use client";
import { useState } from "react";
import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";

export function PartnerPromise({ compact = false }: { compact?: boolean }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const promises = [
    [
      "A shared understanding",
      "Your business context stays in the brief as work moves from strategy to design, engineering and marketing.",
    ],
    [
      "Specialists who work together",
      "An in-house team, experienced advisors and consultants are brought together for the engagement.",
    ],
    [
      "Someone connecting the work",
      "A named delivery lead, shared reviews and visible decisions keep the different disciplines moving in the same direction.",
    ],
    [
      "Continuity as you grow",
      "Carry the context, assets and decisions into the next agreed phase, with a team that understands what has already been built.",
    ],
  ];

  return (
    <section className="bg-paper py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]">
      <div className="site-container mx-auto grid grid-cols-[1fr_1fr] gap-[100px] max-[1100px]:gap-[50px] max-[767px]:block">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[12px]">
            What being your growth partner means
          </p>
          <h2 className="text-[49px] leading-[1.17] my-[26px] max-[1100px]:text-[42px] max-[767px]:text-[36px] max-[767px]:leading-[1.2]">
            You bring the ambition.
            <br />
            <span className="text-brand">We connect the people.</span>
          </h2>
          <p className="text-[17px] leading-[1.85] text-[#000000] max-w-[510px] max-[767px]:text-[16px]">
            One relationship with a wider view. Your brand, your digital
            experience and your operating systems can be planned together. Begin
            with a focused project and build the relationship around what your
            business needs next.
          </p>
          <Link
            href="/about"
            className="cta-link inline-flex items-center font-medium text-brand mt-[30px]"
          >
            Meet the company behind the work <ArrowUpRight />
          </Link>
        </div>
        <div className="partner-promises divide-y divide-rule border-y border-rule max-[767px]:mt-10">
          {promises.map(([t, d], i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <article key={t} className="group">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start gap-[25px] py-7 text-left bg-transparent border-0 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand max-[767px]:gap-[18px] max-[767px]:py-[24px]"
                >
                  <span className="text-[13px] text-brand pt-1.5 shrink-0 font-medium">
                    0{i + 1}
                  </span>
                  <span className="flex-1 font-display text-[29px] leading-[1.2] text-ink group-hover:text-brand transition-colors duration-200 max-[767px]:text-[24px]">
                    {t}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 w-[36px] h-[36px] rounded-full border border-rule flex items-center justify-center text-[24px] font-light text-ink/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-brand group-hover:text-brand ${
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
                    <p className="pl-[42px] pr-[30px] pb-7 text-base leading-[1.8] text-[#000000]/80 max-[767px]:pl-[32px] max-[767px]:pr-[10px] max-[767px]:pb-[24px] max-[767px]:text-[15px]">
                      {d}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
