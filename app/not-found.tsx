import Link from "@/app/components/ui/internal-link";
export default function NotFound() {
  return (
    <main
      id="main"
      className="w-[min(1424px,calc(100%_-_112px))] mx-auto py-[120px] max-[767px]:py-20"
    >
      <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand max-[767px]:text-[11px] max-[767px]:tracking-[0.085em]">
        404 / A small detour
      </p>
      <h1 className="my-[25px] mx-0">Let’s reconnect.</h1>
      <p className="mb-[30px]">
        This page could not be found. Explore our services or return to the
        homepage.
      </p>
      <div className="flex flex-wrap items-center gap-6 mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-7 px-7 py-4 text-sm font-medium min-h-14 border border-transparent rounded-full bg-brand text-white hover:brightness-90 max-[767px]:text-[13px] max-[767px]:min-h-[51px] max-[767px]:py-[14px] max-[767px]:px-[18px] max-[767px]:gap-5"
        >
          Back to TechGy Link
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-7 px-7 py-4 text-sm font-medium min-h-14 border border-rule bg-transparent rounded-full max-[767px]:text-[13px] max-[767px]:min-h-[51px] max-[767px]:py-[14px] max-[767px]:px-[18px] max-[767px]:gap-5"
        >
          Explore services
        </Link>
      </div>
    </main>
  );
}
