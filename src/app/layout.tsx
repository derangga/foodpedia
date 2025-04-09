import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./_components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foodpedia",
  description: "Food recipe explorer",
  openGraph: {
    type: "website",
    title: "Foodpedia",
    description:
      "A web app food recipe that user can share recipe and ask AI to give food recipe suggestion",
    url: "https://foodpedia-orcin.vercel.app/",
    siteName: "Foodpedia",
    images: [
      {
        url: "https://pbs.twimg.com/media/GoD5RDXbwAMLVnD?format=jpg&name=4096x4096",
        width: 1200,
        height: 630,
        alt: "Foodpedia",
      },
    ],
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
