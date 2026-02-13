import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import "./globals.css";

export const metadata: Metadata = {
  title: "DC CREATIVE",
  description: "Agencia de branding y marketing digital",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
