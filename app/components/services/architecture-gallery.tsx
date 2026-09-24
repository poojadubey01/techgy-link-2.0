"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "@/app/components/ui/icons";
import galleries from "@/data/architecture";
export function ArchitectureGallery() {
  const [group, setGroup] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = group === null ? null : galleries[group];
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (group !== null) {
      d.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
        d.close();
      };
    } else d.close();
  }, [group]);
  const move = (delta: number) => {
    if (selected)
      setIndex(
        (i) => (i + delta + selected.images.length) % selected.images.length,
      );
  };
  return (
    <section
      className="architecture-section py-[85px] max-[767px]:py-[55px] site-container mx-auto"
      id="selected-work"
    >
      <div className="section-heading flex justify-between items-end gap-10 mb-[45px] max-[767px]:block max-[767px]:mb-[33px]">
        <div>
          <p className="eyebrow text-brand">
            Architectural visualisation / Selected work
          </p>
          <h2 className="mt-6 max-[767px]:mt-5">
            In every frame,
            <br />a point of view.
          </h2>
        </div>
      </div>
      <div className="architecture-grid grid grid-cols-[repeat(3,1fr)] gap-y-[45px] gap-x-6 max-[1023px]:grid-cols-[1fr_1fr] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[35px]">
        {galleries.map((g, i) => (
          <button
            key={g.slug}
            className="architecture-card reveal p-0 bg-none border-0 text-left"
            onClick={() => {
              setGroup(i);
              setIndex(0);
            }}
            aria-label={`Explore ${g.title}, ${g.images.length} renders`}
          >
            <div className="architecture-image aspect-[1.12] relative overflow-hidden max-[767px]:aspect-[1.3]">
              <img
                src={g.coverImage}
                alt={`${g.title} architectural visualisation`}
                width="1300"
                height="900"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="project-open absolute right-4 bottom-4 bg-white rounded-full w-10 h-10 grid place-items-center">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="architecture-meta">
              <h3 className="text-[25px] mt-[23px] mx-0 mb-3 max-[767px]:text-[28px]">{g.title}</h3>
              <span className="text-[13px] text-[#000000]">
                {g.location} · {g.sector}
              </span>
              <div className="tag-list flex gap-2 flex-wrap mt-4">
                {g.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] text-[#000000] last:after:content-none after:content-['_/'] after:ml-[7px] after:text-[#000000]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog p-0 border-0 bg-transparent w-[min(1300px,calc(100vw_-_48px))] max-w-none max-h-[94svh] m-auto text-white overflow-auto max-[767px]:w-[calc(100vw_-_16px)] max-[767px]:max-h-[95svh]"
        aria-labelledby="gallery-title"
        onCancel={() => setGroup(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setGroup(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {selected && (
          <div className="gallery-inner p-6 bg-[#111625] max-[767px]:p-[15px]">
            <div className="gallery-top flex justify-between gap-5 items-center">
              <div>
                <h2
                  id="gallery-title"
                  className="text-[27px] tracking-[-0.025em] max-[767px]:text-[23px]"
                >
                  {selected.title}
                </h2>
                <p className="text-[13px] text-[#000000] mt-2 max-[767px]:text-[11px] max-[767px]:max-w-[230px]">
                  {selected.tags.join(" · ")}
                </p>
              </div>
              <button
                className="gallery-close grid place-items-center border border-[#f8f9fa30] rounded-full h-11 w-11 shrink-0"
                onClick={() => setGroup(null)}
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>
            <div className="gallery-main">
              <img
                src={selected.images[index].url}
                alt={`${selected.title} — ${selected.images[index].caption}`}
                width={selected.images[index].width}
                height={selected.images[index].height}
                className="h-[61svh] w-full object-contain my-[15px] max-[767px]:h-[48svh]"
              />
            </div>
            <div className="gallery-controls flex justify-between items-center gap-[15px] text-[13px]">
              <p aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {selected.images.length}
                <span className="ml-[25px] text-[#000000] max-[767px]:hidden">
                  {selected.images[index].caption}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => move(-1)}
                  aria-label="Previous render"
                  className="w-11 h-11 grid place-items-center border border-[#f8f9fa30]"
                >
                  <ArrowLeft />
                </button>
                <button
                  onClick={() => move(1)}
                  aria-label="Next render"
                  className="w-11 h-11 grid place-items-center border border-[#f8f9fa30]"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div
              className="gallery-thumbs flex gap-2 overflow-auto mt-4"
              aria-label="Choose a render"
            >
              {selected.images.map((im, i) => (
                <button
                  key={im.url}
                  className={
                    "border-2 flex-[0_0_85px] p-0 max-[767px]:basis-[65px] " +
                    (i === index
                      ? "selected border-[#e2e8f0] opacity-100"
                      : "border-transparent opacity-65")
                  }
                  onClick={() => setIndex(i)}
                  aria-label={`View render ${i + 1}: ${im.caption}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <img
                    src={im.url}
                    alt=""
                    loading="lazy"
                    width="110"
                    height="70"
                    className="w-[85px] h-[52px] object-cover max-[767px]:w-[65px] max-[767px]:h-[44px]"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
