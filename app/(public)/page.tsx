import Link from "next/link";

import { BlogGrid } from "@/components/public/blog-grid";
import { HOME_CONTENT, ROUTES } from "@/lib/constants/constant";
import { getBlogs } from "@/lib/services/blog.service";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Suspense fallback={<BlogListingSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}

async function HomePageContent() {
  const blogs = await getBlogs();
  const featuredBlogs = blogs.slice(0, 3);

  return (
    <>
      <section>
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-10 lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#929087]">
              {HOME_CONTENT.EYEBROW.toUpperCase()}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              {HOME_CONTENT.HEADING}
            </h1>
          </div>

          <Link
            href={ROUTES.BLOGS}
            className="mt-6 inline-flex text-sm font-semibold text-[#66675d] hover:text-[#24231f]"
          >
            {HOME_CONTENT.VIEW_ALL}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-6 lg:p-10">
        <BlogGrid blogs={featuredBlogs} />
      </section>
    </>
  );
}

function BlogListingSkeleton() {
  return (
    <section className="container mx-auto animate-pulse space-y-8 px-4 py-12">
      <div className="space-y-3">
        <div className="h-9 w-48 rounded-md bg-muted" />
        <div className="h-5 w-72 rounded-md bg-muted" />
      </div>

      <div className="h-10 w-full max-w-md rounded-md bg-muted" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-video rounded-xl bg-muted" />
            <div className="h-5 w-3/4 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
