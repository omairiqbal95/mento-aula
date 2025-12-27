import Image from "next/image";
import Link from "next/link";
import { TypeCaseStudy } from "@/types/marketing-agency/case-study";
import ArrowSvg from "@/icons/ArrowSvg";

const CaseStudyItem: React.FC<TypeCaseStudy> = ({
  imageSrc,
  subTitle,
  number,
  title,
  description,
  link,
}) => (
  <div className="case-study-mar__item an-pine-vanish">
    <figure className="case-study-mar__item-thumb">
      <Image className="img-move" src={imageSrc} alt={title} />
    </figure>
    <div className="case-study-mar__item-content">
      <h5 className="h5 item-sub-title">{subTitle}</h5>
      <span className="case-study-number">{number}</span>
      <h3 className="h3 item-title">{title}</h3>
      <p>{description}</p>
      <Link href={link} className="common-btn square-btn">
        View Case
        <ArrowSvg />
      </Link>
    </div>
  </div>
);

export default CaseStudyItem;
