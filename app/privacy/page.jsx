export const metadata = {
  title: "Website privacy",
  description:
    "How project enquiry details are used on this TechGy Link website.",
};
export default function Privacy() {
  return (
    <main id="main">
      <section className="page-intro wrap">
        <p className="eyebrow">Website privacy</p>
        <h1>
          Your enquiry.
          <br />
          Handled with purpose.
        </h1>
        <p>This notice describes the enquiry flow on this website.</p>
      </section>
      <article className="article-body wrap">
        <section>
          <h2>What you share</h2>
          <p>
            The enquiry form asks for your name, email, phone, project details
            and selected service. Company, timing and budget are optional. When
            a link includes campaign source information, that context is
            included with the enquiry.
          </p>
        </section>
        <section>
          <h2>How it is used</h2>
          <p>
            Information is sent to TechGy Link’s existing enquiry service to
            review your requirements and respond. Sharing an enquiry does not
            subscribe you to a marketing mailing list.
          </p>
        </section>
        <section>
          <h2>External links</h2>
          <p>
            Opening an email draft uses your chosen email application. External
            websites, including LinkedIn, operate under their own privacy
            practices.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
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
