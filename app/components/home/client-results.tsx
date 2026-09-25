export function ConnectedProof() {
  return (
    <section
      className="bg-[#111625] text-white overflow-hidden section-space"
      id="selected-work"
    >
      <div className="site-container mx-auto">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-x-[95px] items-end max-[1100px]:gap-[50px] max-[767px]:block">
          <p className="col-span-full mb-[30px] text-[#f8f9fa] text-[14px] max-[767px]:text-[12px] max-[767px]:mb-6">
            The thinking, made tangible
          </p>
          <h2>
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
            <p className="mt-5">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[13px] font-medium text-white">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Ongoing project
              </span>
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
        </div>
      </div>
    </section>
  );
}
