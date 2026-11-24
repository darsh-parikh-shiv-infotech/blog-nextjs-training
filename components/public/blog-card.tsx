import Link from "next/link";

import { getBlogDetailsRoute } from "@/lib/constants/constant";
import { Blog } from "@/lib/types/common.types";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={getBlogDetailsRoute(blog.slug)}>
        <div
          className={`relative flex aspect-[1.45] items-end overflow-hidden rounded-2xl bg-linear-to-br ${blog.accentClass} p-6`}
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
            <span>{blog.publishedAt}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>

          <h2 className="mt-3 text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-[#777b60]">
            {blog.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#858278]">
            {blog.description}
          </p>

          <p className="mt-5 text-xs font-semibold text-[#5f6056]">
            By {blog.author}
          </p>
        </div>
      </Link>
    </article>
  );
}