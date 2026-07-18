"use client";

import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE_MB } from "@/lib/constants";

interface DropZoneProps {
  /** Dipanggil saat user memilih file (drop atau browse) */
  onFilesSelected: (files: File[]) => void;
  /** Nilai atribut accept untuk input file */
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
}

export function DropZone({
  onFilesSelected,
  accept,
  multiple = false,
  disabled = false,
  title = "Seret & letakkan file di sini",
  description,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(multiple ? files : files.slice(0, 1));
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Area upload file. Klik atau seret file ke sini."
      aria-disabled={disabled}
      onClick={openFilePicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFilePicker();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
      className={cn(
        "flex min-h-64 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed bg-muted/30 p-8 text-center transition-colors",
        "hover:border-primary/60 hover:bg-accent/50",
        "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30",
        isDragOver && "border-primary bg-accent",
        disabled && "cursor-not-allowed opacity-50 hover:border-border hover:bg-muted/30",
      )}
    >
      <span
        className={cn(
          "flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform",
          isDragOver && "scale-110",
        )}
      >
        <CloudUpload className="size-8" aria-hidden />
      </span>

      <div className="space-y-1">
        <p className="text-lg font-semibold">{isDragOver ? "Lepaskan file di sini" : title}</p>
        <p className="text-sm text-muted-foreground">
          {description ?? `atau klik untuk memilih file • Maks ${MAX_FILE_SIZE_MB}MB`}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length > 0) {
            onFilesSelected(multiple ? files : files.slice(0, 1));
          }
          event.target.value = "";
        }}
      />
    </div>
  );
}
