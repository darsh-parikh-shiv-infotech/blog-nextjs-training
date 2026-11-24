import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/utils/utils";
import { ROUTES } from "@/lib/constants/constant";
import Loader from "@/components/common/Loader";

async function LoginContent() {
  const user = await getCurrentUser();

  if (user) {
    redirect(ROUTES.MY_BLOGS);
  }

  return <LoginForm />;
}

function LoginLoader() {
  return (
    <Loader message="Checking Authetication.." />
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoader />}>
      <LoginContent />
    </Suspense>
  );
}