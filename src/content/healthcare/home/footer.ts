import logoLight from "@/assets/images/logo-light-large.svg";

export interface SocialLink {
  id: number;
  icon: string;
  url: string;
  label: string;
}

export interface NavLink {
  id: number;
  title: string;
  url: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: NavLink[];
}

export const footerContent = {
  logo: logoLight,
  description:
    "A modern healthcare. Our team of experienced healthcare professionals is here to support you on your journey to better health.",
  socialLinks: [
    { id: 1, icon: "fa-brands fa-linkedin-in", url: "#", label: "LinkedIn" },
    { id: 2, icon: "fa-brands fa-x-twitter", url: "#", label: "Twitter" },
    { id: 3, icon: "fa-brands fa-facebook-f", url: "#", label: "Facebook" },
    { id: 4, icon: "fa-brands fa-instagram", url: "#", label: "Instagram" },
    { id: 5, icon: "fa-brands fa-discord", url: "#", label: "Discord" },
    { id: 6, icon: "fa-solid fa-paper-plane", url: "#", label: "Telegram" },
  ],
  policyLinks: [
    { id: 1, title: "Privacy Policy", url: "#" },
    { id: 2, title: "Terms & Conditions", url: "#" },
  ],
  columns: [
    {
      id: 1,
      title: "Quick Links",
      links: [
        { id: 1, title: "Home", url: "/" },
        { id: 2, title: "About us", url: "/about-us" },
        { id: 3, title: "Our Services", url: "/service" },
        { id: 4, title: "Doctors", url: "/team" },
        { id: 5, title: "Blog", url: "/blog" },
        { id: 6, title: "Contact", url: "/contact" },
      ],
    },
    {
      id: 2,
      title: "Departments",
      links: [
        { id: 1, title: "Primary Care", url: "#" },
        { id: 2, title: "Specialized Medical Care", url: "#" },
        { id: 3, title: "Emergency Care", url: "#" },
        { id: 4, title: "Diagnostic", url: "#" },
        { id: 5, title: "Preventive Care", url: "#" },
        { id: 6, title: "Rehabilitation", url: "#" },
      ],
    },
  ],
  newsletter: {
    title: "Newsletter Signup",
    placeholder: "Enter your email address",
    agreementText: "I agree to the",
    privacyLinkText: "privacy policy",
    privacyLinkUrl: "#",
  },
  contact: {
    phone: "+880 1234 567 891",
    phoneUrl: "tel:+8801234567891",
    address: "17 York Street London, United Kingdom W1W7AB",
  },
  copyright: "Copyright 2024 Unikon. Inc.",
};
