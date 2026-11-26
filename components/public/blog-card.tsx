import Link from "next/link";

import {
  getBlogDetailsRoute,
  getMyBlogEditRoute,
} from "@/lib/constants/constant";
import type { Blog } from "@/lib/types/common.types";
import { DeleteBlogButton } from "../blog/delete-blog-button";
import { getBlogExcerpt } from "@/lib/utils/blog-content";

type BlogCardProps = {
  blog: Blog;
  showOwnerActions?: boolean;
};

export function BlogCard({ blog, showOwnerActions = false }: BlogCardProps) {
  const dateValue =
    blog.createdAt || (blog as Blog & { publishedAt?: string }).publishedAt;

  const formattedDate = dateValue
    ? new Date(dateValue).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const accentClass = blog.accentClass ?? "from-stone-200 to-stone-400";

  return (
    <article className="group">
      <Link href={getBlogDetailsRoute(blog.slug)}>
        <div
          className={`relative flex aspect-[1.45] items-end overflow-hidden rounded-2xl bg-linear-to-br ${accentClass} p-6`}
        >
          <span className="absolute top-5 right-6 font-serif text-6xl text-black/10">
            {blog.id.padStart(2, "0")}
          </span>

          <span className="rounded-full border border-black/10 bg-white/45 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-[#56564d]">
            {blog.category.toUpperCase()}
          </span>
        </div>

        <div className="pt-5">
          <div className="flex items-center gap-2 text-xs text-[#96938a]">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>

          <h2 className="mt-3 text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-[#777b60]">
            {blog.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#858278]">
            {getBlogExcerpt(blog.content)}
          </p>

          <p className="mt-5 text-xs font-semibold text-[#5f6056]">
            By {blog.author}
          </p>
        </div>
      </Link>
      {showOwnerActions && (
        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <Link
            href={getMyBlogEditRoute(blog.id)}
            className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            Edit
          </Link>
          <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
        </div>
      )}
    </article>
  );
}
