import Link from 'next/link';
import Image from 'next/image';
import { heroContent } from '@/content/marketing-agency/home/hero';
import BrandSlider from './hero/BrandSlider';
import CircularText from './hero/CircularText';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const Hero = () => {
  return (
    <div className="hero-mar__area pb-150">
      <div className="container extend">
        <div className="row g-4 gy-5 gy-xl-0">
          <div className="col-xl-6">
            <div className="hero-mar__wrapper">
              <div className="hero-mar__content">
                <h1 className="h1 hero-mar__title">
                  {heroContent.title.words.map((word, index) => (
                    <span key={index} className="word-animation">
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="fade_up_anim">
                  {heroContent.description}
                </p>
                <Link 
                  href={heroContent.button.href} 
                  className={heroContent.button.className} 
                  data-delay=".2"
                >
                  {heroContent.button.text}
                  <ArrowRightIcon />
                </Link>
              </div>
              <div className="hero-mar__brand fade_up_anim" data-delay=".4">
                <p className="title">{heroContent.brandSection.title}</p>
                <BrandSlider brands={heroContent.brandSection.brands} />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="hero-mar__thumb">
              <CircularText 
                content={heroContent.videoSection.circularText}
                videoId={heroContent.videoSection.videoId}
                className={heroContent.videoSection.className}
              />
              <Image 
                src={heroContent.heroImage.src} 
                alt={heroContent.heroImage.alt}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;