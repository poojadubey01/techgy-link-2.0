import type { ReactNode } from "react";
import { siteUrl, allowIndexing, phoneDisplay, email } from "../lib/site";
import "./globals.css";
import { EssenceMotion } from "@/app/components/layout/scroll-animations";
import { Header, Footer, Motion } from "@/app/components/layout/header-footer";
import { Chatbot } from "@/app/components/shared/chatbot";
import { WhatsAppButton } from "@/app/components/shared/whatsapp-button";
import { CallButton } from "@/app/components/shared/call-button";
import { BackToTopButton } from "@/app/components/shared/back-to-top-button";
import { ScrollToTop } from "@/app/components/layout/scroll-to-top";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechGy Link — Design, Technology & Growth Partner",
    template: "%s | TechGy Link",
  },
  description:
    "Your design, technology and growth partner. TechGy Link brings brand, product, engineering, marketing and visualisation expertise together around your next business ambition.",
  icons: { icon: "/source/icon.svg", apple: "/source/apple-icon.png" },
  robots: { index: allowIndexing, follow: allowIndexing },
  alternates: { canonical: "/" },
};
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechGy Link",
  url: siteUrl,
  logo: siteUrl + "/brand/logo.png",
  description:
    "Design, technology and growth partner bringing brand, product, engineering, marketing and visualisation expertise together.",
  telephone: phoneDisplay,
  email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  sameAs: ["https://in.linkedin.com/company/techgy-link"],
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <Chatbot />
        <CallButton />
        <BackToTopButton />
        <Motion />
        <EssenceMotion />
      </body>
    </html>
  );
}
