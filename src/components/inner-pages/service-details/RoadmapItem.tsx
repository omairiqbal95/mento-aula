import DocumentIcon from "@/icons/DocumentIcon";
import SendIcon from "@/icons/SendIcon";
import ApproveIcon from "@/icons/ApproveIcon";
import { RoadmapItem as RoadmapItemType } from "@/types/inner-pages/service-details";

interface RoadmapItemProps {
  item: RoadmapItemType;
}

const iconComponents = {
  document: DocumentIcon,
  send: SendIcon,
  approve: ApproveIcon,
};

const RoadmapItem = ({ item }: RoadmapItemProps) => {
  const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];

  return (
    <div className="roadmap__item">
      <div className="roadmap__icon">
        {IconComponent && <IconComponent />}
      </div>
      <div className="roadmap__content">
        <h6 className="roadmap__title">{item.title}</h6>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default RoadmapItem;
