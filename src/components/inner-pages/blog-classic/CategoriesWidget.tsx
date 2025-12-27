import Link from "next/link";
import { BlogSidebarCategory } from "@/types/common/blog-sidebar";

interface CategoriesWidgetProps {
  title: string;
  categories: BlogSidebarCategory[];
}

const CategoriesWidget = ({ title, categories }: CategoriesWidgetProps) => {
  return (
    <div className="widget__item widget__categories">
      <h4 className="widget__title">{title}</h4>
      <ul className="custom-ul categorie-list">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={category.href} className="categorie">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesWidget;
