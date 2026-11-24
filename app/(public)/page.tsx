import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, PenLine } from "lucide-react";
import { APP_CONFIG, HOME_CONTENT, ROUTES } from "@/lib/constants/constant";
import { BLOGS } from "@/lib/constants/blog.data";
import { SiteHeader } from "@/components/public/site-header";
import { BlogGrid } from "@/components/public/blog-grid";

export default function HomePage() {
  const featuredBlogs = BLOGS.slice(0, 3);

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl flex justify-between px-6 py-10 lg:px-10">
          <div className="">
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
