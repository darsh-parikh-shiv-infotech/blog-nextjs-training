
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .required("Password is required."),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .required("Name is required."),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .required("Password is required."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Please confirm your password."),
});
