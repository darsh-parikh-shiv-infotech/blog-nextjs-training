import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  PenLine,
} from "lucide-react";
import { APP_CONFIG, ROUTES } from "@/lib/constants/constant";

const featuredArticles = [
  {
    category: "DESIGN",
    readTime: "6 min read",
    title: "The quiet power of thoughtful design",
    description:
      "A closer look at the small decisions that make digital experiences feel clear, useful, and human.",
    author: "Olivia Rhye",
    date: "May 18, 2026",
    accent: "from-amber-100 via-orange-50 to-rose-100",
    number: "01",
  },
  {
    category: "DEVELOPMENT",
    readTime: "8 min read",
    title: "Building for the web, one good decision at a time",
    description:
      "Good engineering is rarely about clever tricks. It is about making the next decision easier.",
    author: "Phoenix Baker",
    date: "May 12, 2026",
    accent: "from-sky-100 via-cyan-50 to-indigo-100",
    number: "02",
  },
  {
    category: "CULTURE",
    readTime: "5 min read",
    title: "Making room for a little more curiosity",
    description:
      "Why the best ideas often begin when we slow down, look around, and ask better questions.",
    author: "Lana Steiner",
    date: "May 06, 2026",
    accent: "from-emerald-100 via-lime-50 to-yellow-100",
    number: "03",
  },
];

const categories = [
  "All stories",
  "Design",
  "Development",
  "Culture",
  "Product",
  "Ideas",
];

export default function HomePage() {
  return (
    <main className="min-h-screen  text-[#24231f]">
      <header className="border-b border-[#e9e6df]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href={ROUTES.HOME} className="flex items-center gap-2.5">
            <span className="text-xl font-semibold tracking-tight">
              {APP_CONFIG.NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#68675f] md:flex">
            <Link href={ROUTES.HOME} className="text-[#24231f]">
              Home
            </Link>
            <Link
              href={ROUTES.BLOGS}
              className="transition-colors hover:text-[#24231f]"
            >
              Stories
            </Link>
            <a
              href="#about"
              className="transition-colors hover:text-[#24231f]"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="hidden text-sm font-medium text-[#68675f] transition-colors hover:text-[#24231f] sm:inline-flex"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <section id="latest" className="border-t border-[#e9e6df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#929087]">
                FRESH FROM THE JOURNAL
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                A few good reads.
              </h2>
            </div>

            <Link
              href={ROUTES.BLOGS}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#66675d] hover:text-[#24231f]"
            >
              View all stories <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-9 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <span
                key={category}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                  index === 0
                    ? "bg-[#252720] text-white"
                    : "border border-[#e9e6df] text-[#77756d]"
                }`}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <article key={article.number} className="group">
                <div
                  className={`relative flex aspect-[1.45] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${article.accent} p-6`}
                >
                  <span className="absolute top-5 right-6 font-serif text-6xl text-black/10">
                    {article.number}
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/45 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-[#56564d]">
                    {article.category}
                  </span>
                </div>

                <div className="pt-5">
                  <div className="flex items-center gap-2 text-xs text-[#96938a]">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-3 text-xl leading-snug font-semibold tracking-[-0.025em] transition-colors group-hover:text-[#777b60]">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#858278]">
                    {article.description}
                  </p>

                  <p className="mt-5 text-xs font-semibold text-[#5f6056]">
                    By {article.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
