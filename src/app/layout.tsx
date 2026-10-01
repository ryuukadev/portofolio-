import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { WelcomeOverlay } from "@/components/ui/WelcomeOverlay";
import { LanguageProvider } from "@/lib/i18n/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Dewahyu",
  description:
    "Portofolio pribadi I Kadek Wahyu Arta Pratama — Siswa RPL (Kelas 11). Frontend Developer & UI/UX Enthusiast dari Bali, Indonesia.",
  keywords: [
    "portfolio",
    "web developer",
    "UI UX",
    "RPL",
    "Klungkung",
    "Bali",
    "Indonesia",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "I Kadek Wahyu Arta Pratama" }],
  openGraph: {
    title: "Portofolio Dewahyu",
    description:
      "Portofolio pribadi — Siswa RPL Kelas 11. Frontend Developer & UI/UX Enthusiast dari Bali.",
    url: "https://ikadek-wahyu-pratama.dev",
    siteName: "Portofolio Dewahyu",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            {children}
            <WelcomeOverlay />
            <Toaster richColors closeButton position="bottom-right" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
