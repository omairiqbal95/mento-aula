import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbBlogImage from "@/assets/images/breadcrumb/breadcrumb-blog.png";
import BlogClassic from "@/components/inner-pages/BlogClassic";

const Blog = () => {
  return (
    <>
      <Breadcrumb title="Blog Classic" backgroundImage={breadcrumbBlogImage} />
      <BlogClassic />
    </>
  );
};

export default Blog;
