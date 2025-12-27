import type { Metadata } from "next";
import getBaseUrl from "@/lib/getBaseUrl";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { DM_Sans, Instrument_Sans, Poppins, Metal } from "next/font/google";
import CursorCustom from "@/components/common/CursorCustom";
import GoToTop from "@/components/common/GoToTop";
import AnimationProvider from "@/providers/AnimationProvider";
import "../lib/fontawesome";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../lib/fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Custom SCSS styles
import "../scss/style.scss";
// SEO Component
import SEOJsonLd from "@/components/seo/SEOJsonLd";

// metadata for SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "Unikon - Multipurpose Agency NextJS Template",
  description: "A modern and responsive template for your agency needs.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Unikon",
    "React",
    "Next.js",
    "Template",
    "Agency",
    "Multipurpose",
    "Responsive",
    "Modern",
    "portfolio",
    "blog",
    "marketing",
  ],
  authors: [
    { 
      name: process.env.NEXT_PUBLIC_AUTHOR_NAME, 
      url: process.env.NEXT_PUBLIC_AUTHOR_URL 
    },
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/marketing-agency`,
  },
  creator: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  openGraph: {
    title: "Unikon - Multipurpose Agency HTML Template",
    description: "A modern and responsive template for your agency needs.",
    url: "/",
    siteName: "Unikon",
    images: [
      {
        url: new URL("og-image.jpg", getBaseUrl()).href,
        width: 1200,
        height: 630,
        alt: "Unikon Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    title: "Unikon - Multipurpose Agency HTML Template",
    description: "A modern and responsive template for your agency needs.",
    images: [new URL("og-image.jpg", getBaseUrl()).href],
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

const ranade = localFont({
  src: [
    {
      path: "../assets/fonts/Ranade/Ranade-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-ThinItalic.woff",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/Ranade/Ranade-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--ff-ranade",
  display: "swap",
  fallback: ["sans-serif"],
});

// Google Fonts configuration
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--ff-dm-sans",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--ff-instrument-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--ff-poppins",
  display: "swap",
});

const metal = Metal({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-metal",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = getBaseUrl();
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Unikon",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Unikon",
    url: siteUrl,
  };

  return (
    <html
      lang="en"
      className={`${ranade.variable} ${dmSans.variable} ${instrumentSans.variable} ${poppins.variable} ${metal.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SEOJsonLd data={org} />
        <SEOJsonLd data={website} />
        <CursorCustom />
        <AnimationProvider>{children}</AnimationProvider>
        <Toaster />
        <GoToTop />
      </body>
    </html>
  );
}
