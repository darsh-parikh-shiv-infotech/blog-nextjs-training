
import * as yup from "yup";

import { VALIDATION_MESSAGES } from "@/lib/constants/constant";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),

  password: yup
    .string()
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, VALIDATION_MESSAGES.NAME_MIN)
    .max(50, VALIDATION_MESSAGES.NAME_MAX)
    .required(VALIDATION_MESSAGES.NAME_REQUIRED),

  email: yup
    .string()
    .trim()
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .required(VALIDATION_MESSAGES.EMAIL_REQUIRED),

  password: yup
    .string()
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], VALIDATION_MESSAGES.PASSWORDS_NOT_MATCH)
    .required(VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED),
});
