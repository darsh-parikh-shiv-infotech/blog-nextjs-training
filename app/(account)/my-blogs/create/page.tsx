import { BlogForm } from "@/components/blog/blog-form";
import BackButton from "@/components/common/BackButton";
import Loader from "@/components/common/Loader";
import { BLOG_FORM_CONTENT, ROUTES } from "@/lib/constants/constant";
import { requireUser } from "@/lib/utils/utils";
import { Suspense } from "react";
import { createBlogAction } from "./actions";

export default async function CreateBlogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateBlogContent />
    </Suspense>
  );
}

export async function CreateBlogContent() {
  await requireUser();
  return (
    <section className="container mx-auto max-w-4xl px-6 py-12 lg:px-10">
      <BackButton href={ROUTES.MY_BLOGS} message={BLOG_FORM_CONTENT.BACK} />

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {BLOG_FORM_CONTENT.TITLE}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {BLOG_FORM_CONTENT.DESCRIPTION}
        </p>
      </div>

      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <BlogForm mode="create" onSubmit={createBlogAction} />
      </div>
    </section>
  );
}
