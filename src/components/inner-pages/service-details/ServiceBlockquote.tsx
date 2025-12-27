import Image from "next/image";
import QuoteIconTwo from "@/icons/QuoteIconTwo";
import { Blockquote } from "@/types/inner-pages/service-details";

interface ServiceBlockquoteProps {
  blockquote: Blockquote;
}

const ServiceBlockquote = ({ blockquote }: ServiceBlockquoteProps) => {
  return (
    <blockquote 
      className="service-details__blockquote"
      style={{ backgroundImage: `url(${blockquote.backgroundImage.src})` }}
    >
      <div className="service-details__blockquote-wrapper">
        <p>{blockquote.text}</p>
        <div className="quote-author">
          <div className="author-info-container">
            <Image
              src={blockquote.author.avatar}
              alt={blockquote.author.name}
              className="author-avatar"
            />
            <div className="author-info">
              <span className="author-title">{blockquote.author.name}</span>
              <p className="author-designation">{blockquote.author.designation}</p>
            </div>
          </div>
          <div className="quote-icon">
            <QuoteIconTwo />
          </div>
        </div>
      </div>
    </blockquote>
  );
};

export default ServiceBlockquote;
