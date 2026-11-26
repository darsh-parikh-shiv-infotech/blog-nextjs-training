"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { BaseTextField } from "@/components/common/BaseTextField";
import { BaseButton } from "@/components/common/BaseButton";
import { BlogEditor } from "@/components/blog/blog-editor";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { BLOG_CATEGORIES } from "@/lib/constants/blog.data";
import { BLOG_FORM_CONTENT, MESSAGES, ROUTES } from "@/lib/constants/constant";

import {
  createBlogSchema,
  type BlogFormValues,
} from "@/lib/validations/blog.schema";

import { getBlogContentText } from "@/lib/utils/blog-content";
import { CoverImageUpload } from "./cover-image-upload";

interface BlogFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormValues) => Promise<{
    success: boolean;
    message?: string;
  }>;
}

const EMPTY_FORM_VALUES: BlogFormValues = {
  title: "",
  category: "",
  imageUrl: "",
  content: "",
};

export function BlogForm({ mode, initialValues, onSubmit }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const defaultValues: BlogFormValues = {
    ...EMPTY_FORM_VALUES,
    ...initialValues,
  };
  const resetValuesRef = useRef<BlogFormValues>(EMPTY_FORM_VALUES);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: yupResolver(createBlogSchema),
    defaultValues,
  });

  useEffect(() => {
    const values = {
      ...EMPTY_FORM_VALUES,
      ...initialValues,
    };

    reset(values);
    resetValuesRef.current = values;
  }, [initialValues, reset]);

  useLayoutEffect(() => {
    return () => {
      reset(resetValuesRef.current);
      setIsSubmitting(false);
    };
  }, [reset]);

  const content = useWatch({ control, name: "content" }) ?? "";
  const imageUrl =
    useWatch({
      control,
      name: "imageUrl",
    }) ?? "";

  const submitClickHandler = async (values: BlogFormValues) => {
    if (isImageUploading) {
      toast.error("Please wait for the image upload to finish.");
      return;
    }
    try {
      setIsSubmitting(true);

      const result = await onSubmit(values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      // Clear Create form or update Edit form state.
      reset(mode === "create" ? EMPTY_FORM_VALUES : values);

      // Refresh server-rendered data.
      router.refresh();

      // Navigate back to the user's blogs.
      router.push(ROUTES.MY_BLOGS);
    } catch {
      toast.error(MESSAGES.COMMON.SOMETHING_WENT_WRONG);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitClickHandler)} className="space-y-6">
      {/* Title */}
      <BaseTextField
        label={BLOG_FORM_CONTENT.FIELDS.TITLE}
        placeholder={BLOG_FORM_CONTENT.FIELDS.TITLE_PLACEHOLDER}
        {...register("title")}
        error={errors.title?.message}
      />

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">{BLOG_FORM_CONTENT.FIELDS.CATEGORY}</Label>

        <select
          id="category"
          {...register("category")}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Select a category</option>

          {BLOG_CATEGORIES.filter((category) => category !== "All stories").map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ),
          )}
        </select>

        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label>{BLOG_FORM_CONTENT.FIELDS.COVER_IMAGE}</Label>

        <CoverImageUpload
          value={imageUrl}
          onChange={(url) =>
            setValue("imageUrl", url, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
          disabled={isSubmitting}
          onUploadingChange={setIsImageUploading}
        />

        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Rich Text Content */}
      <div className="space-y-2">
        <Label>{BLOG_FORM_CONTENT.FIELDS.CONTENT}</Label>

        <BlogEditor
          content={content}
          onChange={(html) => {
            setValue("content", html, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          placeholder={BLOG_FORM_CONTENT.FIELDS.CONTENT_PLACEHOLDER}
        />

        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}

        <p className="text-xs text-muted-foreground">
          {getBlogContentText(content).split(/\s+/).filter(Boolean).length}{" "}
          words
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline">
          <Link href={ROUTES.MY_BLOGS}>{BLOG_FORM_CONTENT.CANCEL}</Link>
        </Button>

        <BaseButton
          type="submit"
          isLoading={isSubmitting || isImageUploading}
          loadingText={
            isImageUploading
              ? BLOG_FORM_CONTENT.UPLOADING
              : mode === "edit"
                ? BLOG_FORM_CONTENT.UPDATING
                : BLOG_FORM_CONTENT.SUBMITTING
          }
        >
          {mode === "edit"
            ? BLOG_FORM_CONTENT.UPDATE
            : BLOG_FORM_CONTENT.SUBMIT}
        </BaseButton>
      </div>
    </form>
  );
}
