import Image from "next/image";
import Link from "next/link";
import { BlogItemProps } from "@/types/inner-pages/blog-classic";

const BlogItem = ({ item }: BlogItemProps) => {
  return (
    <div className="blog__item fade_up_anim" data-delay=".2">
      <div className="blog__item-inner">
        <div className="blog__item-thumb">
          <Image src={item.image} alt={item.title} />
        </div>
        <div className="blog__item-content">
          <div className="blog__meta">
            <ul className="custom-ul blog__meta-lists d-flex align-items-center">
              <li>{item.meta.date}</li>
              <li>{item.meta.comments.toString().padStart(2, '0')} Comments</li>
            </ul>
          </div>
          <h5 className="h5 blog__item-content-title">
            <Link href={item.href}>
              {item.title}
            </Link>
          </h5>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
