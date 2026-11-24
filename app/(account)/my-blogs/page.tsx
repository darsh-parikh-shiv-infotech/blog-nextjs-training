import { Suspense } from "react";
import { requireUser } from "@/lib/utils/utils";
import Loader from "@/components/common/Loader";
import { COMMON_UI_STRING } from "@/lib/constants/constant";

async function MyBlogsContent() {
  const user = await requireUser();

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          My Blogs
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome, {user.name}. Manage your articles here.
        </p>
      </div>

      <div className="rounded-lg border border-dashed px-6 py-16 text-center">
        <h2 className="text-lg font-semibold">
          Your writing space is ready
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Your blog management features will appear here.
        </p>
      </div>
    </section>
  );
}

function MyBlogsLoader() {
  return (
    <Loader message={COMMON_UI_STRING.LOADING} />
  );
}

export default function MyBlogsPage() {
  return (
    <Suspense fallback={<MyBlogsLoader />}>
      <MyBlogsContent />
    </Suspense>
  );
}