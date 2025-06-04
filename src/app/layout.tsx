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
  },
  twitter: {
    site: "🥘 Foodpedia",
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
