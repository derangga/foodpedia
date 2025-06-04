import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🍳 Foodpedia",
  description:
    "A social food recipe application that you can share an experience of cooking or ask AI to give you suggestion for food recipe",
  openGraph: {
    title: "🍳 Foodpedia",
    siteName: "🥘 Foodpedia",
    description:
      "A social food recipe application that you can share an experience of cooking or ask AI to give you suggestion for food recipe",
    url: "https://foodpedia-orcin.vercel.app/",
    images: [
      {
        url: "https://pbs.twimg.com/media/GskuMrIasAcWfnD?format=jpg&name=small",
      },
    ],
  },
  twitter: {
    site: "🥘 Foodpedia",
    images: "https://pbs.twimg.com/media/GskuMrIasAcWfnD?format=jpg&name=small",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
