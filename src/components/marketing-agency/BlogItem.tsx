import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TypeBlogItem } from '@/types/marketing-agency/blogs'; 

const BlogItem: React.FC<TypeBlogItem> = ({
  date,
  category,
  title,
  link,
  imageSrc,
  delay,
}) => {
  const delayString = delay > 0 ? `.${delay.toFixed(1)}s` : undefined;

  return (
    <div className="col-sm-6 col-lg-4 fade_up_anim" data-delay={delayString}>
      <div className="blog-mar__item">
        <div className="blog-mar__item-thumb">
          <Image
            className="img-move"
            src={imageSrc}
            alt={title}
          />
        </div>
        <div className="blog-mar__item-content">
          <ul className="custom-ul blog-meta">
            <li>{date}</li>
            <li>{category}</li>
          </ul>
          <h5 className="h5 blog-title">
            <Link href={link}>
              {title}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;