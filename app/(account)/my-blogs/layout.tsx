import { Suspense } from "react";
import type { ReactNode } from "react";

import Loader from "@/components/common/Loader";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { COMMON_UI_STRING } from "@/lib/constants/constant";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<Loader message={COMMON_UI_STRING.CHECKING_AUTH} />}>
        <SiteHeader />
      </Suspense>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
