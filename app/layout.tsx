import type { ReactNode } from "react";
import { siteUrl, allowIndexing } from "../lib/site";
import "./globals.css";
import { EssenceMotion } from "@/app/components/layout/scroll-animations";
import { Header, Footer, Motion } from "@/app/components/layout/header-footer";
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
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <Motion />
        <EssenceMotion />
      </body>
    </html>
  );
}
