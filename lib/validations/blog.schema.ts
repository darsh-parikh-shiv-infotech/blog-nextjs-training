import * as yup from "yup";

import { VALIDATION_MESSAGES } from "@/lib/constants/constant";

export const createBlogSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD)
    .min(5, "Title must contain at least 5 characters.")
    .max(120, "Title cannot exceed 120 characters."),

  description: yup
    .string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD)
    .min(20, "Description must contain at least 20 characters.")
    .max(250, "Description cannot exceed 250 characters."),

  category: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

  imageUrl: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .url("Please enter a valid image URL.")
    .optional(),

  content: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD)
    .test(
      "content-not-empty",
      VALIDATION_MESSAGES.REQUIRED_FIELD,
      (value) => {
        return Boolean(value && value.replace(/<[^>]*>/g, "").trim());
      },
    ),
});

export type BlogFormValues = yup.InferType<typeof createBlogSchema>;