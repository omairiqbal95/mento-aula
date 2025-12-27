import logo from "@/assets/images/logo.svg";
import type { FooterContent } from "@/types/consultant-agency/footer";

export const footerContent: FooterContent = {
  brand: {
    logo: logo,
    logoUrl: "/",
    description: "A top notch consultancy agency based in United Kingdom.",
    socialLinks: [
      {
        id: 1,
        platform: "linkedin",
        url: "#",
        icon: "fa-brands fa-linkedin-in"
      },
      {
        id: 2,
        platform: "twitter",
        url: "#",
        icon: "fa-brands fa-x-twitter"
      },
      {
        id: 3,
        platform: "facebook",
        url: "#",
        icon: "fa-brands fa-facebook-f"
      },
      {
        id: 4,
        platform: "instagram",
        url: "#",
        icon: "fa-brands fa-instagram"
      },
      {
        id: 5,
        platform: "discord",
        url: "#",
        icon: "fa-brands fa-discord"
      },
      {
        id: 6,
        platform: "telegram",
        url: "#",
        icon: "fa-solid fa-paper-plane"
      }
    ]
  },
  navigation: [
    {
      id: 1,
      title: "Quick Links",
      delay: ".2",
      type: "links",
      links: [
        {
          id: 1,
          text: "Home",
          url: "/"
        },
        {
          id: 2,
          text: "About Us",
          url: "/about-us"
        },
        {
          id: 3,
          text: "Portfolio",
          url: "/portfolio"
        },
        {
          id: 4,
          text: "Blog",
          url: "/blog"
        },
        {
          id: 5,
          text: "Contact",
          url: "/contact"
        }
      ]
    },
    {
      id: 2,
      title: "Services",
      delay: ".4",
      type: "links",
      links: [
        {
          id: 1,
          text: "Technology Solution",
          url: "/service-details"
        },
        {
          id: 2,
          text: "Operations Management",
          url: "/service-details"
        },
        {
          id: 3,
          text: "Financial Advisory",
          url: "/service-details"
        },
        {
          id: 4,
          text: "Strategic Consulting",
          url: "/service-details"
        }
      ]
    },
    {
      id: 3,
      title: "Legal",
      delay: ".6",
      type: "links",
      links: [
        {
          id: 1,
          text: "Terms and Conditions",
          url: "/terms"
        },
        {
          id: 2,
          text: "Privacy Policy",
          url: "/privacy-policy"
        },
        {
          id: 3,
          text: "FAQ",
          url: "/faq"
        }
      ]
    }
  ],
  newsletter: {
    title: "Newsletter",
    action: "/newsletter",
    method: "POST",
    emailPlaceholder: "Enter your email address",
    agreementText: "I agree to the",
    privacyPolicyUrl: "/privacy-policy"
  },
  contact: {
    phone: "+880 1234 567 891",
    phoneUrl: "tel:+8801234567891",
    address: "17 York Street London, United Kingdom W1W7AB"
  },
  copyright: {
    text: "Copyright",
    companyName: "Unikon",
    year: new Date().getFullYear()
  }
};