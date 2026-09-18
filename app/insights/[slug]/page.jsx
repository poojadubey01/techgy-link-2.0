import { notFound } from "next/navigation";
import Link from "../../components/site-link";
import { articles } from "@/data/catalogue";
import { CTA } from "../../components/connected";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = articles.find((a) => a.id === slug);
  return { title: a?.title, description: a?.summary };
}
export default async function Article({ params }) {
  const { slug } = await params;
  const a = articles.find((a) => a.id === slug);
  if (!a) notFound();
  return (
    <main id="main">
      <section className="page-intro wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/insights">Insights</Link>
          <span>/</span>
          <span>{a.category}</span>
        </nav>
        <p className="eyebrow">{a.category} / TechGy Link perspective</p>
        <h1>{a.title}</h1>
        <p>{a.summary}</p>
      </section>
      <article className="article-body wrap">
        {a.sections.map(([t, d]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{d}</p>
          </section>
        ))}
      </article>
      <CTA />
    </main>
  );
}
