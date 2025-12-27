import React from 'react';
import Link from 'next/link';
import ArrowSvg from '@/icons/ArrowSvg';
import BlogItem from './BlogItem';
import { CONSTANT_BLOG_DATA } from "@/content/marketing-agency/home/blogs";


const BlogSection = () => {
  const { header, posts } = CONSTANT_BLOG_DATA;
  const { subTitle, title, viewAllLink } = header;

  return (
    <div className="blog-mar__area pt-150 pb-150">
      <div className="container container-mini">
        <div
          className="row g-4 justify-content-center justify-content-md-between align-items-end text-center text-md-start"
        >
          <div className="col-md-9">
            <span className="section__header-sub-title-v11 fade_up_anim">
              {subTitle}
            </span>
            <h2
              className="h2 section__header-title-v11 text-reveal fade_up_anim"
              data-delay=".4"
            >
              {title}
            </h2>
          </div>
          <div className="col-md-3 col-lg-2 d-md-inline-flex justify-content-md-end">
            <Link
              href={viewAllLink}
              className="common-btn square-btn transparent-btn fade_up_anim"
              data-delay=".8"
            >
              View All
              <ArrowSvg />
            </Link>
          </div>
        </div>
        
        <div className="row g-4 gy-5 gy-sm-4 pt-100">
          {posts.map((post) => (
            <BlogItem key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;