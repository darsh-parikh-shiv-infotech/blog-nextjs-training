"use server";

import { revalidatePath } from "next/cache";

import { createBlog } from "@/lib/services/blog.service";
import { BLOG_CATEGORIES } from "@/lib/constants/blog.data";
import { MESSAGES, ROUTES } from "@/lib/constants/constant";
import { createBlogSchema } from "@/lib/validations/blog.schema";
import { sanitizeBlogHtml } from "@/lib/utils/sanitize-blog-html";
import { requireUser } from "@/lib/utils/utils";
import type { Blog } from "@/lib/types/common.types";
import { getBlogContentText } from "@/lib/utils/blog-content";

interface CreateBlogResult {
  success: boolean;
  message?: string;
}

export async function createBlogAction(
  values: unknown,
): Promise<CreateBlogResult> {
  try {
    const user = await requireUser();

    const validatedValues = await createBlogSchema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (
      !BLOG_CATEGORIES.some(
        (category) => category === validatedValues.category,
      ) ||
      validatedValues.category === "All stories"
    ) {
      return {
        success: false,
        message: MESSAGES.COMMON.INVALID_FORM,
      };
    }

    const title = validatedValues.title.trim();

    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now()}`;

    const content = sanitizeBlogHtml(validatedValues.content);
    const contentText = getBlogContentText(content);
    const wordCount = contentText.split(/\s+/).filter(Boolean).length;

    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const now = new Date().toISOString();

    const blog: Blog = {
      id: crypto.randomUUID(),
      slug,
      title,
      category: validatedValues.category,
      imageUrl: validatedValues.imageUrl || "",
      author: user.name,
      ownerId: user.id,
      createdAt: now,
      updatedAt: now,
      readTime,
      content,
    };

    await createBlog(blog);

    revalidatePath(ROUTES.MY_BLOGS);
    revalidatePath(ROUTES.BLOGS);
    revalidatePath(ROUTES.HOME);

    return {
      success: true,
      message: MESSAGES.BLOG.CREATED,
    };
  } catch (error) {
    console.error("Create blog error:", error);

    return {
      success: false,
      message: MESSAGES.BLOG.CREATE_FAILED,
    };
  }
}
