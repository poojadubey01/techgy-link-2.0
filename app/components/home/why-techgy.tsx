const rows = [
  {
    label: "Starting point",
    them: "Their product catalog",
    us: "Your actual problem",
  },
  {
    label: "Scope",
    them: "One slice, then hands you off",
    us: "Software, AI, and data under one roof",
  },
  {
    label: "Artificial Intelligence",
    them: "A buzzword on a slide",
    us: "AI models running in production, not slideware",
  },
  {
    label: "Specialty",
    them: "“We do everything”",
    us: "Architecting AI solutions most firms can't deliver",
  },
  {
    label: "Who you work with",
    them: "A support queue you wait in",
    us: "The people who build it",
  },
];

export function WhyTechGy() {
  return (
    <section className="site-container mx-auto py-[85px] border-b border-b-rule max-[1023px]:py-[70px] max-[767px]:py-[55px]">
      <p className="eyebrow text-brand">
        Why TechGy
      </p>
      <h2 className="mt-6 mb-[45px] max-[767px]:mt-5 max-[767px]:mb-8">
        Why teams pick us
        <br />
        over the <span className="text-brand">big names.</span>
      </h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-rule text-[12px] uppercase tracking-[0.085em] max-[767px]:hidden">
            <th scope="col" className="w-[26%] pb-4 font-medium text-[#000000]/50">
              <span className="sr-only">Comparison</span>
            </th>
            <th scope="col" className="w-[32%] pb-4 font-medium text-[#000000]/50">
              Generic IT vendor
            </th>
            <th scope="col" className="pb-4 font-medium text-brand">
              TechGy Link
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.label}
              className="border-b border-rule max-[767px]:grid max-[767px]:gap-2 max-[767px]:py-6"
            >
              <th
                scope="row"
                className="py-7 pr-6 align-top text-[13px] font-medium text-[#000000]/60 max-[767px]:p-0 max-[767px]:text-[12px] max-[767px]:uppercase max-[767px]:tracking-[0.085em]"
              >
                {r.label}
              </th>
              <td className="py-7 pr-6 align-top text-[17px] leading-[1.6] text-[#000000]/45 max-[767px]:p-0 max-[767px]:text-[15px]">
                <span className="sr-only">Generic IT vendor: </span>
                {r.them}
              </td>
              <td className="py-7 align-top text-[20px] leading-[1.5] tracking-[-0.01em] text-[#000000] max-[767px]:p-0 max-[767px]:text-[18px]">
                <span className="sr-only">TechGy Link: </span>
                {r.us}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
