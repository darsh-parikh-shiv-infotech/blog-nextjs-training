"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { BaseButton } from "@/components/common/BaseButton";
import {
  AUTH_API_ROUTES,
  COMMON_UI_STRING,
  NAVIGATION_LABELS,
} from "@/lib/constants/constant";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      const response = await fetch(AUTH_API_ROUTES.LOGOUT, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  }

  return (
    <BaseButton
      variant="outline"
      size="sm"
      onClick={handleLogout}
      isLoading={isLoggingOut}
      loadingText={COMMON_UI_STRING.LOGGING_OUT}
    >
      {NAVIGATION_LABELS.LOGOUT}
    </BaseButton>
  );
}
