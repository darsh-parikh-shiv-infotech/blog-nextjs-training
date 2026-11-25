import { Suspense } from "react";
import Link from "next/link";

import Loader from "@/components/common/Loader";
import { BlogGrid } from "@/components/public/blog-grid";
import {
  APP_CONFIG,
  BLOG_PAGE_CONTENT,
  COMMON_UI_STRING,
  MY_BLOGS_CONTENT,
  ROUTES,
} from "@/lib/constants/constant";
import { getBlogsByOwner } from "@/lib/services/blog.service";
import { requireUser } from "@/lib/utils/utils";

interface MyBlogContentPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default function MyBlogsPage({ searchParams }: MyBlogContentPageProps) {
  return (
    <Suspense fallback={<MyBlogsLoader />}>
      <MyBlogsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function MyBlogsContent({ searchParams }: MyBlogContentPageProps) {
  const params = await searchParams;
  const user = await requireUser();
  const blogs = await getBlogsByOwner(user.id);

  const requestedPage = Number(params.page);

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const totalPages = Math.ceil(blogs.length / APP_CONFIG.PAGE_SIZE);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * APP_CONFIG.PAGE_SIZE;

  const paginatedBlogs = blogs.slice(
    startIndex,
    startIndex + APP_CONFIG.PAGE_SIZE,
  );

  function getPageUrl(page: number) {
    const query = new URLSearchParams();
    query.set("page", String(page));

    return `/my-blogs?${query.toString()}`;
  }

  return (
    <section className="container mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {MY_BLOGS_CONTENT.TITLE}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {MY_BLOGS_CONTENT.GREETING} {user.name}.
          </p>
        </div>

        <Link
          href={`${ROUTES.MY_BLOGS}/create`}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {MY_BLOGS_CONTENT.CREATE_BLOG}
        </Link>
      </div>

      {blogs.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            {blogs.length} {MY_BLOGS_CONTENT.BLOG_COUNT}
          </p>

          <BlogGrid blogs={paginatedBlogs} showOwnerActions />

          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}–{startIndex + paginatedBlogs.length} of{" "}
              {blogs.length} {BLOG_PAGE_CONTENT.TITLE}
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
        <div className="rounded-xl border border-dashed px-6 py-20 text-center">
          <h2 className="text-lg font-semibold">
            {MY_BLOGS_CONTENT.EMPTY_TITLE}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {MY_BLOGS_CONTENT.EMPTY_DESCRIPTION}
          </p>

          <Link
            href={`${ROUTES.MY_BLOGS}/create`}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {MY_BLOGS_CONTENT.CREATE_FIRST_BLOG}
          </Link>
        </div>
      )}
    </section>
  );
}

function MyBlogsLoader() {
  return <Loader message={COMMON_UI_STRING.LOADING} />;
}
