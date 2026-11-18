import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gsaesthetic.online"),
  title: {
    default: "GS Aesthetic | Gulberg 2, Lahore",
    template: "%s | GS Aesthetic",
  },
  description:
    "Natural hairline design, FUE and FUT, and a short menu of skin treatments at 24-P, Gulberg 2, Lahore.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/media/logo-seal.png", type: "image/png" }],
    apple: "/media/logo-seal.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { practice } = getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: practice.name,
    url: "https://gsaesthetic.online",
    telephone: practice.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.addressLine,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  };

  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
