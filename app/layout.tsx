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
  "I’m currently nerding out over ML for the physical world, especially VLAs for robot learning. On the side, I’m working on Presence, where we build custom agent harnesses for service businesses. Previously, I was the 3rd engineering hire at Fleetline (YC S25), joined pre-revenue and owned large parts of the product as we grew to $2M+ ARR and got acquired by Optym. I played tennis competitively growing up, including the US Boys National Championships in Kalamazoo in 2025. These days I just play for fun.";

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
