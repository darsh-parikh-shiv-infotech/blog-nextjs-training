"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { BaseButton } from "@/components/common/BaseButton";
import { BaseTextField } from "@/components/common/BaseTextField";

import {
  AUTH_API_ROUTES,
  AUTH_CONTENT,
  MESSAGES,
  ROUTES,
} from "@/lib/constants/constant";

import type { LoginInput } from "@/lib/types/common.types";
import { loginSchema } from "@/lib/validations/auth.schema";

const EMPTY_FORM_VALUES = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: EMPTY_FORM_VALUES,
  });

  async function onSubmit(values: LoginInput) {
    setSubmitting(true);

    try {
      const response = await fetch(AUTH_API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        return;
      }

      if (result.success) {
        reset(EMPTY_FORM_VALUES);
        toast.success(result.message);
        router.replace(ROUTES.MY_BLOGS);
      }
      router.refresh();
    } catch {
      toast.error(MESSAGES.COMMON.NETWORK_ERROR);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm sm:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">{AUTH_CONTENT.LOGIN.TITLE}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {AUTH_CONTENT.LOGIN.DESCRIPTION}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <BaseTextField
          id="email"
          label={AUTH_CONTENT.FIELDS.EMAIL}
          type="email"
          placeholder={AUTH_CONTENT.FIELDS.EMAIL_PLACEHOLDER}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <BaseTextField
          id="password"
          label={AUTH_CONTENT.FIELDS.PASSWORD}
          type="password"
          placeholder={AUTH_CONTENT.FIELDS.LOGIN_PASSWORD_PLACEHOLDER}
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <BaseButton
          type="submit"
          className="w-full"
          isLoading={submitting}
          loadingText={AUTH_CONTENT.LOGIN.SUBMITTING}
        >
          {AUTH_CONTENT.LOGIN.SUBMIT}
        </BaseButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {AUTH_CONTENT.LOGIN.NO_ACCOUNT}{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-foreground underline underline-offset-4"
        >
          {AUTH_CONTENT.LOGIN.REGISTER_LINK}
        </Link>
      </p>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href={ROUTES.HOME}
          className="font-medium text-violet-600 underline underline-offset-4"
        >
          {AUTH_CONTENT.RETURN_HOME}
        </Link>
      </p>
    </div>
  );
}
