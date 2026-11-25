"use server";

import { revalidatePath } from "next/cache";

import { updateBlog } from "@/lib/services/blog.service";
import { getBlogById } from "@/lib/services/blog.service";

import { BLOG_CATEGORIES } from "@/lib/constants/blog.data";
import { MESSAGES, ROUTES } from "@/lib/constants/constant";

import { createBlogSchema } from "@/lib/validations/blog.schema";
import { sanitizeBlogHtml } from "@/lib/utils/sanitize-blog-html";
import { getBlogContentText } from "@/lib/utils/blog-content";
import { requireUser } from "@/lib/utils/utils";

interface UpdateBlogResult {
  success: boolean;
  message?: string;
}

export async function updateBlogAction(
  id: string,
  values: unknown,
): Promise<UpdateBlogResult> {
  try {
    const user = await requireUser();

    const existingBlog = await getBlogById(id);

    if (!existingBlog) {
      return {
        success: false,
        message: MESSAGES.BLOG.NOT_FOUND,
      };
    }

    if (existingBlog.ownerId !== user.id) {
      return {
        success: false,
        message: MESSAGES.BLOG.UNAUTHORIZED_ACTION,
      };
    }

    const validatedValues = await createBlogSchema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });

    const isValidCategory = BLOG_CATEGORIES.some(
      (category) => category === validatedValues.category,
    );

    if (!isValidCategory || validatedValues.category === "All stories") {
      return {
        success: false,
        message: MESSAGES.COMMON.INVALID_FORM,
      };
    }

    const content = sanitizeBlogHtml(validatedValues.content);

    const wordCount = getBlogContentText(content)
      .split(/\s+/)
      .filter(Boolean).length;

    const updatedBlog = {
      title: validatedValues.title.trim(),
      description: validatedValues.description.trim(),
      category: validatedValues.category,
      imageUrl: validatedValues.imageUrl || "",
      content,
      readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
      updatedAt: new Date().toISOString(),
    };

    await updateBlog(id, updatedBlog);

    revalidatePath(ROUTES.MY_BLOGS);
    revalidatePath(ROUTES.BLOGS);
    revalidatePath(ROUTES.HOME);
    revalidatePath(`/blogs/${existingBlog.slug}`);

    return {
      success: true,
      message: MESSAGES.BLOG.UPDATED,
    };
  } catch (error) {
    console.error("Update blog error:", error);

    return {
      success: false,
      message: MESSAGES.BLOG.UPDATE_FAILED,
    };
  }
}