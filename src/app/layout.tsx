import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Background } from "@/components/Background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Minecom - The Future of UGC Marketing",
  description:
    "Premium digital marketing agency specializing in Minecraft, Roblox, and UGC game growth. 200,000+ AI-generated videos per month. Influencer campaigns, viral content, and data-driven growth.",
  keywords: [
    "Minecraft marketing",
    "Minecraft server advertising",
    "UGC game marketing",
    "Roblox marketing agency",
    "gaming influencer marketing",
    "Minecraft server growth",
    "AI video marketing",
    "game promotion agency",
  ],
  openGraph: {
    title: "Minecom - The Future of UGC Marketing",
    description:
      "200,000+ AI-generated videos per month. The scale-focused marketing agency for Minecraft servers and UGC games.",
    type: "website",
    siteName: "Minecom",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minecom - The Future of UGC Marketing",
    description:
      "200,000+ AI-generated videos per month. The scale-focused marketing agency for Minecraft servers and UGC games.",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Minecom",
              description:
                "Premium digital marketing agency specializing in Minecraft, Roblox, and UGC game growth with proprietary AI video editing at 200k videos/month scale.",
              serviceType: "Digital Marketing",
              areaServed: "Worldwide",
              knowsAbout: [
                "Minecraft Server Marketing",
                "UGC Game Growth",
                "AI Video Production",
                "Influencer Marketing",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Background />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
