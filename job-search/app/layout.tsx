import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UIProvider } from "./providers";
import "./globals.css";
import { Header } from "@/components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Job Seekr",
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
      <body className={montserrat.className}>
        <UIProvider>
          <div className="flex flex-col">
            <div className="globe-background opacity-70 dark:opacity-50"></div>
            <Header />
            {children}
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
