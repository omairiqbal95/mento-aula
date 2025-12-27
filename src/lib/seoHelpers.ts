export function buildCanonical(pathname: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(pathname, base).toString();
}

export function buildArticleMetadata(args: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
}) {
  const url = `/blog/${args.slug}`;
  return {
    title: args.title,
    description: args.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: args.title,
      description: args.description,
      url,
      images: args.image ? [args.image] : undefined,
      tags: args.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: args.image ? [args.image] : undefined,
    },
    other: {
      "article:published_time": args.datePublished,
      "article:modified_time": args.dateModified ?? args.datePublished,
    },
  } as const;
}
