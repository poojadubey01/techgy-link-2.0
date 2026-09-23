import Link from "@/app/components/ui/internal-link";
import { ArrowUpRight } from "@/app/components/ui/icons";
export function ConnectedProof() {
  return (
    <section
      className="bg-[#111625] text-white overflow-hidden py-[120px] max-[1023px]:py-[90px] max-[767px]:py-[70px]"
      id="selected-work"
    >
      <div className="site-container mx-auto">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-x-[95px] items-end max-[1100px]:gap-[50px] max-[767px]:block">
          <p className="col-span-full mb-[30px] text-[#f8f9fa] text-[14px] max-[767px]:text-[12px] max-[767px]:mb-6">
            The thinking, made tangible
          </p>
          <h2 className="text-[clamp(43px,4.6vw,70px)] leading-[1.1] max-[767px]:text-[38px] max-[767px]:leading-[1.16]">
            One business.
            <br />
            Several experiences.
            <br />
            <span className="text-[#f8f9fa]">Connected expertise.</span>
          </h2>
          <div className="max-[767px]:mt-8">
            <h3 className="text-[31px] mb-[22px] max-[767px]:text-[28px] max-[767px]:mb-[18px]">
              Greenland Capital
            </h3>
            <p className="text-[#f8f9fa] text-[17px] leading-[1.85] max-[767px]:text-[16px]">
              A farmland marketplace connecting customer discovery, geospatial
              information, document review and the operational teams behind it.
              A shared business challenge, approached through design and
              engineering.
            </p>
            <p className="text-[13px] mt-5 text-[#f8f9fa]">
              <Link
                href="/work/greenland-capital"
                className="inline-flex items-center gap-2 text-[13px] text-brand bg-[#f8f9fa] border border-[#e2e8f0] rounded-full py-[7px] px-[14px] hover:bg-white"
              >
                Ongoing project <ArrowUpRight size={16} />
              </Link>
            </p>
          </div>
        </div>
        <div className="glc-ensemble mt-[70px] grid grid-cols-[1.18fr_0.82fr] gap-7 items-start max-[767px]:block max-[767px]:mt-[35px]">
          <div
            className="ensemble-web block min-w-0 col-start-1 row-start-1 row-end-3 max-[767px]:mb-[30px]"
          >
            <div className="relative overflow-hidden bg-brand rounded">
              <video
                poster="/work/optimized/greenland-capital.png"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto block rounded"
              >
                <source src="/work/optimized/greenland-capital-recording.mp4" type="video/mp4" />
              </video>
            </div>
            <span className="flex items-center justify-between gap-5 text-[17px] pt-[18px] max-[767px]:text-[16px]">
              The customer introduction{" "}
              <small className="shrink-0 text-right text-[#f8f9fa] text-[13px]">
                Website & experience
              </small>
            </span>
          </div>
          <div
            className="ensemble-app block min-w-0 max-[767px]:mb-[30px]"
          >
            <div className="relative overflow-hidden bg-brand rounded">
              <img
                src="/work/glc-mobile.webp"
                alt="Greenland Capital mobile application project presentation"
                width="1600"
                height="900"
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
            <span className="flex items-center justify-between gap-5 text-[17px] pt-[18px] max-[767px]:text-[16px]">
              The experience on the move{" "}
              <small className="shrink-0 text-right text-[#f8f9fa] text-[13px]">
                Mobile application
              </small>
            </span>
          </div>
          <div
            className="ensemble-ops block min-w-0 max-[767px]:mb-[30px]"
          >
            <div className="relative overflow-hidden bg-brand rounded">
              <img
                src="/work/glc-admin.webp"
                alt="Greenland Capital administration platform project presentation"
                width="1600"
                height="900"
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
            <span className="flex items-center justify-between gap-5 text-[17px] pt-[18px] max-[767px]:text-[16px]">
              The business behind it{" "}
              <small className="shrink-0 text-right text-[#f8f9fa] text-[13px]">
                Custom software
              </small>
            </span>
          </div>
          <Link
            href="/work"
            className="cta-button inline-flex items-center rounded-full bg-white text-brand border border-white col-start-1 row-start-2 self-end justify-self-start mb-[25px] max-[767px]:mb-0 max-[767px]:mt-1.5"
          >
            Explore more of our work <ArrowUpRight size={18} className="max-[767px]:w-[15px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
