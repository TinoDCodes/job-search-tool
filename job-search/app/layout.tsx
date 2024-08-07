import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

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
    <html lang="en" className="custom-light">
      <body className={openSans.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
