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
const title = {
  default: "TechGy Link — Design, Technology & Growth Partner",
  template: "%s | TechGy Link",
};
const description =
  "Your design, technology and growth partner. TechGy Link brings brand, product, engineering, marketing and visualisation expertise together around your next business ambition.";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/source/icon.svg", apple: "/source/apple-icon.png" },
  manifest: "/manifest.webmanifest",
  robots: { index: allowIndexing, follow: allowIndexing },
  alternates: { canonical: "/" },
  openGraph: {
    title: title.default,
    description,
    url: siteUrl,
    siteName: "TechGy Link",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
  },
};
export const viewport = {
  themeColor: "#0022ff",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCQ3T6JZ');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCQ3T6JZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
