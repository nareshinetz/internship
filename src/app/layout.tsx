import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inetztech.com"),
  title: {
    default: "Inetz Technologies | Get Placement Ready",
    template: "%s | Inetz Technologies",
  },
  description: "Accelerate your tech career with expert-led training, real-world internships, and guaranteed placement support at Inetz Technologies.",
  keywords: ["Tech Training", "Internships", "Career Placement", "Full Stack Development", "Data Science", "Embedded Systems", "Inetz Technologies", "Chennai Training"],
  authors: [{ name: "Inetz Technologies" }],
  creator: "Inetz Technologies",
  publisher: "Inetz Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inetztech.com",
    siteName: "Inetz Technologies",
    title: "Inetz Technologies | Get Placement Ready",
    description: "Accelerate your tech career with expert-led training, real-world internships, and guaranteed placement support.",
    images: [
      {
        url: "/logo.png", // Fallback to logo if no OG image
        width: 1200,
        height: 630,
        alt: "Inetz Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inetz Technologies | Get Placement Ready",
    description: "Accelerate your tech career with expert-led training, real-world internships, and guaranteed placement support.",
    images: ["/logo.png"],
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
  alternates: {
    canonical: "https://inetztech.com",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" richColors />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Inetz Technologies",
                "url": "https://inetztech.com",
                "logo": "https://inetztech.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9840234475",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": "en"
                },
                "sameAs": [
                  "https://www.linkedin.com/company/inetztech",
                  "https://www.facebook.com/inetztech",
                  "https://www.instagram.com/inetztech",
                  "https://www.youtube.com/@inetztech"
                ]
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
