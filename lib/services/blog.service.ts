import "server-only";

import {
  fetchPosts,
  fetchPostById,
  fetchPostsByUser,
  fetchUsers,
  addPost,
  updatePost,
  removePost,
  fetchUserById,
} from "@/lib/services/dummyjson.service";

import type { Blog } from "@/lib/types/common.types";
import type { DummyJSONPost } from "@/lib/types/dummyjson.types";
import { mapDummyJSONPostToBlog } from "../utils/blog-adapters";

async function getUsersMap() {
  const { users } = await fetchUsers();

  return new Map(users.map((user) => [user.id, user]));
}

export async function getBlogs(): Promise<Blog[]> {
  const [{ posts }, usersMap] = await Promise.all([
    fetchPosts(0),
    getUsersMap(),
  ]);

  return posts.map((post) =>
    mapDummyJSONPostToBlog(post, usersMap.get(post.userId)),
  );
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  return getBlogs();
}

export async function getBlogById(
  id: string,
): Promise<Blog | null> {
  try {
    const post = await fetchPostById(id);
    const user = await fetchUserById(post.userId);

    return mapDummyJSONPostToBlog(post, user);
  } catch {
    return null;
  }
}

export async function getBlogBySlug(
  slug: string,
): Promise<Blog | null> {
  const blogs = await getBlogs();

  return blogs.find((blog) => blog.slug === slug) ?? null;
}

export async function getBlogsByOwner(
  ownerId: string,
): Promise<Blog[]> {
  const [{ posts }, usersMap] = await Promise.all([
    fetchPostsByUser(ownerId),
    getUsersMap(),
  ]);
  return posts.map((post) =>
    mapDummyJSONPostToBlog(post, usersMap.get(post.userId)),
  );
}

export async function createBlog(
  blog: Blog,
): Promise<Blog> {
  const result = await addPost({
    title: blog.title,
    body: blog.content as string,
    userId: Number(blog.ownerId),
    tags: [blog.category.toLowerCase()],
  });

  return {
    ...blog,
    id: String(result.id),
  };
}

export async function updateBlog(
  id: string,
  blog: Partial<Blog>,
): Promise<Blog> {
  const payload: Partial<DummyJSONPost> = {};

  if (blog.title) {
    payload.title = blog.title;
  }

  if (blog.content) {
    payload.body = blog.content as string;
  }

  if (blog.category) {
    payload.tags = [blog.category.toLowerCase()];
  }

  const result = await updatePost(id, payload);

  return {
    ...blog,
    id: String(result.id),
  } as Blog;
}

export async function deleteBlog(id: string): Promise<void> {
  await removePost(id);
}