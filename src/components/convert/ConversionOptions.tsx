"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getConversionOptions,
  type ConversionOption,
} from "@/lib/conversions/registry";
import type { SupportedFileType } from "@/lib/validations";

interface ConversionOptionsProps {
  fileType: SupportedFileType;
  onSelect: (option: ConversionOption) => void;
}

export function ConversionOptions({ fileType, onSelect }: ConversionOptionsProps) {
  const options = getConversionOptions(fileType);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Bisa dikonversi ke:</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={!option.implemented}
            onClick={() => onSelect(option)}
            className={cn(
              "group flex items-start gap-3 rounded-xl border bg-card p-4 text-left transition-all",
              option.implemented
                ? "hover:border-primary/60 hover:bg-accent/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
                : "cursor-not-allowed opacity-60",
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <option.icon className="size-5" aria-hidden />
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-medium">{option.title}</span>
                {!option.implemented && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Segera
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {option.description}
              </span>
              <span className="mt-1 block font-mono text-xs text-primary">
                {option.outputLabel}
              </span>
            </span>

            {option.implemented && (
              <ArrowRight
                className="size-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
