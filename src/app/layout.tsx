import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CyberBackground from "@/components/canvas/CyberBackground";
import ChatbotWidget from "@/components/ai/ChatbotWidget";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "SISCLOUD TECHNOLOGY | Software a Medida, Inteligencia Artificial & SisCloud Enterprise",
  description:
    "Desarrollo de software web a la medida, aplicaciones móviles nativas e inteligencia artificial en tiempo récord (1 a 15 días). Implemente SisCloud Enterprise en servidor dedicado con $0 cobro por usuario adicional.",
  keywords: [
    "desarrollo de software a medida Colombia",
    "SisCloud Enterprise",
    "inteligencia artificial empresarial",
    "software B2B Bogotá Medellín Cali Barranquilla",
    "desarrollo de aplicaciones móviles Flutter React Native",
    "software ERP CRM sin cobro por usuario",
    "desarrollo de páginas web corporativas",
    "automatización de procesos empresariales IA",
  ],
  authors: [{ name: "SISCLOUD TECHNOLOGY", url: "https://www.pagwebs.com" }],
  creator: "SISCLOUD TECHNOLOGY",
  publisher: "SISCLOUD TECHNOLOGY",
  metadataBase: new URL("https://www.pagwebs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SISCLOUD TECHNOLOGY | Software Empresarial a Medida, IA & SisCloud Enterprise",
    description:
      "Plataformas web corporativas en 1 a 3 días, software y apps nativas en 1 a 2 semanas, SisCloud Enterprise en servidor dedicado en 3 a 7 días.",
    url: "https://www.pagwebs.com",
    siteName: "SISCLOUD TECHNOLOGY",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_software_ai.jpg",
        width: 1200,
        height: 630,
        alt: "SisCloud Technology Enterprise Architecture & AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SISCLOUD TECHNOLOGY | Software Empresarial a Medida & IA",
    description:
      "Desarrollo ágil de software e IA con soberanía absoluta de datos y $0 costo por usuario adicional.",
    images: [
      "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_software_ai.jpg",
    ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.pagwebs.com/#organization",
        name: "SISCLOUD TECHNOLOGY",
        url: "https://www.pagwebs.com",
        logo: "https://www.pagwebs.com/wp-content/uploads/2026/11/pagwebs_logo_horizontal_transparent_cropped.png",
        telephone: "+573006628344",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+573006628344",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English"],
          areaServed: ["CO", "US", "ES", "MX", "CL", "PE"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "Colombia",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.pagwebs.com/#website",
        url: "https://www.pagwebs.com",
        name: "SISCLOUD TECHNOLOGY",
        publisher: {
          "@id": "https://www.pagwebs.com/#organization",
        },
        inLanguage: "es-CO",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.pagwebs.com/#software",
        name: "SisCloud Enterprise",
        operatingSystem: "Linux Cloud Dedicated, Bare-Metal, Web",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "COP",
          description: "Servidor dedicado privado sin cobro por usuario adicional ($0 COP por asiento)",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "128",
        },
        provider: {
          "@id": "https://www.pagwebs.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className="font-sans bg-background text-foreground antialiased selection:bg-cyan-glow selection:text-black"
      >
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-glow focus:text-black focus:font-bold focus:rounded-lg focus:shadow-xl"
        >
          Saltar al contenido principal
        </a>

        <SmoothScrollProvider>
          <CyberBackground />
          <Navbar />
          <div id="main-content" className="relative z-10 flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
          <ChatbotWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
