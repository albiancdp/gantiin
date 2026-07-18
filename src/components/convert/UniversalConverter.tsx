"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropZone } from "@/components/upload/DropZone";
import { FilePreview } from "@/components/upload/FilePreview";
import { ConversionOptions } from "@/components/convert/ConversionOptions";
import { ImageConfig } from "@/components/convert/ImageConfig";
import { ConvertProgress } from "@/components/convert/ConvertProgress";
import { ConvertResult } from "@/components/convert/ConvertResult";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useConversion } from "@/hooks/useConversion";
import { renderPdfThumbnail } from "@/lib/conversions/pdf";
import type { ConversionOption } from "@/lib/conversions/registry";
import type { ConvertOptions, ConversionType } from "@/lib/conversions/types";
import type { SupportedFileType } from "@/lib/validations";

interface UniversalConverterProps {
  allowedTypes: SupportedFileType[];
  accept: string;
  dropzoneDescription?: string;
}

type Phase = "upload" | "options" | "config";

export function UniversalConverter({
  allowedTypes,
  accept,
  dropzoneDescription,
}: UniversalConverterProps) {
  const router = useRouter();
  const { file, fileType, selectFile, reset: resetUpload } = useFileUpload(allowedTypes);
  const conversion = useConversion();
  const [thumbnail, setThumbnail] = useState<string | null | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("upload");
  const [selectedOption, setSelectedOption] = useState<ConversionOption | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setThumbnail(undefined);
    const type = await selectFile(selected);
    if (type === "pdf") {
      void renderPdfThumbnail(selected).then(setThumbnail);
    } else if (type) {
      setThumbnail(null);
    }

    if (type) {
      setPhase("options");
    }
  };

  const handleSelectOption = (option: ConversionOption) => {
    if (!file) return;

    if (option.requiresMultiple) {
      router.push("/merge");
      return;
    }

    if (option.implemented && (option.id.startsWith("image-") || option.id === "pdf-to-image" || option.id === "pdf-split")) {
      setSelectedOption(option);
      setPhase("config");
      return;
    }

    if (option.id === "pdf-to-text") {
      void conversion.convert(file, option.id as ConversionType);
    }
  };

  const handleConfigConvert = (type: ConversionType, options: ConvertOptions) => {
    if (!file) return;
    void conversion.convert(file, type, options);
  };

  const handleConfigBack = () => {
    setSelectedOption(null);
    setPhase("options");
  };

  const handleReset = () => {
    resetUpload();
    conversion.reset();
    setThumbnail(undefined);
    setSelectedOption(null);
    setPhase("upload");
  };

  const fromUpload = !file;
  const inConfig = phase === "config" && selectedOption && conversion.status !== "converting" && conversion.status !== "done";

  if (conversion.status === "done" && conversion.result) {
    return <ConvertResult result={conversion.result} onReset={handleReset} />;
  }

  if (conversion.status === "converting") {
    return <ConvertProgress progress={conversion.progress} />;
  }

  return (
    <div className="space-y-6">
      {fromUpload ? (
        <DropZone
          onFilesSelected={handleFilesSelected}
          accept={accept}
          description={dropzoneDescription}
        />
      ) : file && fileType ? (
        <>
          <FilePreview
            file={file}
            fileType={fileType}
            thumbnail={thumbnail}
            onRemove={handleReset}
          />
          {conversion.status === "error" && conversion.error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {conversion.error}
            </p>
          )}
          {inConfig ? (
            <ImageConfig
              option={selectedOption}
              onConvert={handleConfigConvert}
              onBack={handleConfigBack}
            />
          ) : (
            <ConversionOptions fileType={fileType} onSelect={handleSelectOption} />
          )}
        </>
      ) : (
        <DropZone
          onFilesSelected={handleFilesSelected}
          accept={accept}
          description={dropzoneDescription}
        />
      )}
    </div>
  );
}
