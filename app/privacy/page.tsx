export const metadata = {
  title: "Website privacy",
  description:
    "How project enquiry details are used on this TechGy Link website.",
  alternates: { canonical: "/privacy/" },
};

const sections = [
  {
    id: "what-you-share",
    title: "What you share",
    body: "The enquiry form asks for your name, email, phone, project details and selected service. Company, timing and budget are optional. When a link includes campaign source information, that context is included with the enquiry.",
  },
  {
    id: "how-it-is-used",
    title: "How it is used",
    body: "Information is sent to TechGy Link’s existing enquiry service to review your requirements and respond. Sharing an enquiry does not subscribe you to a marketing mailing list.",
  },
  {
    id: "external-links",
    title: "External links",
    body: "Opening an email draft uses your chosen email application. External websites, including LinkedIn, operate under their own privacy practices.",
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: "Share only information needed for the initial conversation. Please do not include passwords, confidential customer records or sensitive project data.",
    note: true,
  },
];

export default function Privacy() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto section-space pb-0">
        <p className="eyebrow text-brand">Website privacy</p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          Your enquiry.
          <br />
          Handled with purpose.
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          This notice describes the enquiry flow on this website: what we
          ask for, why, and the choices you have.
        </p>
        <p className="text-[13px] text-[#000000]/55 mt-[18px] tracking-[0.02em]">
          Last reviewed October 2026
        </p>
        <nav
          aria-label="Jump to section"
          className="flex flex-wrap gap-3 mt-[40px] max-[767px]:mt-[28px]"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={"#" + s.id}
              className="rounded-full border border-[#00000026] px-5 py-2.5 text-[13px] text-[#000000] hover:border-brand hover:text-brand transition-colors max-[767px]:px-4 max-[767px]:py-2"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </section>
      <article className="site-container mx-auto pt-[70px] pb-[110px] max-[767px]:pt-[50px] max-[767px]:pb-[70px]">
        <div className="grid grid-cols-2 gap-x-[65px] gap-y-[55px] max-[1023px]:gap-x-10 max-[767px]:grid-cols-1 max-[767px]:gap-y-[40px]">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="reveal border-t border-t-rule pt-[24px] scroll-mt-[100px]"
            >
              <span className="text-[14px] text-brand">0{i + 1}</span>
              <h2 className="text-[30px] mt-[20px] mb-[18px] font-normal leading-[1.2] max-[767px]:text-[27px]">
                {s.title}
              </h2>
              <p className="text-[17px] leading-[1.9] text-[#000000] max-[767px]:text-[16px] max-[767px]:leading-[1.85]">
                {s.body}
              </p>
              {s.note && (
                <p className="text-[17px] leading-[1.9] text-[#000000] max-[767px]:text-[16px] max-[767px]:leading-[1.85] mt-5">
                  For a question about your enquiry, or a request to update
                  or delete it, contact{" "}
                  <a className="text-brand underline underline-offset-4" href="mailto:sales@techgylink.com">
                    sales@techgylink.com
                  </a>
                  .
                </p>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
