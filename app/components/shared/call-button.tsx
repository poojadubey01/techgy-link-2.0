import { Phone } from "@/app/components/ui/icons";
import { phoneDisplay, phoneHref } from "@/lib/site";

export function CallButton() {
  return (
    <a
      href={phoneHref}
      aria-label={`Call TechGy Link on ${phoneDisplay}`}
      title={phoneDisplay}
      className="fixed z-40 grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full border border-rule bg-white text-brand shadow-[0_18px_30px_#00000026] transition-transform hover:scale-105 right-5 bottom-41 max-[767px]:right-4 max-[767px]:bottom-34"
    >
      <Phone size={24} strokeWidth={1.8} />
    </a>
  );
}
