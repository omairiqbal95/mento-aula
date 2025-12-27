import Link from "next/link";
import Image from "next/image";
import error404Image from "@/assets/images/error-404.png";

export default function NotFound() {
  return (
    <div className="error__area d-flex flex-column justify-content-center align-items-center overflow-hidden pt-60 pb-60">
      <div className="container container-3xl">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-lg-6">
            <h2 className="h2 error__title fade_up_anim" data-delay=".2">
              error
            </h2>
            <Image
              className="error__figure fade_up_anim"
              data-delay=".4"
              src={error404Image}
              alt="error-404"
            />
            <p className="fade_up_anim" data-delay=".6">
              Sorry, we could not find the page you are looking for.
            </p>
            <div
              className="error__btns d-flex justify-content-center align-items-lg-center gap-3 fade_up_anim"
              data-delay=".8"
            >
              <Link href="/" className="common-btn">
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
