import type { InsightImage } from "@/data/insights";
import styles from "./insight-banner.module.css";

export function InsightBanner({
  image,
  variant = "article",
  priority = false,
  className = "",
}: {
  image?: InsightImage;
  variant?: "article" | "card" | "overview";
  priority?: boolean;
  className?: string;
}) {
  if (!image?.src) return null;

  return (
    <figure className={`${styles.figure} ${styles[variant]} ${className}`}>
      <div className={styles.frame}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          style={{ objectFit: image.fit ?? "cover", objectPosition: image.position ?? "center" }}
        />
      </div>
      {variant !== "card" && image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}
