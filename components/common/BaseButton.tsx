
import type { ReactNode, ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMMON_UI_STRING } from "@/lib/constants/constant";

interface BaseButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export function BaseButton({
  children,
  isLoading = false,
  loadingText = COMMON_UI_STRING.LOADING,
  disabled,
  ...props
}: BaseButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading && (
        <LoaderCircle className="animate-spin" />
      )}

      {isLoading ? loadingText : children}
    </Button>
  );
}
