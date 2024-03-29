import { ToasterProvider } from "@/components/provider/ToasterProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouLearn",
  description: "Learn anything you want, anytime you want, anywhere you want.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="./icon.svg" type="image/svg" sizes="32x32" />
      </Head>

      <ClerkProvider publishableKey="pk_live_Y2xlcmsueW91bGVhcm4uYXBwJA">
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
