import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/components/LanguageProvider";
import { siteUrl } from "@/lib/site";
import { organization, pageMetadata, staticPages } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({ path: '/', ...staticPages['/'] }),
  applicationName: organization.name,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="site-top" className="min-h-full flex flex-col bg-surface">
        <StructuredData data={{ '@context': 'https://schema.org', ...organization }} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-neutral-900">Skip to main content</a>
        <LanguageProvider><div className="flex min-h-dvh flex-col">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div></LanguageProvider>
      </body>
    </html>
  );
}
