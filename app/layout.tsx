import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { InteractionLayer } from "@/components/interaction-layer";
import { WandTrail } from "@/components/wand-trail";
import { profile } from "@/lib/content";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const editorial = DM_Serif_Display({
  variable: "--font-editorial",
  weight: "400",
  subsets: ["latin"],
});

const DESCRIPTION =
  "The personal website of Yashas Devulapally—a biomedical engineering student, builder, competitor, creator, and relentlessly curious person.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yashasdevulapally.com"),
  title: "Yashas Devulapally — Biomedical Engineering at Georgia Tech",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yashas Devulapally — Biomedical Engineering at Georgia Tech",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${editorial.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <InteractionLayer />
        <WandTrail />
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <span>Yashas Devulapally · Ohio → Atlanta</span>
          <div>
            <a href="mailto:ydevulapally3@gatech.edu">Email ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
          <small>A little surprise: type “yashas”.</small>
        </footer>
      </body>
    </html>
  );
}
