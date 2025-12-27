import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import breadcrumbBlogImage from "@/assets/images/breadcrumb/breadcrumb-blog.png";
import BlogStandard from "@/components/inner-pages/BlogStandard";

const Blog = () => {
  return (
    <>
      <Breadcrumb title="Blog Standard" backgroundImage={breadcrumbBlogImage} />
      <BlogStandard />
    </>
  );
};

export default Blog;
