import logoFit from "@/assets/images/logo-fit.svg";
import { FooterContent } from "@/types/fitness/footer";

export const footerContent: FooterContent = {
  logo: logoFit,
  description: "Transform your fitness journey with our personalized training programs, expert guidance, and supportive community.",
  contact: {
    phone: "+880 1234 567 891",
    phoneUrl: "tel:+8801234567891"
  },
  navigation: [
    {
      id: 1,
      links: [
        { name: "Home", href: "/index" },
        { name: "About us", href: "/about-us" },
        { name: "Our Services", href: "/service" },
        { name: "Blog", href: "/blog-2" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      id: 2,
      links: [
        { name: "Help Center", href: "/contact" },
        { name: "Login & Account", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms and COnditions", href: "#" },
        { name: "Refund Policy", href: "#" }
      ]
    },
    {
      id: 3,
      links: [
        { name: "Facebook", href: "#" },
        { name: "X", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Telegram", href: "#" }
      ]
    }
  ],
  copyright: {
    text: "Copyright",
    year: 2024,
    companyName: "Unikon"
  },
  address: "17 York Street London, United Kingdom W1W7AB"
};
