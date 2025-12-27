import LogoLight from "@/assets/images/logo-light.svg";

export const footerDefaultContent = {
  topSection: {
    title: "Let's create something great!",
    description:
      "Ready to elevate your brand? Contact us today to start your journey towards digital excellence",
    buttons: {
      primary: {
        text: "Get Started",
        href: "/contact",
      },
      secondary: {
        text: "Schedule Meet",
        href: "/contact",
      },
    },
  },
  bodySection: {
    logo: LogoLight,
    description: "A multidisciplinary digital agency based in United Kingdom.",
    navigation: {
      services: {
        title: "Services",
        links: [
          { name: "Branding", href: "/service-details" },
          { name: "Product Design", href: "/service-details" },
          { name: "Development", href: "/service-details" },
          { name: "Digital Marketing", href: "/service-details" },
          { name: "Motion Graphics", href: "/service-details" },
        ],
      },
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
          { name: "Portfolio", href: "/portfolio" },
          { name: "Blog", href: "/blog" },
          { name: "Contact", href: "/contact" },
        ],
      },
      socialMedia: {
        title: "Follow Us",
        links: [
          { name: "Facebook", href: "#" },
          { name: "Twitter", href: "#" },
          { name: "Instagram", href: "#" },
          { name: "LinkedIn", href: "#" },
          { name: "Dribbble", href: "#" },
        ],
      },
      contactInfo: {
        title: "Contact Us",
        links: [
          { name: "hello@unikon.com", href: "mailto:hello@unikon.com" },
          { name: "+(405) 123-456", href: "tel:+405123456" },
        ],
      },
    },
  },
  bottomSection: {
    copyright: "Copyright {year} Unikon. Inc.",
    location: "17 York Street London, United Kingdom W1W7AB",
  },
};
