import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supplier Connect AI Layer",
  description: "Stride — Supplier Connect with AI overlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full">
      <body className="h-full antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
