import React from "react";
import BlogItem from "@/components/inner-pages/blog-grid/BlogItem";
import Pagination from "@/components/common/Pagination";
import { blogGridContent } from "@/content/inner-pages/blog-grid";
import { BlogGridProps } from "@/types/inner-pages/blog-grid";

const BlogGrid = ({ content = blogGridContent }: BlogGridProps) => {
  return (
    <div className="blog__area pt-150 pb-150">
      <div className="container">
        <div className="row g-4 gy-5">
          <div className="col-lg-12">
            <div className="blog__wrapper blog__wrapper--style3">
              {content.items.map((item) => (
                <BlogItem key={item.id} item={item} />
              ))}
            </div>
            <Pagination 
              items={content.pagination} 
              className="pt-120"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;