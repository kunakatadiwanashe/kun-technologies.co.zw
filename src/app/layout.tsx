import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KunTechnologies Zimbabwe",
  description: "KunTech (Kun Technologies) is a Zimbabwean digital solutions company offering web development, UI/UX design, e-commerce, branding, IT support, and custom software.",
  keywords: "web development Zimbabwe, digital solutions Harare, IT support Zimbabwe, e-commerce Zimbabwe, UI/UX design, KunTech",
  authors: [{ name: "Kun Technologies" }],
  openGraph: {
    title: "KunTech - Smart Digital Solutions for Modern Businesses",
    description: "Premium digital solutions company in Zimbabwe. Web development, e-commerce, UI/UX design, branding, IT support, and custom software.",
    type: "website",
    locale: "en_ZW",
    alternateLocale: "en",
    siteName: "KunTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "KunTechnologies ",
    description: "Premium digital solutions in Zimbabwe.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <meta name="google-site-verification" content="XXXZxH9-_m4_jTcvqY099M5dBMo-7YVgNfAfqQrarTQ" />
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

