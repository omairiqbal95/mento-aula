import BlogItem from "./blog-classic/BlogItem";
import SearchWidget from "./blog-classic/SearchWidget";
import CategoriesWidget from "./blog-classic/CategoriesWidget";
import RecentPostsWidget from "./blog-classic/RecentPostsWidget";
import TagsWidget from "./blog-classic/TagsWidget";
import NewsletterWidget from "./blog-classic/NewsletterWidget";
import GalleryWidget from "./blog-classic/GalleryWidget";
import { blogClassicContent } from "@/content/inner-pages/blog-classic";

const BlogClassic = () => {
  const { blogItems, sidebar } = blogClassicContent;

  return (
    <div className="blog__area pt-150 pb-150">
      <div className="container pb-75">
        <div className="row g-4 gy-5">
          <div className="col-lg-8 fade_up_anim" data-delay=".4">
            <div className="blog__wrapper">
              {blogItems.map((item) => (
                <BlogItem key={item.id} item={item} />
              ))}
            </div>
              
          </div>
          <div className="col-lg-4 fade_up_anim" data-delay=".6">
            <div className="widget">
              <SearchWidget 
                title={sidebar.search.title}
                placeholder={sidebar.search.placeholder}
              />
              <CategoriesWidget 
                title={sidebar.categories.title}
                categories={sidebar.categories.items}
              />
              <RecentPostsWidget 
                title={sidebar.recentPosts.title}
                posts={sidebar.recentPosts.items}
              />
              <TagsWidget 
                title={sidebar.tags.title}
                tags={sidebar.tags.items}
              />
              <NewsletterWidget 
                title={sidebar.newsletter.title}
                placeholder={sidebar.newsletter.placeholder}
                buttonText={sidebar.newsletter.buttonText}
              />
              <GalleryWidget 
                title={sidebar.gallery.title}
                galleryItems={sidebar.gallery.items}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogClassic;
