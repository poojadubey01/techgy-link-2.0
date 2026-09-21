import { ContactForm } from "@/app/components/shared/contact-form";
import { Arrow } from "@/app/components/shared/common-blocks";
export const metadata = {
  title: "Discuss your project",
  description:
    "Tell TechGy Link what you want to build or improve. Connect with our design, technology and growth team in Hyderabad.",
};
export default function Contact() {
  return (
    <main
      id="main"
      className="w-[min(1424px,calc(100%_-_112px))] mx-auto grid grid-cols-[1fr_1fr] gap-[100px] pt-20 pb-[120px] max-[1023px]:gap-10 max-[767px]:grid-cols-1 max-[767px]:gap-[35px] max-[767px]:pt-[45px] max-[767px]:pb-[70px]"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand">
          Every good partnership starts here
        </p>
        <h1 className="text-[clamp(50px,5.6vw,86px)] my-[25px] mx-0 max-[767px]:text-[53px] max-[370px]:text-[46px]">
          What’s your
          <br />
          <span className="text-brand">next chapter?</span>
        </h1>
        <p className="text-[18px] leading-[1.8] text-[#000000] max-w-[450px] max-[767px]:text-[16px]">
          A new identity. A better website. A connected workflow. A place
          brought to life. Tell us what you have in mind.
        </p>
        <div className="mt-10 flex flex-col items-start gap-3.5">
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand">
            Prefer a conversation?
          </p>
          <a
            href="mailto:sales@techgylink.com"
            className="flex items-center gap-5 font-display text-[28px] tracking-[-0.03em] max-[767px]:text-[25px]"
          >
            sales@techgylink.com <Arrow />
          </a>
          <a href="tel:+919100043542" className="flex items-center gap-5">
            +91 91000 43542
          </a>
        </div>
        <div className="text-[#000000] text-[14px] mt-[30px]">
          <p>Hyderabad, India</p>
          <p>Monday–Friday · 10am–7pm IST</p>
        </div>
        <div style={{ marginTop: 45 }}>
          <p className="text-xs font-medium uppercase tracking-[0.105em] leading-[1.6] text-brand">
            What happens next
          </p>
          <ul className="my-8 mx-0 max-[767px]:my-[25px]">
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              We review your brief and the relevant expertise.
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              We clarify goals, scope and dependencies.
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand max-[767px]:text-[15px] max-[767px]:py-[15px]">
              We agree a useful first engagement.
            </li>
          </ul>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
