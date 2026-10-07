import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ConstructionIntro } from "@/components/ConstructionIntro";
import { LanguageProvider } from "@/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahal Foret Hayat | Construction Material Solutions",
  description: "Mahal Foret Hayat provides construction materials, technical guidance, and bulk quote support for projects in need of reliable building solutions.",
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
        <LanguageProvider><ConstructionIntro>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ConstructionIntro></LanguageProvider>
      </body>
    </html>
  );
}
