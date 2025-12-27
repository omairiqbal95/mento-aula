import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogItemProps } from "@/types/inner-pages/blog-grid";

const BlogItem = ({ item }: BlogItemProps) => {
  return (
    <div
      className="blog__item blog__item--style2 fade_up_anim"
      data-delay={item.delay}
    >
      <div className="blog__item-inner">
        <div className="blog__item-thumb">
          <Image
            src={item.image}
            className="w-100"
            alt="blog"
          />
        </div>
        <div className="blog__item-content">
          <div className="blog__meta">
            <ul className="custom-ul blog__meta-lists d-flex align-items-center">
              <li>{item.meta.date}</li>
              <li>{item.meta.comments < 10 ? `0${item.meta.comments}` : item.meta.comments} Comments</li>
            </ul>
          </div>
          <h6 className="h6 blog__item-content-title blog__item-content-title--extend">
            <Link href={item.link}>
              {item.title}
            </Link>
          </h6>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
