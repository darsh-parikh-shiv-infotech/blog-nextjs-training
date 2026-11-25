import { Blog } from "../types/common.types";

export const BLOG_CATEGORIES = [
  "All stories",
  "Design",
  "Development",
  "Culture",
  "Product",
  "Ideas",
] as const;

export const BLOGS: Blog[] | null = [];