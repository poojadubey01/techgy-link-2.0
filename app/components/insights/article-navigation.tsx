"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@/app/components/ui/icons";
import styles from "@/app/insights/[slug]/article.module.css";

type Section = { id: string; number: string; title: string };

export function ArticleNavigation({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= 180) current = section.id;
      }
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sections]);

  async function copyLink() {
    try {
      const url = new URL(window.location.href);
      url.hash = "";
      await navigator.clipboard.writeText(url.toString());
      setCopyStatus("Link copied. Ready to share.");
    } catch {
      setCopyStatus("Copy the page URL from your address bar to share this insight.");
    }
  }

  return (
    <div className={styles.sidebarInner}>
      <nav aria-label="Article contents">
        <p className={`eyebrow ${styles.contentsLabel}`}>In this insight</p>
        <ol className={styles.contents}>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
                <span>{section.number}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className={styles.share}>
        <p>Worth a conversation?</p>
        <button type="button" onClick={copyLink}>Copy article link <ArrowUpRight size={16} /></button>
        <span role="status">{copyStatus}</span>
      </div>
    </div>
  );
}
