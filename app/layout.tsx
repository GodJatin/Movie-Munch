import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Use localhost URL for development
  title: "Movie Munch",
  description: "All ott at one platform",
  openGraph: {
    title: "Movie Munch",
    description: "All ott at one platform",
    images: [
      {
        url: "/images/Raiden.jpg", // Corrected path to your image
        width: 800,
        height: 600,
        alt: "Movie Munch Logo",
      },
    ],
  },
  icons: {
    icon: "/mm.ico", // Path to your favicon
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
      </body>
    </html>
  );
}
