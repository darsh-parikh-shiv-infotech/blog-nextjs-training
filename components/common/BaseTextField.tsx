
import type { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BaseTextFieldProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

export function BaseTextField({
  id,
  name,
  label,
  error,
  wrapperClassName,
  className,
  ...inputProps
}: BaseTextFieldProps) {
  const fieldId = id ?? name;

  return (
    <div className={wrapperClassName ?? "space-y-2"}>
      <Label htmlFor={fieldId}>{label}</Label>

      <Input
        {...inputProps}
        id={fieldId}
        name={name}
        className={className}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />

      {error && (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
