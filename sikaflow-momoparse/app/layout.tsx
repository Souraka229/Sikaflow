import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { SupabaseBrowserProvider } from "@/components/supabase/supabase-browser-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sika FLOW",
    template: "%s · Sika FLOW",
  },
  description:
    "Analytics et API Mobile Money — MTN, Moov, Celtiis. Design clair, accent citron #DFFF00.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sika FLOW",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icons/icon-192.svg", type: "image/svg+xml", sizes: "192x192" }],
    apple: [{ url: "/icons/icon-192.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dfff00" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SupabaseBrowserProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </SupabaseBrowserProvider>
      </body>
    </html>
  );
}
