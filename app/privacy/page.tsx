export const metadata = {
  title: "Website privacy",
  description:
    "How project enquiry details are used on this TechGy Link website.",
};
export default function Privacy() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto pt-[75px] pb-[70px] max-[767px]:pt-[50px] max-[767px]:pb-[45px]">
        <p className="eyebrow text-brand">
          Website privacy
        </p>
        <h1 className="mt-[26px] max-w-[1120px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          Your enquiry.
          <br />
          Handled with purpose.
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[770px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          This notice describes the enquiry flow on this website.
        </p>
      </section>
      <article className="site-container mx-auto max-w-[820px] pb-[110px] max-[767px]:pb-[70px]">
        <section className="mb-[45px]">
          <h2 className="text-[34px] mb-[25px] max-[767px]:text-[30px]">
            What you share
          </h2>
          <p className="text-[18px] leading-[1.95] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.9]">
            The enquiry form asks for your name, email, phone, project details
            and selected service. Company, timing and budget are optional. When
            a link includes campaign source information, that context is
            included with the enquiry.
          </p>
        </section>
        <section className="mb-[45px]">
          <h2 className="text-[34px] mb-[25px] max-[767px]:text-[30px]">
            How it is used
          </h2>
          <p className="text-[18px] leading-[1.95] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.9]">
            Information is sent to TechGy Link’s existing enquiry service to
            review your requirements and respond. Sharing an enquiry does not
            subscribe you to a marketing mailing list.
          </p>
        </section>
        <section className="mb-[45px]">
          <h2 className="text-[34px] mb-[25px] max-[767px]:text-[30px]">
            External links
          </h2>
          <p className="text-[18px] leading-[1.95] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.9]">
            Opening an email draft uses your chosen email application. External
            websites, including LinkedIn, operate under their own privacy
            practices.
          </p>
        </section>
        <section className="mb-[45px]">
          <h2 className="text-[34px] mb-[25px] max-[767px]:text-[30px]">
            Your choices
          </h2>
          <p className="text-[18px] leading-[1.95] text-[#000000] max-[767px]:text-[17px] max-[767px]:leading-[1.9]">
            Share only information needed for the initial conversation. Please
            do not include passwords, confidential customer records or sensitive
            project data. For a question about your enquiry or a request to
            update or delete it, contact{" "}
            <a href="mailto:sales@techgylink.com">sales@techgylink.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
