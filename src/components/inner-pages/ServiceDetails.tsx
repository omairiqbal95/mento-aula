import Image from "next/image";
import RoadmapItem from "./service-details/RoadmapItem";
import SearchWidget from "./service-details/SearchWidget";
import CategoriesWidget from "./service-details/CategoriesWidget";
import ConsultationWidget from "./service-details/ConsultationWidget";
import DownloadWidget from "./service-details/DownloadWidget";
import ServiceBlockquote from "./service-details/ServiceBlockquote";
import { serviceDetailsContent } from "@/content/inner-pages/service-details";

const ServiceDetails = () => {
  const { article, sidebar } = serviceDetailsContent;

  return (
    <div className="service-details__area pt-150 pb-150">
      <div className="container">
        <div className="row g-4 gy-5">
          <div className="col-lg-8 fade_up_anim" data-delay=".4">
            <article className="service-details__article">
              <h2 className="h2">{article.title}</h2>
              {article.introText.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
              <div className="blog-thumb">
                <Image
                  src={article.thumbnail}
                  alt="service-details-thumbnail"
                />
              </div>
              <h4 className="h4">{article.processTitle}</h4>
              <p>{article.processDescription}</p>
              <ul className="custom-ul process-list">
                {article.processList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{article.processText}</p>
              <h4 className="h4">{article.roadmapTitle}</h4>
              <p>{article.roadmapDescription}</p>
              <div className="service-details__article-roadmap">
                {article.roadmap.map((item) => (
                  <RoadmapItem key={item.id} item={item} />
                ))}
              </div>
              <ServiceBlockquote blockquote={article.blockquote} />
              <h4 className="h4">{article.finalTitle}</h4>
              {article.finalText.map((text, index) => (
                <p key={index} className={index === article.finalText.length - 1 ? "mb-0" : ""}>
                  {text}
                </p>
              ))}
            </article>
          </div>
          <div className="col-lg-4 fade_up_anim" data-delay=".6">
            <div className="widget">
              <SearchWidget 
                title={sidebar.search.title}
                placeholder={sidebar.search.placeholder}
              />
              <CategoriesWidget 
                title={sidebar.categories.title}
                categories={sidebar.categories.items}
              />
              <ConsultationWidget 
                title={sidebar.consultation.title}
                buttonText={sidebar.consultation.buttonText}
                buttonHref={sidebar.consultation.buttonHref}
                backgroundImage={sidebar.consultation.backgroundImage}
              />
              <DownloadWidget 
                buttonText={sidebar.download.buttonText}
                downloadHref={sidebar.download.downloadHref}
                fileName={sidebar.download.fileName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
