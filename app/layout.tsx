import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const geistSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UDHYAM REGISTRATION FORM",
  description: "For new enterprices",
  icons: {
    icon: "/favicon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} text-[#212529]  antialiased`}>
        {children}
      </body>
    </html>
  );
}
