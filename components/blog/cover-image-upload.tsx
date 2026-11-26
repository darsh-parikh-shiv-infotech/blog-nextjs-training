"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function CoverImageUpload({
  value,
  onChange,
  disabled = false,
  onUploadingChange,
}: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewOverride, setPreviewOverride] = useState<{
    value: string;
    preview: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const preview =
    previewOverride?.value === value ? previewOverride.preview : value;

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);

    setPreviewOverride({ value, preview: localPreview });
    setIsUploading(true);
    onUploadingChange?.(true);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing.");
      }

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message ?? "Image upload failed.");
      }

      onChange(result.secure_url);
      setPreviewOverride({
        value: result.secure_url,
        preview: result.secure_url,
      });
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);

      setPreviewOverride(null);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image.",
      );
    } finally {
      URL.revokeObjectURL(localPreview);
      setIsUploading(false);
      onUploadingChange?.(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function removeImage() {
    setPreviewOverride(null);
    onChange("");
    setError("");
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-xl border">
          <div className="aspect-video w-full">
            <img
              src={preview}
              alt="Blog cover preview"
              className="h-full w-full object-cover"
            />
          </div>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="size-4 animate-spin" />
                Uploading image...
              </div>
            </div>
          )}

          {!isUploading && (
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="inline-flex size-9 items-center justify-center rounded-md bg-background text-foreground shadow hover:bg-muted"
                aria-label="Replace cover image"
              >
                <Upload className="size-4" />
              </button>

              <button
                type="button"
                onClick={removeImage}
                disabled={disabled}
                className="inline-flex size-9 items-center justify-center rounded-md bg-background text-destructive shadow hover:bg-muted"
                aria-label="Remove cover image"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/60 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <ImagePlus className="size-6" />
          )}

          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Upload cover image
            </p>

            <p className="mt-1 text-xs">JPG, PNG or WEBP · Maximum 5 MB</p>
          </div>
        </button>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
