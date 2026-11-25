"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { deleteBlogAction } from "@/app/(account)/my-blogs/actions";

import {
  COMMON_UI_STRING,
  MESSAGES,
} from "@/lib/constants/constant";

interface DeleteBlogButtonProps {
  blogId: string;
  blogTitle: string;
}

export function DeleteBlogButton({
  blogId,
  blogTitle,
}: DeleteBlogButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteClickHandler = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteBlogAction(blogId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch {
      toast.error(MESSAGES.COMMON.SOMETHING_WENT_WRONG);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isDeleting}
      onClick={deleteClickHandler}
    >
      <Trash2 className="size-4" />

      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}