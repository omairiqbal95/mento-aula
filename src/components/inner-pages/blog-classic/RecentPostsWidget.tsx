import Image from "next/image";
import Link from "next/link";
import CalendarIcon from "@/icons/CalendarIcon";
import { BlogSidebarRecentPost } from "@/types/common/blog-sidebar";

interface RecentPostsWidgetProps {
  title: string;
  posts: BlogSidebarRecentPost[];
}

const RecentPostsWidget = ({ title, posts }: RecentPostsWidgetProps) => {
  return (
    <div className="widget__item widget__latestPost">
      <h6 className="h6 widget__title">{title}</h6>
      <ul className="custom-ul post__list">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="post__wrapper">
              <div className="post__thumb">
                <Link href={post.href} className="d-block">
                  <Image src={post.image} alt="post" />
                </Link>
              </div>
              <div className="post__content">
                <Link href={post.href}>
                  <h5 className="h5 post__title">
                    {post.title}
                  </h5>
                </Link>
                <div className="post__meta">
                  <CalendarIcon />
                  <p className="post__date">{post.date}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPostsWidget;
