import Link from "next/link";
import { heroData } from "@/content/architectural-agency/hero";
import CircularNext from "@/components/architectural-agency/hero/CircularNext";
import WordAnimator from "@/components/architectural-agency/hero/WordAnimator";

const Hero = () => {
  // Split tags into two rows
  const firstRowTags = heroData.tags.slice(0, 5);
  const secondRowTags = heroData.tags.slice(5);

  return (
    <div className="hero-ad__area">
      <div className="container container-4xl">
        <div className="row">
          <div className="col-md-8">
            <div className="hero-ad__content">
              <h1 className="h1">
                <WordAnimator
                  lines={[heroData.title.line1, heroData.title.line2]}
                />
              </h1>
              <p className="fade_up_anim" data-delay=".4">
                {heroData.description}
              </p>
              <Link
                href={heroData.cta.href}
                className="common-btn common-btn__variation5 common-btn__variation5--extend fade_up_anim"
                data-delay=".6"
              >
                <span>{heroData.cta.text}</span>
                <div className="arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.0766 10.2412C18.0449 10.3179 17.9992 10.3869 17.9417 10.4444L12.1084 16.2778C11.9867 16.3994 11.8267 16.4611 11.6667 16.4611C11.5067 16.4611 11.3466 16.4003 11.225 16.2778C10.9808 16.0336 10.9808 15.6377 11.225 15.3936L15.9916 10.6269H2.5C2.155 10.6269 1.875 10.3469 1.875 10.0019C1.875 9.65693 2.155 9.37693 2.5 9.37693H15.9908L11.2242 4.61029C10.98 4.36612 10.98 3.97026 11.2242 3.72609C11.4683 3.48193 11.8642 3.48193 12.1084 3.72609L17.9417 9.55943C17.9992 9.61693 18.0449 9.68601 18.0766 9.76267C18.1399 9.91601 18.1399 10.0879 18.0766 10.2412Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="hero-ad__bottom">
              <CircularNext
                targetId={heroData.scrollDown.targetId}
                text={heroData.scrollDown.text}
              />
              <div className="d-flex flex-column gap-2">
                <div className="hero-ad__tags">
                  {firstRowTags.map((tag, index) => (
                    <Link key={index} href={tag.href} className="tag">
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <div className="hero-ad__tags">
                  {secondRowTags.map((tag, index) => (
                    <Link key={index} href={tag.href} className="tag">
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
