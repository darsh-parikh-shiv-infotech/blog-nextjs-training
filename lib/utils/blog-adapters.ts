import type { Blog } from "@/lib/types/common.types";
import type {
  DummyJSONPost,
  DummyJSONUser,
} from "@/lib/types/dummyjson.types";

import { getBlogContentText } from "@/lib/utils/blog-content";

const CATEGORY_MAP: Record<string, string> = {
  history: "Culture",
  american: "Culture",
  crime: "Culture",
  fiction: "Ideas",
  classic: "Ideas",
  love: "Culture",
  books: "Ideas",
  education: "Development",
  technology: "Development",
  science: "Development",
  programming: "Development",
  design: "Design",
  business: "Product",
  culture: "Culture",
  ideas: "Ideas",
  development: "Development",
  product: "Product",
};

function getCategory(tags: string[]): string {
  for (const tag of tags) {
    const category = CATEGORY_MAP[tag.toLowerCase()];

    if (category) {
      return category;
    }
  }

  return "Development";
}

function getReadTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function getSlug(title: string, id: number): string {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${titleSlug}-${id}`;
}

function convertBodyToHtml(body: string): string {
  const escapedBody = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  return escapedBody
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

export function mapDummyJSONPostToBlog(
  post: DummyJSONPost,
  user?: DummyJSONUser,
): Blog {
  const content = convertBodyToHtml(post.body);

  return {
    id: String(post.id),
    slug: getSlug(post.title, post.id),
    title: post.title,
    category: getCategory(post.tags),
    author: user
      ? `${user.firstName} ${user.lastName}`
      : `User ${post.userId}`,
    ownerId: String(post.userId),
    imageUrl: user?.image ?? "",
    createdAt: new Date(
      Date.UTC(2025, 0, 1) + post.id * 86_400_000,
    ).toISOString(),
    updatedAt: new Date(
      Date.UTC(2025, 0, 1) + post.id * 86_400_000,
    ).toISOString(),
    readTime: getReadTime(post.body),
    content,
  };
}