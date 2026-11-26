import BackButton from "@/components/common/BackButton";
import { BlogGrid } from "@/components/public/blog-grid";
import {
  APP_CONFIG,
  BLOG_PAGE_CONTENT,
  COMMON_UI_STRING,
  ROUTES,
} from "@/lib/constants/constant";
import { getBlogs } from "@/lib/services/blog.service";
import Link from "next/link";
import { Suspense } from "react";

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
}

interface BlogListingContentProps {
  searchParams: {
    page?: string;
    q?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;

  return (
    <Suspense fallback={<BlogListingSkeleton />}>
      <BlogListingContent searchParams={params} />
    </Suspense>
  );
}

async function BlogListingContent({ searchParams }: BlogListingContentProps) {
  const blogs = await getBlogs();

  const requestedPage = Number(searchParams.page);

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const searchQuery = searchParams.q?.trim() ?? "";

  const filteredBlogs = blogs.filter((blog) => {
    const searchableContent = `${blog.title} ${blog.content}`
      .toLowerCase()
      .replace(/<[^>]*>/g, " ");

    return searchableContent.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBlogs.length / APP_CONFIG.PAGE_SIZE);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * APP_CONFIG.PAGE_SIZE;

  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + APP_CONFIG.PAGE_SIZE,
  );

  function getPageUrl(page: number) {
    const query = new URLSearchParams();

    query.set("page", String(page));

    if (searchQuery) {
      query.set("q", searchQuery);
    }

    return `/blogs?${query.toString()}`;
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <BackButton href={ROUTES.HOME} message={BLOG_PAGE_CONTENT.BACK_TO_HOME} />

      <div className="mb-8">
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
          {BLOG_PAGE_CONTENT.HEADING}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#858278]">
          {BLOG_PAGE_CONTENT.DESCRIPTION}
        </p>
      </div>

      <form action="/blogs" method="GET" className="mb-8 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search articles..."
          className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <button
          type="submit"
          className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Search
        </button>
      </form>

      {paginatedBlogs.length > 0 ? (
        <>
          <BlogGrid blogs={paginatedBlogs} />

          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–{startIndex + paginatedBlogs.length} of{" "}
              {filteredBlogs.length} {BLOG_PAGE_CONTENT.TITLE}
            </p>

            <div className="flex items-center gap-2">
              {safePage > 1 && (
                <Link
                  href={getPageUrl(safePage - 1)}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                >
                  {COMMON_UI_STRING.PREVIOUS}
                </Link>
              )}

              <span className="px-3 text-sm text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>

              {safePage < totalPages && (
                <Link
                  href={getPageUrl(safePage + 1)}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
                >
                  {COMMON_UI_STRING.NEXT}
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">
            {BLOG_PAGE_CONTENT.NO_BLOGS_FOUND}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {BLOG_PAGE_CONTENT.FALLBACK_NO_BLOGS_FOUND}
          </p>

          {searchQuery && (
            <Link
              href="/blogs"
              className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
            >
              {COMMON_UI_STRING.CLEAR_SEARCH}
            </Link>
          )}
        </div>
      )}
    </section>
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
        {Array.from({ length: 6 }).map((_, index) => (
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
