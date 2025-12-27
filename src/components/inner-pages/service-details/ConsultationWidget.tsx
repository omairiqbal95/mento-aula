import Link from "next/link";
import { StaticImageData } from "next/image";

interface ConsultationWidgetProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  backgroundImage: StaticImageData;
}

const ConsultationWidget = ({ title, buttonText, buttonHref, backgroundImage }: ConsultationWidgetProps) => {
  return (
    <div className="widget__item widget__consultation">
      <div 
        className="consultation-content"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <h6 className="h6">{title}</h6>
        <Link
          href={buttonHref}
          className="common-btn w-100 justify-content-center"
        >
          <span>{buttonText}</span>
        </Link>
      </div>
    </div>
  );
};

export default ConsultationWidget;
