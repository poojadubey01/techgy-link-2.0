import Link from "@/app/components/ui/internal-link";
import { ArrowDown, ArrowUpRight } from "@/app/components/ui/icons";
export function HomeHero() {
  return (
    <section
      className="overflow-hidden bg-[#f8f9fa] pt-[35px] max-[767px]:pt-[25px]"
      aria-labelledby="home-title"
    >
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] flex items-center justify-between gap-[30px] text-[14px] text-[#000000]">
        <p className="text-brand text-[13px] max-[767px]:text-[12px]">
          TechGy Link / Your growth partner
        </p>
        <Link
          href="/about"
          className="border-b border-[#e2e8f0] pb-[3px] max-[767px]:hidden"
        >
          Built on experience. Growing in possibility.
        </Link>
      </div>
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] relative mt-[45px] max-[767px]:mt-[30px]">
        <h1
          id="home-title"
          className="text-[clamp(72px,8.5vw,132px)] font-normal leading-[1.04] tracking-[-0.065em] max-[767px]:text-[clamp(46px,12.1vw,79px)] max-[767px]:leading-[1.08] max-[767px]:tracking-[-0.06em]"
        >
          <span data-ambition-line className="block origin-bottom-left">
            Your ambition.
          </span>
          <span
            data-ambition-line
            className="block origin-bottom-left ml-[8%] text-brand max-[767px]:ml-0 max-[767px]:mt-1.5"
          >
            All our strengths.
          </span>
        </h1>
        <p className="absolute right-0 top-[15px] text-[15px] leading-[1.65] text-[#000000] max-[1100px]:hidden">
          <span className="inline-block [animation:ambition-blink_2.4s_ease-in-out_infinite] [animation-delay:0s] motion-reduce:[animation:none] motion-reduce:text-[#000000]">
            Design.
          </span>
          <br />
          <span className="inline-block [animation:ambition-blink_2.4s_ease-in-out_infinite] [animation-delay:0.6s] motion-reduce:[animation:none] motion-reduce:text-[#000000]">
            Technology.
          </span>
          <br />
          <span className="inline-block [animation:ambition-blink_2.4s_ease-in-out_infinite] [animation-delay:1.2s] motion-reduce:[animation:none] motion-reduce:text-[#000000]">
            Growth.
          </span>
          <br />
          <span className="inline-block [animation:ambition-blink_2.4s_ease-in-out_infinite] [animation-delay:1.8s] motion-reduce:[animation:none] motion-reduce:text-[#000000]">
            Together.
          </span>
        </p>
      </div>
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] grid grid-cols-[1.05fr_1fr] gap-[100px] items-center mt-[38px] mb-[45px] max-[1100px]:gap-[50px] max-[767px]:block max-[767px]:mt-[27px] max-[767px]:mb-8">
        <p className="text-lg leading-[1.75] text-[#000000] max-w-[630px] max-[767px]:text-base max-[767px]:leading-[1.8]">
          From the first brand idea to the systems behind your growth, we bring
          design, technology, marketing and visualisation together—so your next
          move has the right people behind it.
        </p>
        <div className="flex flex-col items-end gap-[17px] max-[767px]:items-start max-[767px]:mt-[27px] max-[767px]:gap-[21px]">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-7 px-[27px] py-4 text-sm font-medium min-h-[58px] border border-transparent rounded-full bg-brand text-white hover:brightness-90 max-[767px]:text-[14px] max-[767px]:min-h-[54px] max-[767px]:px-[22px]"
          >
            Build your next chapter <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
      <div
        className="relative overflow-hidden rounded-[3px] h-[clamp(120px,12vw,200px)] w-full bg-[#e2e8f0] max-[767px]:h-[130px]"
        aria-label="Our capabilities, in motion"
        data-image-reveal
      >
        <div className="flex h-full w-max [animation:ambition-pan_60s_linear_infinite] motion-reduce:[animation:none]">
          <img
            src="/source/optimized/banner.webp"
            alt=""
            width="13277"
            height="675"
            fetchPriority="high"
            className="block h-full w-auto max-w-none"
          />
          <img
            src="/source/optimized/banner.webp"
            alt=""
            width="13277"
            height="675"
            aria-hidden="true"
            className="block h-full w-auto max-w-none"
          />
        </div>
      </div>
      <div className="w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] pt-[25px] pb-[35px] text-[14px] text-[#000000] flex justify-between gap-[25px] max-[767px]:pb-[30px] max-[767px]:block max-[767px]:text-[13px]">
        <a
          href="#why-link"
          className="inline-flex items-center gap-[18px] text-sm font-medium leading-[1.6] text-brand max-[767px]:mt-[18px] max-[767px]:text-[14px]"
        >
          Why we became TechGy Link <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
