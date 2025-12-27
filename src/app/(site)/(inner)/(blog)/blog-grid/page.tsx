import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogGrid from "@/components/inner-pages/BlogGrid";
import breadcrumbBlogImage from "@/assets/images/breadcrumb/breadcrumb-blog.png";

const Blog = () => {
  return (
    <>
      <Breadcrumb title="Blog Grid" backgroundImage={breadcrumbBlogImage} />
      <BlogGrid />
    </>
  );
};

export default Blog;
