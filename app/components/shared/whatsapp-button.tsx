import { whatsappLink } from "@/lib/site";

const WhatsAppGlyph = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2.1c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.2-1.36a9.87 9.87 0 0 0 4.84 1.23h.01c5.46 0 9.9-4.44 9.9-9.9s-4.45-9.87-9.91-9.87zm5.8 14.02c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.12.07-1.82-.11a16.2 16.2 0 0 1-1.65-.6c-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.15.48.22.55.34.07.13.07.71-.17 1.4z" />
  </svg>
);

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(
        "Hello TechGy Link, I'd like to know more about your services.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-40 grid place-items-center h-14 w-14 max-[767px]:h-12 max-[767px]:w-12 rounded-full bg-[#25D366] text-white shadow-[0_18px_30px_#00000026] transition-transform hover:scale-105 right-5 bottom-5 max-[767px]:right-4 max-[767px]:bottom-4"
    >
      <WhatsAppGlyph />
    </a>
  );
}
