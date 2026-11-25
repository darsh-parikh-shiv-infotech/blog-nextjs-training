
import "server-only";

import { BLOG_API_ROUTES, MESSAGES } from "@/lib/constants/constant";
import type { Blog } from "@/lib/types/common.types";

const API_URL = process.env.JSON_SERVER_URL;

if (!API_URL) {
  throw new Error("JSON_SERVER_URL is not configured.");
}

const BLOG_ENDPOINT = `${API_URL}${BLOG_API_ROUTES.BLOGS}`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(MESSAGES.COMMON.SOMETHING_WENT_WRONG);
  }

  return response.json();
}

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(BLOG_ENDPOINT, {
    cache: "no-store",
  });

  return handleResponse<Blog[]>(response);
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  return getBlogs();
}

export async function getBlogBySlug(
  slug: string,
): Promise<Blog | null> {
  const response = await fetch(
    `${BLOG_ENDPOINT}?slug=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );

  const blogs = await handleResponse<Blog[]>(response);

  return blogs[0] ?? null;
}

export async function getBlogById(
  id: string,
): Promise<Blog | null> {
  const response = await fetch(`${BLOG_ENDPOINT}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  return handleResponse<Blog>(response);
}

export async function getBlogsByOwner(
  ownerId: string,
): Promise<Blog[]> {
  const response = await fetch(
    `${BLOG_ENDPOINT}?ownerId=${encodeURIComponent(ownerId)}`,
    {
      cache: "no-store",
    },
  );

  return handleResponse<Blog[]>(response);
}

export async function createBlog(blog: Blog): Promise<Blog> {
  const response = await fetch(BLOG_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  return handleResponse<Blog>(response);
}