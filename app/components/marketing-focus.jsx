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
export function MarketingFocus({ slug }) {
  const j = journeys[slug];
  if (!j) return null;
  return (
    <section className="marketing-focus wrap" data-diagram>
      <div className="marketing-focus-head">
        <p className="eyebrow">How the pieces connect</p>
        <h2>{j.title}</h2>
      </div>
      <ol className="marketing-path">
        {j.steps.map(([t, d], i) => (
          <li key={t}>
            <span>0{i + 1}</span>
            <h4>{t}</h4>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
