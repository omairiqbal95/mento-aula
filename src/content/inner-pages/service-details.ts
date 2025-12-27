import serviceDetailsThumbnail from "@/assets/images/service-details/service-details-thumbnail.png";
import blockquoteAuthor from "@/assets/images/service-details/blockquote-author.png";
import blockquoteBackground from "@/assets/images/service-details/blockquote.png";
import consultationWidgetBackground from "@/assets/images/widget/consultation-widget-1.png";
import { ServiceDetailsContent } from "@/types/inner-pages/service-details";

export const serviceDetailsContent: ServiceDetailsContent = {
  article: {
    title: "Unlock the Development",
    introText: [
      "The Tech side of startups can sometimes be very fluid and contain a lot of unknowns. What tech stack to use? Which components might be overkill for now but worth keeping an eye on in the future? How to balance the pace of business features development while keeping the quality bar high enough to have a maintainable codebase?",
      "Here I want to share our experience building https://cleanbee.syzygy-ai.com/ from the ground up — how we shaped our processes based on needs and how our processes evolved as we extended our tech stack with new components.",
    ],
    thumbnail: serviceDetailsThumbnail,
    processTitle: "Start Shaping the Process",
    processDescription: "What we have at the start:",
    processList: [
      "Less than a dozen developers — in-house team and temporary contractors who want to and can work asynchronously",
      "Completely greenfield project — no single line of code has been written yet. Requirements are vague, but they already started shaping into something",
      "Tech-wise — the clear need for a backend that should talk with mobile clients",
      "Some simple web frontend — static pages should be enough! (nope)",
    ],
    processText:
      "We have started simple — code at GitHub and a PR-based flow with a single requirement — to have tickets split table to be delivered in 1–3 days. This required some practice of story slicing, and it seems that a sense of visible fast progress is shown through the ability to move tickets to Done. This can be a great motivational factor for the team to onboard that idea.",
    roadmapTitle: "Our Simple Roadmap",
    roadmapDescription:
      "Nowadays, the choice of frameworks is really wide, but again, due to some experience with Flutter, we decided to give it a go. Within mobile development, one of the important aspects to better decide on is state management.",
    roadmap: [
      {
        id: "collect-doc",
        icon: "document",
        title: "Collect Doc",
        description: "We collect require documents send for check",
      },
      {
        id: "check-finalize",
        icon: "send",
        title: "Check & Finalize",
        description: "We check the document and send for final approval",
      },
      {
        id: "approve",
        icon: "approve",
        title: "Approve",
        description: "After approve you'll ready to use your software",
      },
    ],
    blockquote: {
      text: "We are witnessing an amalgamation of technologies that is poised to redefine our world. I am truly exhilarated by the trajectory that IT solutions are taking as we peer into the future.",
      backgroundImage: blockquoteBackground,
      author: {
        name: "Willamson Hussy",
        designation: "CEO of Kingtech",
        avatar: blockquoteAuthor,
      },
    },
    finalTitle: "How did we get into Terraform?",
    finalText: [
      "The backend, a part of the DB, also should have some object/file storage. Sooner or later, we also should have DNS so that our services are ready to play with the big cruel world.",
      "The choice of cloud provider was purely based on existing expertise within the team. We already use AWS for other projects, so we decided to stick with it. For sure, it is possible to do everything in the AWS console, but as times go, things become a classic big ball of mud that everyone is terrified to touch, and no one remembers why this bit exists at all.",
    ],
  },
  sidebar: {
    search: {
      title: "Search",
      placeholder: "Search here",
    },
    categories: {
      title: "Categories",
      items: [
        { id: "design", name: "Design", href: "#" },
        { id: "development", name: "Development", href: "#" },
        { id: "digital-marketing", name: "Digital Marketing", href: "#" },
        { id: "seo", name: "SEO", href: "#" },
        { id: "consulting", name: "Consulting", href: "#" },
        { id: "others", name: "Others", href: "#" },
      ],
    },
    consultation: {
      title: "Do You Need Any Consulting Service?",
      buttonText: "Book Free Consultation",
      buttonHref: "/contact",
      backgroundImage: consultationWidgetBackground,
    },
    download: {
      buttonText: "Download Brochure",
      downloadHref: "path_to_file",
      fileName: "proposed_file_name",
    },
  },
  currentYear: new Date().getFullYear(),
};
