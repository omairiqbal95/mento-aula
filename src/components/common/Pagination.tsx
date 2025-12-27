import Link from "next/link";
import PaginationArrowIcon from "@/icons/PaginationArrowIcon";
import { PaginationProps, PaginationItem } from "@/types/inner-pages/blog-classic";

const Pagination = ({
  items,
  className,
  itemClassName,
  activeClassName = "active",
  arrowClassName,
  classes = {},
}: PaginationProps) => {
  const getItemClassName = (item: PaginationItem, index: number) => {
    let classes = "page-item";

    if (item.isActive) {
      classes += ` ${activeClassName}`;
    }

    if (typeof itemClassName === "function") {
      const customClass = itemClassName(item, index);
      if (customClass) classes += ` ${customClass}`;
    } else if (itemClassName) {
      classes += ` ${itemClassName}`;
    }

    if (item.className) {
      classes += ` ${item.className}`;
    }

    return classes;
  };

  return (
    <div className={`paginations ${className || ""} ${classes.container || ""}`}>
      <nav aria-label="Blog listing Pagination" className={classes.nav || ""}>
        <ul className={`pagination mb-0 ${classes.list || ""}`}>
          {items.map((item, index) => {
            if (
              item.type === "prev" ||
              item.type === "next" ||
              item.type === "dots"
            ) {
              return null;
            }

            if (item.type === "page" && item.id === "arrow") {
              const arrowClasses = arrowClassName
                ? `${getItemClassName(item, index)} ${arrowClassName}`
                : getItemClassName(item, index);

              return (
                <li key={item.id} className={`${arrowClasses} ${classes.item || ""}`}>
                  <Link href={item.href} className={`page-link ${classes.link || ""}`}>
                    <PaginationArrowIcon />
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={item.id}
                className={`${getItemClassName(item, index)} ${classes.item || ""}`}
                aria-current={item.isActive ? "page" : undefined}
              >
                <Link href={item.href} className={`page-link ${classes.link || ""}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
