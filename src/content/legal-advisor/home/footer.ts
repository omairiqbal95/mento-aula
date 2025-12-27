import logoLight from "@/assets/images/logo-light.svg";
import { FooterContent } from "@/types/legal-advisor/footer";

export const footerContent: FooterContent = {
  brand: {
    logo: logoLight,
    logoAlt: "logo",
    description: "Expert legal advice at your fingertips. We provide comprehensive legal services across various practice areas.",
    socialLinks: [
      {
        href: "#",
        icon: "fa-brands fa-linkedin-in",
        label: "LinkedIn"
      },
      {
        href: "#",
        icon: "fa-brands fa-x-twitter",
        label: "Twitter"
      },
      {
        href: "#",
        icon: "fa-brands fa-facebook-f",
        label: "Facebook"
      },
      {
        href: "#",
        icon: "fa-brands fa-instagram",
        label: "Instagram"
      },
      {
        href: "#",
        icon: "fa-brands fa-discord",
        label: "Discord"
      },
      {
        href: "#",
        icon: "fa-solid fa-paper-plane",
        label: "Telegram"
      }
    ]
  },
  sections: [
    {
      title: "Services",
      links: [
        {
          href: "/service-details",
          text: "Legal Consultation"
        },
        {
          href: "/service-details",
          text: "Real Estate Law"
        },
        {
          href: "/service-details",
          text: "Tax Law"
        },
        {
          href: "/service-details",
          text: "Corporate Law"
        },
        {
          href: "/service-details",
          text: "Family Law"
        }
      ]
    },
    {
      title: "Quick Links",
      links: [
        {
          href: "/about",
          text: "About Us"
        },
        {
          href: "#",
          text: "Privacy Policy"
        },
        {
          href: "/portfolio-masonry",
          text: "Portfolio"
        },
        {
          href: "/blog-standard",
          text: "Blog"
        },
        {
          href: "/contact",
          text: "Help Centre"
        }
      ]
    }
  ],
  contactSection: {
    title: "Get in touch",
    contacts: [
      {
        icon: "bi bi-geo-alt",
        href: "#",
        text: "123 Legal Street, Suite 41 City, State, 67321"
      },
      {
        icon: "bi bi-telephone",
        href: "tel:+628548944722",
        text: "+62 854 8944 722"
      },
      {
        icon: "bi bi-envelope",
        href: "mailto:unikoagency@gmail.com",
        text: "unikoagency@gmail.com"
      }
    ]
  },
  bottomLinks: [
    {
      href: "#",
      text: "Security"
    },
    {
      href: "#",
      text: "Privacy Policy"
    },
    {
      href: "#",
      text: "Terms & Conditions"
    }
  ],
  currentYear: new Date().getFullYear()
};
