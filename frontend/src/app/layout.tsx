import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DashDrive — Where Speed Meets Convenience",
  description:
    "Book rides, pre-book trips, and access emergency transport with DashDrive — India's smartest, safest, and most affordable ride-hailing platform.",
  keywords: "ride booking, taxi, bike ride, EV, auto, DashDrive, cab booking, No Pin No Pay",
  authors: [{ name: "DashDrive" }],
  openGraph: {
    title: "DashDrive — Where Speed Meets Convenience",
    description: "India's most trusted ride-hailing platform with real-time tracking, pre-booking, and emergency services.",
    type: "website",
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
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-light-bg text-text-dark overflow-x-hidden w-full relative">
        {children}
      </body>
    </html>
  );
}
