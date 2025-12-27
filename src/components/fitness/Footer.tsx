import React from "react";
import Link from "next/link";
import Image from "next/image";
import { footerContent } from "@/content/fitness/home/footer";

const Footer = () => {
  return (
    <footer className="footer-seven footer-seven pt-75">
      <div className="footer-seven__top">
        <div className="container container-2xl">
          <div className="footer-seven__top-wrapper">
            <div
              className="footer-seven__top-content footer-seven__top-left-content fade_up_anim"
              data-delay=".2"
            >
              <Link className="logo d-inline-block" href="/">
                <Image src={footerContent.logo} alt="logo" />
              </Link>
              <p>{footerContent.description}</p>
              <ul className="custom-ul call-to">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.1775 12.7941L14.9519 11.4669C13.9693 10.8808 12.702 11.1672 12.0663 12.1162L11.3238 13.2253C9.33151 12.3015 7.69873 10.6652 6.77502 8.6644L7.87977 7.9301C8.83127 7.29768 9.12091 6.03115 8.53823 5.04757L7.22132 2.8244C6.85756 2.20882 6.1443 1.89135 5.42604 2.03366C4.26825 2.26524 3.24855 2.97598 2.62797 3.98229C2.01161 4.98271 1.84161 6.15325 2.15063 7.27662C3.55682 12.3933 7.61035 16.4446 12.7291 17.8501C13.0953 17.9503 13.465 18 13.833 18C14.595 18 15.346 17.7869 16.0205 17.3709C17.0259 16.7503 17.7357 15.7305 17.9673 14.5726C18.1071 13.8745 17.7905 13.1596 17.1775 12.7941ZM17.1413 14.4067C16.9552 15.3364 16.386 16.1558 15.5785 16.6543C14.7778 17.1478 13.8432 17.2825 12.9531 17.0383C8.11903 15.7111 4.29031 11.8855 2.96327 7.05345C2.71655 6.15829 2.852 5.22442 3.34543 4.42442C3.84391 3.61684 4.66239 3.04587 5.60715 2.85724C5.66189 2.84629 5.7175 2.84041 5.77223 2.84041C6.0661 2.84041 6.34488 2.99451 6.49729 3.25388L7.81337 5.4762C8.16787 6.0741 7.99182 6.84377 7.4125 7.22862L6.01378 8.15915C5.84621 8.27115 5.78153 8.48587 5.85816 8.67198C6.88207 11.1259 8.87011 13.1192 11.3137 14.1415C11.5015 14.2198 11.7153 14.1549 11.8256 13.9874L12.7644 12.5852C13.1518 12.0076 13.9205 11.8332 14.52 12.1903L16.7456 13.5174C17.0529 13.7002 17.2112 14.0572 17.1413 14.4067Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <Link href={footerContent.contact.phoneUrl}>
                    {footerContent.contact.phone}
                  </Link>
                </li>
              </ul>
            </div>
            {footerContent.navigation.map((section) => (
              <div
                key={section.id}
                className={`footer-seven__top-content footer-seven__top-center-content fade_up_anim`}
                data-delay={`.${section.id * 2 + 2}`}
              >
                <ul className="custom-ul page-links">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-seven__bottom">
        <div className="container container-2xl">
          <div className="row gy-5 gy-md-0">
            <div className="col-12 gap-4">
              <div className="footer-seven__bottom-wrapper text-center d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 gap-md-4">
                <ul className="custom-ul footer-seven__bottom-left">
                  <li className="copyright">
                    <i className="fa-regular fa-copyright"></i>
                    {footerContent.copyright.text}{" "}
                    {footerContent.copyright.year}{" "}
                    {footerContent.copyright.companyName}. Inc.
                  </li>
                </ul>

                <ul className="custom-ul footer-seven__bottom-right">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M14.6329 3.55228C13.4009 2.33717 11.7565 1.66797 10.0026 1.66797C8.24869 1.66797 6.60431 2.33717 5.37231 3.55228C3.07987 5.81335 2.72099 8.52855 4.30566 11.6224C5.60545 14.16 7.94628 16.4685 9.65552 18.154L9.72258 18.2202C9.79994 18.2965 9.90126 18.3346 10.0026 18.3346C10.104 18.3346 10.2054 18.2965 10.2827 18.2202L10.3498 18.1539C12.059 16.4684 14.3998 14.1599 15.6996 11.6223C17.2842 8.52848 16.9253 5.81335 14.6329 3.55228ZM14.9926 11.27C13.802 13.5945 11.6508 15.7642 10.0026 17.3915C8.35447 15.7642 6.20318 13.5945 5.01264 11.2701C3.57965 8.47236 3.88048 6.12855 5.93242 4.10472C7.05458 2.99795 8.5286 2.44453 10.0026 2.44453C11.4766 2.44453 12.9506 2.99792 14.0728 4.10472C16.1247 6.12852 16.4256 8.47233 14.9926 11.27ZM10.0026 5.63275C8.39837 5.63275 7.0932 6.92005 7.0932 8.50234C7.0932 10.0846 8.39837 11.3719 10.0026 11.3719C11.6068 11.3719 12.912 10.0846 12.912 8.50234C12.912 6.92005 11.6069 5.63275 10.0026 5.63275ZM10.0026 10.5907C8.83511 10.5907 7.88529 9.65387 7.88529 8.50234C7.88529 7.35081 8.83511 6.414 10.0026 6.414C11.1701 6.414 12.1199 7.35081 12.1199 8.50234C12.1199 9.65387 11.1701 10.5907 10.0026 10.5907Z"
                        fill="currentColor"
                      />
                    </svg>
                    {footerContent.address}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
