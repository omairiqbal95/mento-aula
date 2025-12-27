import Logo from "@/assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";

const StartupAgencyFooter = () => {
  return (
    <footer className="footer-three__area">
      <div className="text-slide pb-120">
        <h2
          className="h2"
          data-text="let's start with us →"
          style={{
            display: "inline-block",
            animation: "marquee 20s linear infinite",
          }}
        >
          <span>
            <Link href="/contact">let&apos;s start with us</Link>
          </span>
          <i className="bi bi-arrow-up-right"></i>
          {/* Duplicate content for seamless loop */}
          <span style={{ paddingLeft: "2rem" }}>
            <Link href="/contact">let&apos;s start with us</Link>
          </span>
          <i className="bi bi-arrow-up-right"></i>
        </h2>
      </div>
      <div className="container container-3xl">
        <div className="row footer-three__body gy-5">
          <div className="col-md-7 col-lg-8 border-varticle fade_up_anim">
            <div className="footer-three__body-content">
              <p>
                Unikon is a dynamic and forward-thinking startup agency
                dedicated to providing cutting-edge solutions that drive success
                for businesses of all sizes.
              </p>
              <div className="footer-three__body-content-footer">
                <Link href="/" className="">
                  <Image src={Logo} alt="logo" />
                </Link>
                <ul className="custom-ul social-links">
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-discord"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-solid fa-paper-plane"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 fade_up_anim" data-delay=".4">
            <div className="row justify-content-between g-4">
              <div className="col-6 col-xl-5">
                <ul className="custom-ul footer-three__body-navigation">
                  <li>
                    <Link href="/about" className="">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/service" className="">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" className="">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-xl-4">
                <ul className="custom-ul footer-three__body-navigation-extend">
                  <li>
                    <Link href="/faq" className="">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/404" className="">
                      Error 404
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="">
                      Coming soon
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-three__footer gap-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <ul className="custom-ul nav-links d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms & Conditions</Link>
            </li>
          </ul>
          <p className="copy-right d-flex align-items-center gap-1">
            <i className="fa-regular fa-copyright"></i>
            <span>Copyright {new Date().getFullYear()} Unikon. Inc.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StartupAgencyFooter;
