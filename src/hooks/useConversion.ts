"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { toAppError } from "@/lib/errors";
import { convertFile } from "@/lib/conversions/engine";
import type { ConversionResultData, ConversionType, ConvertOptions } from "@/lib/conversions/types";

export type ConversionStatus = "idle" | "converting" | "done" | "error";

interface UseConversionReturn {
  status: ConversionStatus;
  progress: number;
  result: ConversionResultData | null;
  error: string | null;
  convert: (file: File, type: ConversionType, options?: ConvertOptions) => Promise<void>;
  reset: () => void;
}

export function useConversion(): UseConversionReturn {
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (file: File, type: ConversionType, options?: ConvertOptions) => {
    setStatus("converting");
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const data = await convertFile(file, type, setProgress, options);
      setResult(data);
      setStatus("done");
      toast.success("Konversi berhasil!");
    } catch (err) {
      const appError = toAppError(err);
      setError(appError.message);
      setStatus("error");
      toast.error(appError.message);
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return { status, progress, result, error, convert, reset };
}
