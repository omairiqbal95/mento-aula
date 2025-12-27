import Logo from "@/assets/images/logo-light.svg";

export const footerContent = {
  topSection: {
    logo: Logo,
    description:
      "We blend creativity, functionality, and sustainability to craft architectural marvels that stand the test of time.",
    location: {
      icon: "fa-solid fa-location-dot",
      address: "606 Austin Rapid, Paucekside 37997-3698",
    },
    quickLinks: {
      title: "Quick links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Projects", href: "/portfolio-masonry" },
        { name: "Blog", href: "/blog-standard" },
        { name: "Contact", href: "/contact" },
      ],
    },
    socialMedia: [
      { name: "LinkedIn", href: "#", icon: "fa-brands fa-linkedin-in" },
      { name: "Twitter", href: "#", icon: "fa-brands fa-x-twitter" },
      { name: "Facebook", href: "#", icon: "fa-brands fa-facebook-f" },
      { name: "Instagram", href: "#", icon: "fa-brands fa-instagram" },
      { name: "Discord", href: "#", icon: "fa-brands fa-discord" },
      { name: "Telegram", href: "#", icon: "fa-solid fa-paper-plane" },
    ],
    contactForm: {
      title: "Contact Us",
      fields: {
        firstName: {
          name: "f-name",
          id: "f-name",
          placeholder: "First Name",
          className: "f-name",
        },
        lastName: {
          name: "l-name",
          id: "l-name",
          placeholder: "Last Name",
          className: "l-name",
        },
        email: {
          name: "email",
          id: "email",
          placeholder: "Email Address",
          className: "email",
        },
      },
      submitButton: {
        text: "Submit",
        className:
          "common-btn common-btn__variation5 common-btn__variation5--extend2",
      },
    },
  },
  bottomSection: {
    leftSection: {
      copyright: "Copyright 2024 Unikon. Inc.",
      email: {
        address: "info@unikonagency.com",
        href: "mailto:info@unikonagency.com",
      },
    },
    rightSection: {
      legalPages: [
        { name: "Security", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
      ],
    },
  },
};
