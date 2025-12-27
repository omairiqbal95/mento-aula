import Image from "next/image";
import Link from "next/link";
import { latestArticlesData } from "@/content/architectural-agency/latest-articles";
import ArrowRightIconTwo from "@/icons/ArrowRightIconTwo";

export default function LatestArticles() {
  return (
    <div className="latest-articles__area pb-150">
      <div className="container container-4xl">
        <div className="row g-4 gy-5 justify-content-between">
          <div className="col-md-5 col-xxl-3 section__header-v3 text-center text-sm-start">
            <h3
              className="h3 section__header-title-v3 fade_up_anim"
              data-delay=".2"
            >
              Latest Articles
            </h3>
            <p className="fade_up_anim" data-delay=".4">
              We envision a world where architecture is not just about building
              structures.
            </p>
            <Link
              href="/blog"
              className="common-btn__variation6 fade_up_anim"
              data-delay=".6"
            >
              <span>View All Articles</span>
              <i className=""></i>
            </Link>
          </div>
          <div className="col-md-7 col-xxl-9">
            <div className="row align-items-center g-4">
              {latestArticlesData.map((article, index) => (
                <div key={article.id} className="col-xl-6">
                  <div
                    className="latest-articles__card fade_up_anim"
                    data-delay={`.${8 + index * 2}`}
                  >
                    <div className="latest-articles__card-thumb">
                      <Image
                        src={article.image}
                        alt={`article-${article.id}`}
                        width={600}
                        height={400}
                      />
                    </div>
                    <div className="latest-articles__card-content">
                      <p>{article.category}</p>
                      <h6 className="h6">{article.title}</h6>
                      <Link
                        href={article.link}
                        className="common-btn__variation7"
                      >
                        <span>Read More</span>
                        <ArrowRightIconTwo />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
