"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { validateFile, type SupportedFileType } from "@/lib/validations";

interface UseFileUploadReturn {
  file: File | null;
  fileType: SupportedFileType | null;
  /** Validasi file lalu simpan ke state. Return tipe file jika valid, false jika tidak. */
  selectFile: (file: File) => Promise<SupportedFileType | false>;
  reset: () => void;
}

export function useFileUpload(allowedTypes: SupportedFileType[]): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<SupportedFileType | null>(null);

  const selectFile = useCallback(
    async (candidate: File) => {
      const result = await validateFile(candidate, allowedTypes);
      if (!result.valid) {
        toast.error(result.error);
        return false;
      }
      setFile(candidate);
      setFileType(result.type);
      return result.type;
    },
    [allowedTypes],
  );

  const reset = useCallback(() => {
    setFile(null);
    setFileType(null);
  }, []);

  return { file, fileType, selectFile, reset };
}
