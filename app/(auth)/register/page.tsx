import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/utils/utils";
import { ROUTES } from "@/lib/constants/constant";
import Loader from "@/components/common/Loader";
import { Suspense } from "react";

async function RegisterContent() {
  const user = await getCurrentUser();

  if (user) {
    redirect(ROUTES.MY_BLOGS);
  }

  return <RegisterForm />;
}

function RegisterLoader() {
  return <Loader message="Checking Authetication.." />;
}

export default async function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoader />}>
      <RegisterContent />
    </Suspense>
  );
}
