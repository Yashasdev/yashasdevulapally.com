import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const editorial = DM_Serif_Display({
  variable: "--font-editorial",
  weight: "400",
  subsets: ["latin"],
});

const DESCRIPTION =
  "The personal website of Yashas Devulapally—a biomedical engineering student, builder, competitor, creator, and relentlessly curious person.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yashasdevulapally.com"),
  title: "Yashas Devulapally — Builder, student, and many other things",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hey, I’m Yashas. I like making things happen.",
    description: DESCRIPTION,
    url: "/",
    siteName: "Yashas Devulapally",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashas Devulapally",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${editorial.variable}`}>
      <body>{children}</body>
    </html>
  );
}
