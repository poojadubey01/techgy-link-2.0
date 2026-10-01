import { Phone } from "@/app/components/ui/icons";
import { Arrow } from "@/app/components/shared/common-blocks";
import Link from "@/app/components/ui/internal-link";
import { phoneDisplay, phoneHref, email } from "@/lib/site";

export const metadata = {
  title: "Thank you",
  description: "Your enquiry has been submitted to TechGy Link.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you/" },
};

export default function ThankYou() {
  return (
    <main id="main" className="bg-[#f8f9fa]">
      <section className="page-intro site-container mx-auto section-space">
        <p className="eyebrow text-brand">Thank you for your brief</p>
        <h1 className="mt-[26px] max-w-[900px] leading-[1.1] max-[767px]:text-[48px] max-[767px]:leading-[1.12] max-[767px]:mt-[22px]">
          Your next chapter
          <br />
          starts here.
        </h1>
        <p className="text-[20px] leading-[1.7] text-[#000000] max-w-[650px] mt-[30px] max-[767px]:text-[17px] max-[767px]:leading-[1.8] max-[767px]:mt-[25px]">
          Your brief has been submitted. We&apos;ll use the details you shared
          to continue the conversation.
        </p>
        <div className="flex flex-wrap items-center gap-6 mt-[35px] max-[767px]:gap-4 max-[767px]:mt-[27px]">
          <Link
            href="/"
            className="cta-button inline-flex items-center justify-center font-medium border border-transparent rounded-full bg-brand text-white hover:brightness-90"
          >
            Back to homepage <Arrow />
          </Link>
          <Link
            href="/work"
            className="cta-link inline-flex items-center font-medium text-brand"
          >
            See our work <Arrow />
          </Link>
        </div>
      </section>

      <section className="site-container mx-auto pb-[120px] max-[1023px]:pb-[90px] max-[767px]:pb-[70px] grid grid-cols-[1fr_1fr] gap-[100px] max-[767px]:grid-cols-[1fr] max-[767px]:gap-[30px]">
        <div>
          <p className="eyebrow text-brand">What happens next</p>
          <ul className="outcomes my-8 mx-0 max-[767px]:my-6">
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              We review your brief and the relevant expertise.
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              We clarify goals, scope and dependencies.
            </li>
            <li className="relative pt-[18px] pr-0 pb-[18px] pl-[25px] border-t border-t-rule border-b border-b-rule text-[16px] text-[#000000] before:content-['—'] before:absolute before:left-0 before:text-brand">
              We agree a useful first engagement.
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-brand">Prefer a conversation?</p>
          <div className="mt-8 flex flex-col items-start gap-3.5 max-[767px]:mt-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-5 text-[17px] leading-[1.75]"
            >
              {email} <Arrow />
            </a>
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-[16px] leading-[1.75]"
            >
              <Phone size={16} className="shrink-0" /> {phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
