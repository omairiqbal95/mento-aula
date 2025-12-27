import React from "react";
import breadcrumbBlogImage from "@/assets/images/breadcrumb/breadcrumb-blog-details.png";
import Breadcrumb from "@/components/common/Breadcrumb";
import Work from "@/components/blog-details/Work";

const BlogDetails = () => {
  return (
    <>
      <Breadcrumb
        title="Top 10 Design Trends for 2024"
        backgroundImage={breadcrumbBlogImage}
      />
      <Work />
    </>
  );
};

export default BlogDetails;
