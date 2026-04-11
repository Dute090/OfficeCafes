import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const BASE_URL = "https://perchspaceco.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Perch — Find Work-Friendly Cafés Near You",
    template: "%s | Perch",
  },
  description:
    "Discover the best cafés to work from. Filter by WiFi speed, outlets, noise level, and more — powered by real reviews.",
  keywords: [
    "work from cafe",
    "work friendly cafe",
    "cafe with wifi",
    "cafe with outlets",
    "remote work cafe",
    "coffee shop to work",
    "best cafe to work",
    "digital nomad cafe",
    "cafe near me",
    "coworking cafe",
  ],
  authors: [{ name: "Perch" }],
  creator: "Perch",
  publisher: "Perch",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Perch",
    title: "Perch — Find Work-Friendly Cafés Near You",
    description:
      "Discover the best cafés to work from. Filter by WiFi speed, outlets, noise level, and more — powered by real reviews.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Perch — Work-friendly cafés near you",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perch — Find Work-Friendly Cafés Near You",
    description:
      "Discover the best cafés to work from. Filter by WiFi speed, outlets, noise level, and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
