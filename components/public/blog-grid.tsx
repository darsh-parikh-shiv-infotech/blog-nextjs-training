import type { Blog } from "@/lib/types/common.types";
import { BlogCard } from "./blog-card";
import { BLOG_PAGE_CONTENT } from "@/lib/constants/constant";

type BlogGridProps = {
  blogs: Blog[];
  showOwnerActions?: boolean;
};

export function BlogGrid({
  blogs,
  showOwnerActions = false,
}: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-[#858278]">
        {BLOG_PAGE_CONTENT.EMPTY}
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          showOwnerActions={showOwnerActions}
        />
      ))}
    </div>
  );
}