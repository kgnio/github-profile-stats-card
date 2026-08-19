import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kgnio-profile-card.vercel.app"),

  title: {
    default: "GitHub Profile Stats Card Generator",
    template: "%s | GitHub Profile Stats Card",
  },

  description:
    "Generate customizable GitHub profile stats cards for your GitHub Profile README. Choose a theme and embed a dynamic SVG card with one line of Markdown.",

  keywords: [
    "GitHub profile",
    "GitHub profile README",
    "GitHub stats",
    "GitHub stats card",
    "GitHub profile stats",
    "GitHub README",
    "GitHub README generator",
    "GitHub README widget",
    "GitHub profile card",
    "GitHub badges",
    "developer profile",
    "developer portfolio",
    "README stats",
    "SVG profile card",
  ],

  authors: [
    {
      name: "kgnio",
      url: "https://github.com/kgnio",
    },
  ],

  creator: "kgnio",
  publisher: "kgnio",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://kgnio-profile-card.vercel.app",
    title: "GitHub Profile Stats Card Generator",
    description:
      "Create customizable GitHub profile stats cards and embed them directly into your GitHub Profile README.",
    siteName: "GitHub Profile Stats Card",
  },

  twitter: {
    card: "summary_large_image",
    title: "GitHub Profile Stats Card Generator",
    description:
      "Generate customizable GitHub stats cards for your GitHub Profile README.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}