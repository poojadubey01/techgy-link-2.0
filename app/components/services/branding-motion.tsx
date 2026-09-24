import Image from "next/image";

export function BrandingMotion() {
  return (
    <section
      aria-label="TechGy Link brand identity references"
      className="service-demo w-full overflow-hidden rounded-[6px] bg-paper p-5 sm:p-8 lg:p-10"
    >
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
        <figure className="m-0 overflow-hidden rounded-lg border border-rule bg-white">
          <Image
            src="/source/optimized/golden.png"
            alt="TechGy Link logo construction diagram"
            width={1495}
            height={1372}
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="h-auto w-full"
          />
        </figure>
        <figure className="m-0 overflow-hidden rounded-lg border border-rule bg-white">
          <Image
            src="/source/optimized/colors.png"
            alt="TechGy Link brand color palette"
            width={2133}
            height={1134}
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
