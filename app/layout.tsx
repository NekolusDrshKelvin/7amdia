import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "7AM Diamond - Mobile Legends Diamond Top-up Myanmar",
  description:
    "Fast and reliable Mobile Legends diamond top-up service in Myanmar. Instant delivery with KPAY and WAVEPAY support. Best prices guaranteed!",
  keywords: "Mobile Legends, diamond top-up, Myanmar, MLBB, gaming, KPAY, WAVEPAY, 7AM Diamond",
  authors: [{ name: "7AM Diamond Team" }],
  creator: "7AM Diamond",
  publisher: "7AM Diamond",
  metadataBase: new URL("https://7amdiamond.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "7AM Diamond - Mobile Legends Diamond Top-up Myanmar",
    description: "Fast and reliable Mobile Legends diamond top-up service in Myanmar",
    url: "https://7amdiamond.com",
    siteName: "7AM Diamond",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "7AM Diamond - Mobile Legends Top-up",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7AM Diamond - Mobile Legends Diamond Top-up Myanmar",
    description: "Fast and reliable Mobile Legends diamond top-up service in Myanmar",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
