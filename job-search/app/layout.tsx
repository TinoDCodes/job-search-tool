import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Discover",
  description:
    "A job search tool for discovering jobs in your field of interest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className + " max-w-screen-2xl mx-auto"}>
        <header className="h-full w-full flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            height="0"
            width="0"
            sizes="100vw"
            className="h-20 w-80"
          />
        </header>
        <main className="h-full w-full overflow-y-hidden">{children}</main>
      </body>
    </html>
  );
}
