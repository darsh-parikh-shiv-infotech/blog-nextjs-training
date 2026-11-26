import { BlogForm } from "@/components/blog/blog-form";
import BackButton from "@/components/common/BackButton";
import Loader from "@/components/common/Loader";
import { BLOG_FORM_CONTENT, ROUTES } from "@/lib/constants/constant";
import { getBlogById } from "@/lib/services/blog.service";
import { sanitizeBlogHtml } from "@/lib/utils/sanitize-blog-html";
import { requireUser } from "@/lib/utils/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { updateBlogAction } from "./actions";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}
export default function EditBlogPage({ params }: EditBlogPageProps) {
  return (
    <Suspense fallback={<Loader />}>
      <EditBlogContent params={params} />
    </Suspense>
  );
}

async function EditBlogContent({ params }: EditBlogPageProps) {
  const { id } = await params;

  const user = await requireUser();
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  if (blog.ownerId !== user.id) {
    notFound();
  }

  return (
    <section className="container mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <BackButton href={ROUTES.MY_BLOGS} message={BLOG_FORM_CONTENT.BACK} />

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {BLOG_FORM_CONTENT.EDIT_TITLE}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {BLOG_FORM_CONTENT.EDIT_DESCRIPTION}
        </p>
      </div>
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <BlogForm
          key={blog.id}
          mode="edit"
          initialValues={{
            title: blog.title,
            category: blog.category,
            imageUrl: blog.imageUrl ?? "",
            content: sanitizeBlogHtml(blog.content),
          }}
          onSubmit={updateBlogAction.bind(null, blog.id)}
        />
      </div>
    </section>
  );
}
