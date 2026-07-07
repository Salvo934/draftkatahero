import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { SLOT_COUNT } from "@/lib/draft-config";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DraftKataHero — Il Draft della Domenica",
  description:
    `Ogni domenica sera alle 21:00: ${SLOT_COUNT} slot, rivelazione una alla volta. Il draft settimanale KataHero.`,
  openGraph: {
    title: "DraftKataHero",
    description: `${SLOT_COUNT} slot. Ogni domenica. Una card dopo l'intro di ogni pick.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${syne.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-black font-sans text-zinc-100">{children}</body>
    </html>
  );
}
