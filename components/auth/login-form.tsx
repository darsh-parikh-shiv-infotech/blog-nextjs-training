"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
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

const EMPTY_FORM_VALUES: LoginInput = {
  username: "",
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

  useLayoutEffect(() => {
    return () => {
      reset(EMPTY_FORM_VALUES);
      setSubmitting(false);
    };
  }, [reset]);

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

      reset(EMPTY_FORM_VALUES);
      toast.success(result.message);

      router.replace(ROUTES.MY_BLOGS);
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
          id="username"
          label={AUTH_CONTENT.FIELDS.USERNAME}
          type="text"
          placeholder={AUTH_CONTENT.FIELDS.USERNAME_PLACEHOLDER}
          autoComplete="username"
          error={errors.username?.message}
          {...register("username")}
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

      <div className="mt-6 rounded-lg border bg-muted/40 p-4">
        <p className="text-sm font-medium">Demo credentials</p>

        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p>
            Username:{" "}
            <span className="font-medium text-foreground">
              {AUTH_CONTENT.LOGIN.DEMO_CREDENTIALS.USERNAME}
            </span>
          </p>

          <p>
            Password:{" "}
            <span className="font-medium text-foreground">
              {AUTH_CONTENT.LOGIN.DEMO_CREDENTIALS.PASSWORD}
            </span>
          </p>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          This application uses a demo authentication API.
        </p>
      </div>

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
