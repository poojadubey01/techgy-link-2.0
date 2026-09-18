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
    <section className="architecture-section wrap" id="selected-work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Architectural visualisation / Selected work</p>
          <h2>
            In every frame,
            <br />a point of view.
          </h2>
        </div>
        <p>
          Nine project collections.
          <br />
          149 original renders.
        </p>
      </div>
      <div className="architecture-grid">
        {galleries.map((g, i) => (
          <button
            key={g.slug}
            className="architecture-card reveal"
            onClick={() => {
              setGroup(i);
              setIndex(0);
            }}
            aria-label={`Explore ${g.title}, ${g.images.length} renders`}
          >
            <div className="architecture-image">
              <img
                src={g.coverImage}
                alt={`${g.title} architectural visualisation`}
                width="1300"
                height="900"
                loading="lazy"
              />
              <span className="project-open">
                <ArrowUpRight size={20} />
              </span>
              <span className="render-count">{g.images.length} frames</span>
            </div>
            <div className="architecture-meta">
              <h3>{g.title}</h3>
              <span>
                {g.location} · {g.sector}
              </span>
              <div className="tag-list">
                {g.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
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
          <div className="gallery-inner">
            <div className="gallery-top">
              <div>
                <h2 id="gallery-title">{selected.title}</h2>
                <p>{selected.tags.join(" · ")}</p>
              </div>
              <button
                className="gallery-close"
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
              />
            </div>
            <div className="gallery-controls">
              <p aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {selected.images.length}
                <span>{selected.images[index].caption}</span>
              </p>
              <div>
                <button onClick={() => move(-1)} aria-label="Previous render">
                  <ArrowLeft />
                </button>
                <button onClick={() => move(1)} aria-label="Next render">
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="gallery-thumbs" aria-label="Choose a render">
              {selected.images.map((im, i) => (
                <button
                  key={im.url}
                  className={i === index ? "selected" : ""}
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
