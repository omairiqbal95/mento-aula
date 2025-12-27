import LogoLight from "@/assets/images/logo.svg";

export const footerDefaultContent = {
  topSection: {
    title: "¡Formemos juntos a tu equipo!",
    description:
      "¿Listo para mejorar el rendimiento de tu empresa? Contacta con nosotros hoy para comenzar con la formación bonificada FUNDAE",
    buttons: {
      primary: {
        text: "Solicitar Información",
        href: "/contacto",
      },
      secondary: {
        text: "Conocer Plataforma",
        href: "/plataforma-elearning",
      },
    },
  },
  bodySection: {
    logo: LogoLight,
    description: "Especialistas en formación online para empresas con gestión integral FUNDAE.",
    navigation: {
      services: {
        title: "Servicios",
        links: [
          { name: "Formación Bonificada", href: "/formacion-bonificada" },
          { name: "Plataforma eLearning", href: "/plataforma-elearning" },
          { name: "Gestión FUNDAE", href: "/gestion-fundae" },
          { name: "Cursos Personalizados", href: "/formacion-personalizada" },
          { name: "Consultoría Formativa", href: "/consultoria" },
        ],
      },
      quickLinks: {
        title: "Enlaces Rápidos",
        links: [
          { name: "Inicio", href: "/" },
          { name: "Sobre Nosotros", href: "/sobre-mentoaula" },
          { name: "Catálogo de Cursos", href: "/catalogo-cursos" },
          { name: "Blog", href: "/blog" },
          { name: "Contacto", href: "/contacto" },
        ],
      },
      socialMedia: {
        title: "Síguenos",
        links: [
          { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100010522573686" },
          { name: "Twitter", href: "https://twitter.com/ahmed_sardar1?lang=es" },
          { name: "LinkedIn", href: "https://www.linkedin.com/in/ahmedsardar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
          { name: "Instagram", href: "https://www.instagram.com/ahmedsardar9/profilecard/?igsh=ZHAzbGRvZzJwdDA0" },
        ],
      },
      contactInfo: {
        title: "Contacto",
        links: [
          { name: "info@mentoaula.com", href: "mailto:info@mentoaula.com" },
          { name: "+34 933 930 435", href: "tel:+34933930435" },
        ],
      },
    },
  },
  bottomSection: {
    copyright: "Copyright {year} Mentoaula, SL.",
    location: "Rda. de Sant Antoni, 8, Ciutat Vella, 08001 Barcelona, Spain",
  },
};