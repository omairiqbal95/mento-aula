declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// for swiper and fontawesome
declare module "swiper/css";
declare module "swiper/css/*";
declare module "@fortawesome/fontawesome-free/css/all.min.css";