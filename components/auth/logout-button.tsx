
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { BaseButton } from "@/components/common/BaseButton";
import {
  AUTH_API_ROUTES,
  COMMON_UI_STRING,
  MESSAGES,
  NAVIGATION_LABELS,
} from "@/lib/constants/constant";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch(AUTH_API_ROUTES.LOGOUT, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        return;
      }

      toast.success(result.message);
      router.replace("/");
      router.refresh();
    } catch {
      toast.error(MESSAGES.COMMON.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseButton
      variant="outline"
      onClick={handleLogout}
      isLoading={loading}
      loadingText={COMMON_UI_STRING.LOGGING_OUT}
    >
      {NAVIGATION_LABELS.LOGOUT}
    </BaseButton>
  );
}
