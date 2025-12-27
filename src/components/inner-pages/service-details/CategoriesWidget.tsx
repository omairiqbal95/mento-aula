import Link from "next/link";
import { Category } from "@/types/inner-pages/service-details";

interface CategoriesWidgetProps {
  title: string;
  categories: Category[];
}

const CategoriesWidget = ({ title, categories }: CategoriesWidgetProps) => {
  return (
    <div className="widget__item widget__categories">
      <h6 className="h6 widget__title">{title}</h6>
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
