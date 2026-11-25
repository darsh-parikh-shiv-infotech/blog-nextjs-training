"use server"

import { MESSAGES, ROUTES } from "@/lib/constants/constant";
import { deleteBlog, getBlogById } from "@/lib/services/blog.service";
import { requireUser } from "@/lib/utils/utils";
import { revalidatePath } from "next/cache";

interface DeleteBlogResult {
  success: boolean;
  message?: string;
}

export async function deleteBlogAction(
  id: string,
): Promise<DeleteBlogResult> {
  try {
    const user = await requireUser();

    const blog = await getBlogById(id);

    if (!blog) {
      return {
        success: false,
        message: MESSAGES.BLOG.NOT_FOUND,
      };
    }

    if (blog.ownerId !== user.id) {
      return {
        success: false,
        message: MESSAGES.BLOG.UNAUTHORIZED_ACTION,
      };
    }

    await deleteBlog(id);

    revalidatePath(ROUTES.MY_BLOGS);
    revalidatePath(ROUTES.BLOGS);
    revalidatePath(ROUTES.HOME);
    revalidatePath(`/blogs/${blog.slug}`);

    return {
      success: true,
      message: MESSAGES.BLOG.DELETED,
    };
  } catch (error) {
    console.error("Delete blog error:", error);

    return {
      success: false,
      message: MESSAGES.BLOG.DELETE_FAILED,
    };
  }
}