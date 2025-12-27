import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchWidget from "../inner-pages/blog-classic/SearchWidget";
import CategoriesWidget from "../inner-pages/blog-classic/CategoriesWidget";
import RecentPostsWidget from "../inner-pages/blog-classic/RecentPostsWidget";
import TagsWidget from "../inner-pages/blog-classic/TagsWidget";
import NewsletterWidget from "../inner-pages/blog-classic/NewsletterWidget";
import GalleryWidget from "../inner-pages/blog-classic/GalleryWidget";
import {
  categories,
  recentPosts,
  tags,
  newsletter,
  gallery,
  blogArticle,
} from "@/content/blog-details/work";

const Work = () => {
  return (
    <div className="blog-details__area pt-150 pb-150">
      <div className="container">
        <div className="row g-4 gy-5">
          <div className="col-lg-8 fade_up_anim" data-delay=".2">
            <article>
              <div className="blog-details__article">
                <figure className="blog-details__article-thumb">
                  <Image
                    src={blogArticle.mainImage}
                    alt="blog main thumbnail"
                    width={800}
                    height={450}
                    priority
                  />
                </figure>
                <div className="blog-details__article-meta">
                  <ul className="custom-ul">
                    <li>
                      <i className="fa-regular fa-user"></i>
                      <Link href={blogArticle.authorLink}>
                        {blogArticle.author}
                      </Link>
                    </li>
                    <li>
                      <i className="fa-solid fa-tags"></i>
                      <Link href={blogArticle.categoryLink}>
                        {blogArticle.category}
                      </Link>
                    </li>
                    <li>
                      <i className="fa-solid fa-calendar-days"></i>
                      <Link href="#">{blogArticle.date}</Link>
                    </li>
                    <li>
                      <i className="fa-regular fa-comment-dots"></i>
                      <Link href={blogArticle.commentsLink}>
                        {blogArticle.comments}
                      </Link>
                    </li>
                  </ul>
                </div>
                {blogArticle.content.intro.map((paragraph, index) => (
                  <p
                    key={index}
                    className="fade_up_anim"
                    data-delay={`.${20 + index * 3}`}
                  >
                    {paragraph}
                  </p>
                ))}
                <h4 className="h4 fade_up_anim" data-delay=".26">
                  {blogArticle.content.storyBehind.title}
                </h4>
                {blogArticle.content.storyBehind.paragraphs.map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="fade_up_anim"
                      data-delay={`.${29 + index * 3}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}
                <blockquote
                  className="blog-details__blockquote fade_up_anim"
                  data-delay=".35"
                >
                  <div className="blog-details__blockquote-figure">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 86 86"
                      fill="none"
                    >
                      <g opacity="0.2">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M82.7996 15.8936C83.7864 13.6923 83.2587 10.4375 81.0222 10.1172C79.9854 10.1172 78.9486 10.1172 77.9118 10.1172C74.5848 10.7207 69.2139 12.2019 66.8034 12.3389C63.3412 15.2715 58.9793 16.4157 56.1374 19.4483C55.4079 20.2277 55.5301 21.5274 54.8044 22.5587C54.934 22.3735 53.749 22.6531 53.4713 23.003C45.9898 32.4545 48.2152 46.4049 48.5836 60.3275C48.704 64.9542 47.2913 69.8456 49.0261 74.1002C60.5234 74.6556 71.0357 75.4295 81.4647 74.1002C82.2016 64.3136 82.2016 51.4518 81.4647 41.6634C72.1502 40.497 62.2415 39.8324 55.693 40.3304C56.3299 39.0381 56.0337 39.8305 54.8044 39.8861C54.3026 38.1087 55.0358 37.0738 53.9175 35.4427C54.3322 35.713 55.556 36.4757 55.2505 34.9983C56.641 30.2994 59.9642 26.1078 62.8043 21.6682C62.8247 22.2791 62.5951 22.6438 62.36 23.0012C67.8068 18.6707 75.1366 17.0211 82.7996 15.8936ZM78.3562 45.6662C77.4064 54.7029 79.2097 62.7584 77.9137 70.9935C73.1796 70.8787 71.8336 69.3513 68.1382 70.1067C68.1382 69.6623 68.1382 69.218 68.1382 68.7718C68.0308 69.9993 65.9443 69.2458 65.4722 70.1067C64.6909 69.9974 64.4595 69.342 64.5854 68.3293C63.3894 68.022 63.7263 69.2476 63.2524 69.6623C62.6432 67.6776 61.0732 70.0622 61.475 70.1067C60.7122 70.0196 61.4491 68.9995 61.0307 68.7718C59.4051 67.8924 56.4021 69.2569 53.9212 69.2161C54.0082 60.8514 53.1325 53.8457 53.4769 46.1124C61.4657 46.2568 69.2491 43.911 78.3562 45.6662Z"
                          fill="black"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M37.9211 42.5534C37.3972 41.8924 36.8047 41.2981 36.1438 40.776C28.9085 41.4555 18.5776 40.6705 8.15043 40.776C9.58342 23.6949 20.6586 16.2559 37.4768 14.56C37.4768 13.6713 37.4768 12.7826 37.4768 11.894C33.2 9.88703 26.2128 12.5197 22.3693 12.3383C24.9224 13.5232 15.0025 14.473 19.2589 14.1157C18.6609 14.8507 18.1221 15.6449 17.0372 15.893C17.5463 14.0583 14.2601 16.13 13.0271 18.0425C12.9715 18.2887 12.8234 18.4406 12.7105 18.6294C12.7882 18.4387 12.8993 18.2425 13.0271 18.0425C13.0511 17.9388 13.0659 17.8259 13.0382 17.6704C11.9773 18.8312 10.4406 19.5144 10.8165 22.1138C10.2148 21.973 9.96852 21.4806 9.03911 21.6694C6.21941 26.7034 1.86118 32.8982 4.15138 38.11C3.45155 38.0692 3.80331 36.9769 2.81836 37.2213C2.65544 38.982 3.85886 39.9373 2.37402 40.776V52.3288C3.93106 59.2105 1.64086 69.4692 3.70704 74.9901C15.0599 76.1806 26.8367 76.0861 37.9211 74.9901C39.9447 63.5854 36.8603 54.058 37.9211 42.5534ZM33.4778 70.9911C28.7437 70.8763 27.3977 69.3488 23.7023 70.1042C23.7023 69.6599 23.7023 69.2155 23.7023 68.7694C23.5949 69.9968 21.5084 69.2433 21.0363 70.1042C20.255 69.995 20.0235 69.3396 20.1476 68.3269C18.9516 68.0195 19.2885 69.2452 18.8146 69.6599C18.2073 67.6752 16.6373 70.0598 17.0372 70.1042C16.2744 70.0172 17.0131 68.9971 16.5929 68.7694C14.9673 67.8899 11.9643 69.2544 9.48345 69.2137C9.57046 60.849 8.69475 53.8433 9.03911 46.1099C17.0613 46.2858 24.7632 43.8586 33.9221 45.6656C32.9723 54.7005 34.7737 62.7578 33.4778 70.9911Z"
                          fill="black"
                        />
                      </g>
                    </svg>
                  </div>
                  <h5 className="h5">{blogArticle.content.blockquote}</h5>
                </blockquote>
                <p className="fade_up_anim" data-delay=".38">
                  {blogArticle.content.middleContent}
                </p>
                <div className="blog-details__inner-block">
                  {blogArticle.content.innerImages.map((item, index) => (
                    <div
                      key={index}
                      className="blog-details__inner-item fade_up_anim"
                      data-delay={`.${41 + index * 3}`}
                    >
                      <div className="item-thumb">
                        <Image
                          src={item.image}
                          alt="inner-block"
                          width={400}
                          height={300}
                        />
                      </div>
                      <p>{item.caption}</p>
                    </div>
                  ))}
                </div>
                <h4 className="h4 fade_up_anim" data-delay=".47">
                  {blogArticle.content.openToFeedback.title}
                </h4>
                {blogArticle.content.openToFeedback.paragraphs.map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="fade_up_anim"
                      data-delay={`.${50 + index * 3}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}
                <h4 className="h4 fade_up_anim" data-delay=".56">
                  {blogArticle.content.finalThoughts.title}
                </h4>
                {blogArticle.content.finalThoughts.paragraphs.map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="fade_up_anim"
                      data-delay={`.${59 + index * 3}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </article>
            <div className="blog-details__author fade_up_anim" data-delay=".65">
              <div className="author-wrapper">
                <div className="author">
                  <div className="author__avatar">
                    <Image
                      src={blogArticle.authorInfo.avatar}
                      alt={blogArticle.authorInfo.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="author__info">
                    <span>{blogArticle.authorInfo.label}</span>
                    <p>{blogArticle.authorInfo.name}</p>
                  </div>
                </div>
                <ul className="custom-ul social-link">
                  <li>
                    <Link href={blogArticle.authorInfo.socialLinks.facebook}>
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={blogArticle.authorInfo.socialLinks.twitter}>
                      <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={blogArticle.authorInfo.socialLinks.linkedin}>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={blogArticle.authorInfo.socialLinks.instagram}>
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="blog-details__comments-section fade_up_anim"
              data-delay=".68"
            >
              <h4 className="h4">{blogArticle.commentsList.length} Comments</h4>
              <div className="comments-wrap">
                {blogArticle.commentsList.map((comment) => (
                  <div
                    key={comment.id}
                    className={`single-comments-box ${
                      comment.isNested ? "nested-item" : ""
                    }`}
                  >
                    <div className="comments-author-img">
                      <Image
                        src={comment.avatar}
                        alt={comment.author}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="comments-info">
                      <h6 className="comments-author">{comment.author}</h6>
                      <p>{comment.content}</p>
                      <div className="comment-meta">
                        <div className="reaction-reply">
                          <Link href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M21.176 9.60878C20.73 8.98878 19.7991 8.25081 17.9041 8.25081H14.748V5.76381C14.748 4.50781 14.124 3.34181 13.079 2.64381C12.482 2.24581 11.748 2.14378 11.066 2.36378C10.382 2.58378 9.84596 3.09479 9.58496 3.79579L7.45703 10.2508H4.50098C3.26098 10.2508 2.25098 11.2598 2.25098 12.5008V19.5008C2.25098 20.7418 3.26098 21.7508 4.50098 21.7508H15.905C18.401 21.7508 19.012 20.5378 19.463 19.1868L21.462 13.1868C21.929 11.7828 21.827 10.5118 21.176 9.60878ZM3.75 19.5008V12.5008C3.75 12.0868 4.087 11.7508 4.5 11.7508H6.5V20.2508H4.5C4.087 20.2508 3.75 19.9148 3.75 19.5008ZM20.037 12.7118L18.038 18.7118C17.683 19.7788 17.4601 20.2508 15.9041 20.2508H8V11.7508C8.324 11.7508 8.61006 11.5428 8.71106 11.2358L10.998 4.29481C11.089 4.05381 11.28 3.87082 11.525 3.79182C11.77 3.71182 12.032 3.7498 12.246 3.8918C12.873 4.3098 13.2469 5.00981 13.2469 5.76381V9.00081C13.2469 9.41481 13.5829 9.75081 13.9969 9.75081H17.903C18.599 9.75081 19.521 9.87779 19.959 10.4858C20.315 10.9798 20.345 11.7918 20.037 12.7118Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Link>
                          <Link href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M19.4997 2.25H8.09568C5.59968 2.25 4.98869 3.46303 4.53769 4.81403L2.53867 10.814C2.07067 12.218 2.1727 13.489 2.8237 14.392C3.2697 15.012 4.20068 15.75 6.09568 15.75H9.25168V18.237C9.25168 19.493 9.87575 20.6591 10.9207 21.3571C11.3108 21.6171 11.7597 21.751 12.2137 21.751C12.4547 21.751 12.6967 21.713 12.9337 21.637C13.6177 21.417 14.1538 20.906 14.4148 20.205L16.5427 13.75H19.4988C20.7388 13.75 21.7488 12.741 21.7488 11.5V4.5C21.7498 3.259 20.7397 2.25 19.4997 2.25ZM15.2887 12.765L13.0017 19.706C12.9107 19.947 12.7197 20.13 12.4747 20.209C12.2287 20.288 11.9668 20.251 11.7538 20.109C11.1268 19.691 10.7528 18.991 10.7528 18.237V15C10.7528 14.586 10.4168 14.25 10.0028 14.25H6.09678C5.40078 14.25 4.47874 14.123 4.04075 13.515C3.68475 13.02 3.65474 12.209 3.96274 11.288L5.96177 5.28802C6.31677 4.22102 6.53968 3.74902 8.09568 3.74902H15.9997V12.249C15.6757 12.251 15.3897 12.458 15.2887 12.765ZM20.2497 11.5C20.2497 11.914 19.9127 12.25 19.4997 12.25H17.4997V3.75H19.4997C19.9127 3.75 20.2497 4.086 20.2497 4.5V11.5Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Link>
                          <Link href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M22.6919 14.2871C22.6539 14.3791 22.599 14.462 22.53 14.531L18.53 18.531C18.384 18.677 18.192 18.751 18 18.751C17.808 18.751 17.616 18.678 17.47 18.531C17.177 18.238 17.177 17.763 17.47 17.47L20.1899 14.75H7C4.933 14.75 3.25 13.068 3.25 11V6C3.25 5.586 3.586 5.25 4 5.25C4.414 5.25 4.75 5.586 4.75 6V11C4.75 12.241 5.76 13.25 7 13.25H20.189L17.469 10.53C17.176 10.237 17.176 9.76199 17.469 9.46899C17.762 9.17599 18.237 9.17599 18.53 9.46899L22.53 13.469C22.599 13.538 22.6539 13.6209 22.6919 13.7129C22.7679 13.8969 22.7679 14.1031 22.6919 14.2871Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Link>
                        </div>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment-reply"></div>
            </div>
            <div
              className="blog-details__commentForm fade_up_anim"
              data-delay=".72"
            >
              <h4 className="h4">Leave a Reply</h4>
              <p>
                Your email address will not be published. Required fields are
                marked*
              </p>
              <form className="blog-details__commentForm-form">
                <div className="input-wrapper input-wrapper-devide">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name*"
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email*"
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Company"
                  />
                </div>
                <div className="input-wrapper">
                  <textarea
                    name="comment"
                    id="comment"
                    placeholder="Comment*"
                  ></textarea>
                </div>
                <div className="terms-and-condition">
                  <input id="checkbox" type="checkbox" />
                  <label htmlFor="checkbox">
                    I agree to these
                    <Link href="#">Terms and Conditions</Link>.
                  </label>
                </div>
                <button className="common-btn border-light w-100 justify-content-center">
                  <span>Post Comment</span>
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 fade_up_anim" data-delay=".4">
            <div className="widget">
              <SearchWidget title="Search" placeholder="Search here" />
              <CategoriesWidget
                title={categories.title}
                categories={categories.categories}
              />
              <RecentPostsWidget
                title={recentPosts.title}
                posts={recentPosts.posts}
              />
              <TagsWidget title={tags.title} tags={tags.tags} />
              <NewsletterWidget
                title={newsletter.title}
                placeholder={newsletter.placeholder}
                buttonText={newsletter.buttonText}
              />
              <GalleryWidget
                title={gallery.title}
                galleryItems={gallery.galleryItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
