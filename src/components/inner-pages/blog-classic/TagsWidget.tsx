import Link from "next/link";
import { BlogSidebarTag } from "@/types/common/blog-sidebar";

interface TagsWidgetProps {
  title: string;
  tags: BlogSidebarTag[];
}

const TagsWidget = ({ title, tags }: TagsWidgetProps) => {
  return (
    <div className="widget__item widget__tags">
      <h6 className="h6 widget__title">{title}</h6>
      <ul className="custom-ul tag-list">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={tag.href}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsWidget;
