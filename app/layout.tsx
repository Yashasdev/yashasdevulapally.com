import type { Metadata } from "next";
import { Caveat, Courier_Prime, Geist_Mono } from "next/font/google";
import "./globals.css";

// Just the tagline under the name — the one printed line that isn't the
// typewriter face.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The name, handwritten.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

// The sheet is a typed note, so everything that isn't handwritten is a
// typewriter face.
const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const DESCRIPTION =
  "Founding engineer at Fleetline, building optimization algorithms for trucking. Previously Cliqk and Clueoai. Computer science at Georgia Tech.";

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
      className={`${caveat.variable} ${courier.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
