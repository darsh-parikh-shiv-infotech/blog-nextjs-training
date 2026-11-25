import Link from "next/link";

import {
  APP_CONFIG,
  NAVIGATION_LABELS,
  ROUTES,
} from "@/lib/constants/constant";
import { getCurrentUser } from "@/lib/utils/utils";
import { LogoutButton } from "@/components/auth/logout-button";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e6df] bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand */}
        <Link href={ROUTES.HOME}>
          <span className="text-xl font-semibold tracking-tight">
            {APP_CONFIG.NAME}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-[#68675f]">
          <Link
            href={ROUTES.HOME}
            className="transition-colors hover:text-foreground"
          >
            {NAVIGATION_LABELS.HOME}
          </Link>

          <Link
            href={ROUTES.BLOGS}
            className="transition-colors hover:text-foreground"
          >
            {NAVIGATION_LABELS.STORIES}
          </Link>

          {user && (
            <Link
              href={ROUTES.MY_BLOGS}
              className="transition-colors hover:text-foreground"
            >
              {NAVIGATION_LABELS.MY_BLOGS}
            </Link>
          )}
        </nav>

        {/* Authentication */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:block">
                Hi, {user.name}
              </span>

              <LogoutButton />
            </>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {NAVIGATION_LABELS.LOGIN}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
