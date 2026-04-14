import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "ArshaEsports",
  description: "Future Competitive Esports Platform",
  manifest: "/manifest.json",
  openGraph: {
    title: "ArshaEsports",
    description: "Future Competitive Esports Platform",
    url: "https://arsha-website-six.vercel.app/",
    siteName: "ArshaEsports",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "ArshaEsports",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArshaEsports",
    description: "Future Competitive Esports Platform",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          suppressHydrationWarning
          className={cn(
              "h-full",
              "antialiased",
              geistSans.variable,
              geistMono.variable,
              inter.variable,
              bebasNeue.variable,
              dmSans.variable,
              "font-sans"
          )}
      >
      <body className="min-h-full flex flex-col">
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </ThemeProvider>
      </body>
      </html>
  );
}