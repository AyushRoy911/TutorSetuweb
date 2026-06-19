import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tutorsetu.in"),
  title: {
    default: "TutorSetu - Find Trusted Tutors Near You",
    template: "%s | TutorSetu",
  },
  description:
    "TutorSetu connects students, parents, tutors, and coaching institutes across India for verified home tuition, online classes, one-time sessions, and monthly learning.",
  keywords: [
    "TutorSetu",
    "home tuition",
    "online tutors India",
    "coaching institute leads",
    "verified tutors",
    "one-time tutor",
    "monthly tutor",
  ],
  openGraph: {
    title: "TutorSetu - Find Trusted Tutors Near You",
    description:
      "India's trusted platform for students, parents, tutors, and coaching institutes.",
    url: "https://tutorsetu.in",
    siteName: "TutorSetu",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorSetu - Find Trusted Tutors Near You",
    description:
      "Download TutorSetu to connect with verified tutors, coaching institutes, and flexible learning options.",
  },
  alternates: {
    canonical: "https://tutorsetu.in",
  },
  icons: {
    icon: "/tutorsetu-logo.png",
    apple: "/tutorsetu-logo.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} bg-background font-sans text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
