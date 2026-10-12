import { notFound } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { articles } from "@/data/catalogue";
import { CTA } from "@/app/components/shared/common-blocks";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "@/app/components/ui/icons";
import { ArticleNavigation } from "@/app/components/insights/article-navigation";
import { InsightBanner } from "@/app/components/insights/insight-banner";
import styles from "./article.module.css";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.id === slug);
  return {
    title: a?.title,
    description: a?.summary,
    alternates: { canonical: "/insights/" + slug + "/" },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.id === slug);
  if (!a) notFound();

  const number = String(articles.indexOf(a) + 1).padStart(2, "0");
  const sections = a.sections.map(([title, body], index) => ({
    id: `section-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title,
    body,
  }));
  const words = [a.title, a.summary, ...a.sections.flat()].join(" ").trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const related = articles.filter((article) => article.id !== a.id);

  return (
    <main id="main" className={styles.page}>
      <article aria-labelledby="article-title">
        <header className={`site-container ${styles.hero}`}>
          <div className={styles.masthead}>
            <Link href="/insights" className={styles.backLink}>
              <ArrowLeft size={17} /> All insights
            </Link>
            <span className={styles.issue}>TechGy Link perspectives <span>/ {number}</span></span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.headline}>
              <p className={styles.category}><span aria-hidden="true" />{a.category}</p>
              <h1 id="article-title">{a.title}</h1>
              <div className={styles.byline}>
                <span className={styles.authorMark} aria-hidden="true">T<span>G</span></span>
                <div>
                  <p>TechGy Link</p>
                  <span>Design, technology & growth</span>
                </div>
                <span className={styles.readTime}>{readTime} min read</span>
              </div>
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryTop}>
                <p className="eyebrow">The core idea</p>
                <ArrowUpRight size={32} strokeWidth={1} />
              </div>
              <p className={styles.summaryText}>{a.summary}</p>
              <a href="#article-body" className={styles.startReading}>
                <span>{sections.length} practical considerations</span>
                <span className={styles.downArrow}><ArrowDown size={19} /></span>
              </a>
            </div>
          </div>
          <InsightBanner image={a.banner} className={styles.banner} />
        </header>

        <div id="article-body" className={`site-container ${styles.body}`}>
          <aside className={styles.sidebar}>
            <ArticleNavigation key={a.id} sections={sections.map(({ id, number, title }) => ({ id, number, title }))} />
          </aside>
          <div className={styles.prose}>
            {sections.map((section) => (
              <section id={section.id} key={section.id} className={styles.articleSection} aria-labelledby={`${section.id}-title`}>
                <span className={styles.sectionNumber} aria-hidden="true">{section.number}</span>
                <div>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </section>
            ))}
            <div className={styles.articleEnd}>
              <span className={styles.endMark} aria-hidden="true" />
              <p>A perspective from TechGy Link.</p>
              <Link href="/insights" className={styles.backLink}>More insights <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="site-container">
          <div className={styles.relatedHeading}>
            <div>
              <p className="eyebrow text-brand">Keep exploring</p>
              <h2 id="related-title">Another perspective.</h2>
            </div>
            <Link href="/insights" className={styles.backLink}>View all insights <ArrowUpRight size={18} /></Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((article) => (
              <Link href={"/insights/" + article.id} className={styles.relatedCard} key={article.id}>
                <InsightBanner image={article.banner} variant="card" className={styles.cardBanner} />
                <div className={styles.cardTop}>
                  <p className="eyebrow">{article.category}</p>
                  <span className={styles.cardArrow}><ArrowUpRight size={22} /></span>
                </div>
                <h3>{article.title}</h3>
                <p className={styles.cardSummary}>{article.summary}</p>
                <span className={styles.cardLink}>Read the perspective <ArrowUpRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Make your next move clearer." text="Bring us the question behind your next project. We’ll help you define a practical way forward." label="Let’s talk" />
    </main>
  );
}
