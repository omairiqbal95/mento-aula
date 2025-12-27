import Image from "next/image";
import Link from "next/link";
import ArrowMasonryIcon from "@/icons/ArrowMasonryIcon";
import { RelatedProject } from "@/types/inner-pages/portfolio-details";

interface RelatedProjectItemProps {
  project: RelatedProject;
  delay: string;
}

const RelatedProjectItem = ({ project, delay }: RelatedProjectItemProps) => {
  return (
    <div className="col-md-6 fade_up_anim" data-delay={delay}>
      <div className="work-sa__item">
        <figure className="work-sa__item-figure">
          <Image src={project.image} alt="work" />
        </figure>
        <div className="work-sa__item-body">
          <div className="work-sa__item-content">
            <span>{project.title}</span>
            <p className="nerrow-pra">{project.categories}</p>
          </div>
          <Link href={project.href} className="arrow" aria-label="View project details">
            <ArrowMasonryIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedProjectItem;
