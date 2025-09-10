import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PresentationNav from "@/components/presentation-nav";
import SectionSidebar from "@/components/section-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI requires Blockchain requires IPv6 - Technical Presentation",
  description: "Interactive presentation exploring the interdependent technologies shaping our digital future",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PresentationNav />
        <SectionSidebar />
        <main className="pt-16 min-h-screen lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
}
