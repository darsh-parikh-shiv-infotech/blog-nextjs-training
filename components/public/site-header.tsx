import Link from "next/link";

import { APP_CONFIG, NAVIGATION_LABELS, ROUTES } from "@/lib/constants/constant";

export function SiteHeader() {
  return (
    <header className="border-b border-[#e9e6df]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href={ROUTES.HOME}>
          <span className="text-xl font-semibold tracking-tight">
            {APP_CONFIG.NAME}
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-[#68675f]">
          <Link
            href={ROUTES.HOME}
            className="transition-colors hover:text-[#24231f]"
          >
            {NAVIGATION_LABELS.HOME}
          </Link>

          <Link
            href={ROUTES.BLOGS}
            className="transition-colors hover:text-[#24231f]"
          >
            {NAVIGATION_LABELS.STORIES}
          </Link>
        </nav>

        <Link
          href={ROUTES.LOGIN}
          className="text-sm font-medium text-[#68675f] transition-colors hover:text-[#24231f]"
        >
          {NAVIGATION_LABELS.LOGIN}
        </Link>
      </div>
    </header>
  );
}