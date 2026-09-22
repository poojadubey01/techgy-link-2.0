export function GrowthPartners() {
  return (
    <section aria-labelledby="growth-partners-title" className="bg-white py-8 max-[767px]:py-6">
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] flex items-center gap-10 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-5">
        <div className="shrink-0 max-w-[260px]">
          <h2 id="growth-partners-title" className="text-[28px] leading-tight">Growth <span className="text-brand">Partners</span></h2>
          <p className="mt-2 text-[15px] leading-[1.5]">We grow alongside our teams, not just service their accounts.</p>
        </div>
        <div className="min-w-0 w-full overflow-hidden bg-white growth-partners-window">
          <div className="growth-partners-track flex w-max">
            <img src="/source/optimized/growth-partners.png" alt="Growth partners of TechGy Link" width={13096} height={496} loading="lazy" className="block h-[110px] max-[767px]:h-[90px] w-auto max-w-none shrink-0" />
            <img src="/source/optimized/growth-partners.png" alt="" aria-hidden="true" width={13096} height={496} loading="lazy" className="block h-[110px] max-[767px]:h-[90px] w-auto max-w-none shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}