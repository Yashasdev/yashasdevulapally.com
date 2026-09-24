import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// Section labels only.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "I'm currently building Presence. Previously, I was the 3rd engineering hire at Fleetline, joined pre-revenue and owned large parts of the product as we grew to $2M+ ARR and got acquired by Optym. I play tennis, and I played the US Boys National Championships in Kalamazoo in 2025.";

export const metadata: Metadata = {
  title: "hriday narang",
  description: DESCRIPTION,
  openGraph: {
    title: "hriday narang",
    description: DESCRIPTION,
    type: "profile",
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
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
