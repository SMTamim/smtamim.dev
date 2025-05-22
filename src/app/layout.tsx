import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import CommonProviders from "./commonProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S M Tamim Mahmud",
  description: "A senior web and application developer with more than 6 years of experience!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CommonProviders>
          {children}
        </CommonProviders>
        <Toaster />

      </body>
    </html>
  );
}