import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOGS } from "@/lib/constants/blog.data";
import {
  APP_CONFIG,
  BLOG_DETAILS_CONTENT,
  ROUTES,
} from "@/lib/constants/constant";
import BackButton from "@/components/common/BackButton";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOGS.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: `${BLOG_DETAILS_CONTENT.NOT_FOUND_TITLE} | ${APP_CONFIG.NAME}`,
    };
  }

  return {
    title: `${blog.title} | ${APP_CONFIG.NAME}`,
    description: blog.description,
  };
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  return (
    <Suspense fallback={<BlogDetailsSkeleton />}>
      {params.then(({ slug }) => (
        <BlogDetailsContent slug={slug} />
      ))}
    </Suspense>
  );
}

async function BlogDetailsContent({ slug }: { slug: string }) {
  const blog = BLOGS.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <BackButton
        href={ROUTES.BLOGS}
        message={BLOG_DETAILS_CONTENT.BACK_TO_BLOGS}
      />

      <div className="mt-10">
        <p className="text-xs font-semibold tracking-[0.15em] text-[#929087]">
          {blog.category.toUpperCase()}
        </p>

        <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
          {blog.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-[#858278]">
          {blog.description}
        </p>

        <div className="mt-6 flex gap-2 text-sm text-[#96938a]">
          <span>{BLOG_DETAILS_CONTENT.WRITTEN_BY}</span>
          <span>{blog.author}</span>
          <span>·</span>
          <span>{blog.publishedAt}</span>
          <span>·</span>
          <span>{blog.readTime}</span>
        </div>
      </div>

      <div
        className={`mt-10 aspect-video rounded-2xl bg-linear-to-br ${blog.accentClass}`}
      />

      <div className="mt-10 space-y-6 text-base leading-8 text-[#55534c]">
        {blog.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function BlogDetailsSkeleton() {
  return (
    <div className="container mx-auto animate-pulse space-y-6 px-4 py-12">
      <div className="h-10 w-3/4 rounded-md bg-muted" />
      <div className="h-5 w-1/2 rounded-md bg-muted" />
      <div className="h-80 w-full rounded-xl bg-muted" />
      <div className="h-4 w-full rounded-md bg-muted" />
      <div className="h-4 w-5/6 rounded-md bg-muted" />
    </div>
  );
}
