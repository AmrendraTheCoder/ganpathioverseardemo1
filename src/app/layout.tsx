import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";
import PageTransitionProvider from "../components/page-transition-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ganpathi Overseas - Premium Printing Services",
  description:
    "Professional printing services in Lucknow. Offset printing, digital printing, UV printing, and more with 25+ years of experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PageTransitionProvider>
              <main className="min-h-screen flex flex-col">{children}</main>
            </PageTransitionProvider>
          </ErrorBoundary>
          <TempoInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
