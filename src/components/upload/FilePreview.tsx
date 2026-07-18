"use client";

import { useEffect, useMemo } from "react";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatFileSize, type SupportedFileType } from "@/lib/validations";

interface FilePreviewProps {
  file: File;
  fileType: SupportedFileType;
  /** Thumbnail dari sumber eksternal (mis. render PDF). undefined = sedang loading */
  thumbnail?: string | null;
  onRemove: () => void;
}

const IMAGE_TYPES: SupportedFileType[] = ["png", "jpeg", "webp", "svg"];

export function FilePreview({ file, fileType, thumbnail, onRemove }: FilePreviewProps) {
  const isImage = IMAGE_TYPES.includes(fileType);

  // Object URL dibuat saat render via useMemo; effect hanya bertugas cleanup (revoke)
  const imageUrl = useMemo(
    () => (isImage ? URL.createObjectURL(file) : null),
    [file, isImage],
  );

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const previewSrc = isImage ? imageUrl : thumbnail;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt={`Preview ${file.name}`}
              className="size-full object-cover"
            />
          ) : previewSrc === undefined ? (
            <div className="size-full animate-pulse bg-muted-foreground/20" aria-label="Memuat preview" />
          ) : (
            <FileText className="size-8 text-muted-foreground" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium" title={file.name}>
            {file.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(file.size)} • {fileType.toUpperCase()}
          </p>
        </div>

        <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Hapus file">
          <X className="size-5" aria-hidden />
        </Button>
      </CardContent>
    </Card>
  );
}
