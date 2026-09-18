import { ContactForm } from "../components/contact-form";
import { Arrow } from "../components/connected";
export const metadata = {
  title: "Discuss your project",
  description:
    "Tell TechGy Link what you want to build or improve. Connect with our design, technology and growth team in Hyderabad.",
};
export default function Contact() {
  return (
    <main id="main" className="contact-page wrap">
      <div className="contact-copy">
        <p className="eyebrow">Every good partnership starts here</p>
        <h1>
          What’s your
          <br />
          <span className="blue-text">next chapter?</span>
        </h1>
        <p>
          A new identity. A better website. A connected workflow. A place
          brought to life. Tell us what you have in mind.
        </p>
        <div className="contact-direct">
          <p className="eyebrow">Prefer a conversation?</p>
          <a href="mailto:sales@techgylink.com">
            sales@techgylink.com <Arrow />
          </a>
          <a href="tel:+919100043542">+91 91000 43542</a>
        </div>
        <div className="contact-location">
          <p>Hyderabad, India</p>
          <p>Monday–Friday · 10am–7pm IST</p>
        </div>
        <div style={{ marginTop: 45 }}>
          <p className="eyebrow">What happens next</p>
          <ul className="outcomes">
            <li>We review your brief and the relevant expertise.</li>
            <li>We clarify goals, scope and dependencies.</li>
            <li>We agree a useful first engagement.</li>
          </ul>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
