import Link from "next/link";

import {
  APP_CONFIG,
  NAVIGATION_LABELS,
  ROUTES,
} from "@/lib/constants/constant";

export function SiteFooter() {
  return (
    <footer className="border-t w-full">
      <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {APP_CONFIG.CURRENT_FULL_YEAR} {APP_CONFIG.NAME}. All rights
          reserved.
        </p>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
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
        </nav>
      </div>
    </footer>
  );
}
