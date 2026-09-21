const journeys = {
  "marketing-strategy": {
    title: "A useful strategy connects four decisions.",
    steps: [
      ["Audience", "Who needs this?"],
      ["Offer", "Why choose it?"],
      ["Channel", "Where do we meet?"],
      ["Measure", "What will we learn?"],
    ],
  },
  seo: {
    title: "From a real question to a useful answer.",
    steps: [
      ["Intent", "Understand the search"],
      ["Content", "Answer it clearly"],
      ["Structure", "Make the page accessible"],
      ["Action", "Offer the right next step"],
    ],
  },
  "performance-marketing": {
    title: "Every handoff deserves the same attention.",
    steps: [
      ["Message", "One relevant promise"],
      ["Campaign", "A defined audience"],
      ["Landing page", "Evidence for the offer"],
      ["Follow-up", "A qualified conversation"],
    ],
  },
  "social-media-content": {
    title: "Good content starts with something worth showing.",
    steps: [
      ["Source", "A real project or insight"],
      ["Story", "A useful point of view"],
      ["Format", "Made for the platform"],
      ["Response", "Listen and improve"],
    ],
  },
  "landing-pages": {
    title: "One campaign. One coherent journey.",
    steps: [
      ["Promise", "What brought them here?"],
      ["Proof", "Why should they believe?"],
      ["Enquiry", "What do we need to know?"],
      ["Next step", "What happens afterwards?"],
    ],
  },
  "sales-enablement": {
    title: "Keep the context. Continue the conversation.",
    steps: [
      ["Enquiry", "Capture the need"],
      ["Ownership", "Name the next person"],
      ["Follow-up", "Share relevant evidence"],
      ["Feedback", "Learn from the outcome"],
    ],
  },
};
export function MarketingFocus({ slug }: { slug: string }) {
  const j = journeys[slug as keyof typeof journeys];
  if (!j) return null;
  return (
    <section
      className="marketing-focus w-[min(1424px,calc(100%_-_112px))] mx-auto max-[1200px]:w-[calc(100%_-_64px)] max-[767px]:w-[calc(100%_-_40px)] mt-0 mb-5 bg-brand text-white p-[54px] rounded-md max-[767px]:py-8 max-[767px]:px-[25px] max-[767px]:mb-0"
      data-diagram
    >
      <div className="marketing-focus-head grid grid-cols-[1fr_2.6fr] gap-[70px] items-start mb-[52px] max-[767px]:block max-[767px]:mb-8">
        <p className="eyebrow text-[11px] text-[#f8f9fa] pt-[9px] max-[767px]:text-[10px] max-[767px]:p-0">
          How the pieces connect
        </p>
        <h2 className="text-[clamp(30px,3.5vw,55px)] tracking-[-0.045em] leading-[1.12] max-w-[760px] max-[767px]:text-[32px] max-[767px]:mt-[22px]">
          {j.title}
        </h2>
      </div>
      <ol className="marketing-path grid grid-cols-4 list-none p-0 m-0 gap-[25px] max-[767px]:grid-cols-2 max-[767px]:gap-y-[25px] max-[767px]:gap-x-[15px]">
        {j.steps.map(([t, d], i) => (
          <li
            key={t}
            className="border-t border-[#e2e8f070] pt-[23px] px-0 pb-0 max-[767px]:pt-[18px]"
          >
            <span className="text-[11px] text-[#f8f9fa]">0{i + 1}</span>
            <h4 className="text-[27px] mt-[18px] mx-0 mb-[13px] max-[767px]:text-[23px]">{t}</h4>
            <p className="text-[13px] text-[#f8f9fa] max-[767px]:text-[12px] max-[767px]:leading-[1.7]">
              {d}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
