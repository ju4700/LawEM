import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-bengali",
});

export const metadata: Metadata = {
  title: "আইনজীবী ক্লায়েন্ট ব্যবস্থাপনা সিস্টেম | Lawyer Client Management System",
  description: "বাংলাদেশী আইনজীবীদের জন্য সম্পূর্ণ ক্লায়েন্ট ও মামলা ব্যবস্থাপনা সফটওয়্যার",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${notoSansBengali.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
