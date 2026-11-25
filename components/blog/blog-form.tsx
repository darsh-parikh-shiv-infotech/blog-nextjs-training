"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

interface BlogFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormValues) => Promise<{
    success: boolean;
    message?: string;
  }>;
}

export function BlogForm({ mode, initialValues, onSubmit }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitClickHandler = async (values: BlogFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await onSubmit(values);

      if (result.success) {
        toast.success(result.message);
        router.push(ROUTES.MY_BLOGS);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(MESSAGES.COMMON.SOMETHING_WENT_WRONG);
    } finally {
      setIsSubmitting(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: yupResolver(createBlogSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      category: initialValues?.category ?? "",
      imageUrl: initialValues?.imageUrl ?? "",
      content: initialValues?.content ?? "",
    },
  });

  const content = watch("content");

  return (
    <form onSubmit={handleSubmit(submitClickHandler)} className="space-y-6">
      {/* Title */}
      <BaseTextField
        label={BLOG_FORM_CONTENT.FIELDS.TITLE}
        placeholder={BLOG_FORM_CONTENT.FIELDS.TITLE_PLACEHOLDER}
        {...register("title")}
        error={errors.title?.message}
      />

      {/* Description */}
      <div className="space-y-2">
        <Label>{BLOG_FORM_CONTENT.FIELDS.DESCRIPTION}</Label>

        <textarea
          {...register("description")}
          placeholder={BLOG_FORM_CONTENT.FIELDS.DESCRIPTION_PLACEHOLDER}
          rows={3}
          className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-invalid={Boolean(errors.description)}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

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

      {/* Image */}
      <div className="space-y-2">
        <Label>{BLOG_FORM_CONTENT.FIELDS.CONTENT}</Label>

        <BaseTextField
          label="Cover image URL"
          placeholder="https://example.com/image.jpg"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />

        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>{BLOG_FORM_CONTENT.FIELDS.CONTENT}</Label>

        <BlogEditor
          initialContent={getValues("content")}
          onChange={(html) => {
            setValue("content", html, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
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
          isLoading={isSubmitting}
          loadingText={BLOG_FORM_CONTENT.SUBMITTING}
        >
          {BLOG_FORM_CONTENT.SUBMIT}
        </BaseButton>
      </div>
    </form>
  );
}
