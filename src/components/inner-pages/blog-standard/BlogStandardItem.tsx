import Image from "next/image";
import Link from "next/link";
import { BlogStandardItemProps } from "@/types/inner-pages/blog-standard";

const BlogStandard = ({ item }: BlogStandardItemProps) => {
  return (
    <div className="blog__item blog__item--style2 fade_up_anim" data-delay=".2">
      <div className="blog__item-inner">
        <div className="blog__item-thumb">
          <Image 
            src={item.image} 
            className="w-100" 
            alt={item.alt} 
          />
        </div>
        <div className="blog__item-content">
          <div className="blog__meta">
            <ul className="custom-ul blog__meta-lists d-flex align-items-center">
              <li>{item.date}</li>
              <li>{item.comments}</li>
            </ul>
          </div>
          <h6 className="h6 blog__item-content-title blog__item-content-title--extend">
            <Link href={item.href}>
              {item.title}
            </Link>
          </h6>
          <p>
            {item.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogStandard;
