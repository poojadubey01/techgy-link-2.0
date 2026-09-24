import { notFound } from "next/navigation";
import Link from "@/app/components/ui/internal-link";
import { articles } from "@/data/catalogue";
import { CTA } from "@/app/components/shared/common-blocks";
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
  return { title: a?.title, description: a?.summary };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.id === slug);
  if (!a) notFound();
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <nav
          className="flex gap-3 items-center flex-wrap text-[13px] text-[#000000] mb-[35px] max-[767px]:text-[12px] max-[767px]:mb-7 max-[767px]:gap-[9px]"
          aria-label="Breadcrumb"
        >
          <Link href="/insights" className="hover:text-brand">
            Insights
          </Link>
          <span>/</span>
          <span>{a.category}</span>
        </nav>
        <p className="eyebrow text-brand">
          {a.category} / TechGy Link perspective
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          {a.title}
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          {a.summary}
        </p>
      </section>
      <article className="site-container mx-auto max-w-[820px] pb-[110px] max-[767px]:pb-[70px]">
        {a.sections.map(([t, d]) => (
          <section key={t} className="mb-[45px]">
            <h2 className="text-[34px] mb-[25px] max-[767px]:text-[30px]">
              {t}
            </h2>
            <p className="text-[18px] leading-[1.95] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.9]">
              {d}
            </p>
          </section>
        ))}
      </article>
      <CTA />
    </main>
  );
}
