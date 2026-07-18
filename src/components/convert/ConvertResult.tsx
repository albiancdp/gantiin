"use client";

import { Check, Copy, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadBlob } from "@/lib/download";
import { formatFileSize } from "@/lib/validations";
import type { ConversionResultData } from "@/lib/conversions/types";

interface ConvertResultProps {
  result: ConversionResultData;
  onReset: () => void;
}

export function ConvertResult({ result, onReset }: ConvertResultProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    downloadBlob(result.blob, result.filename);
    toast.success(`File ${result.filename} berhasil di-download`);
  };

  const handleCopy = async () => {
    if (!result.text) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      toast.success("Teks tersalin ke clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin teks");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold">{result.filename}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(result.blob.size)}
                {result.pageCount !== undefined && ` • ${result.pageCount} halaman`}
                {result.originalSize !== undefined &&
                  ` • ${formatFileSize(result.originalSize)} → ${formatFileSize(result.blob.size)} (${result.originalSize > result.blob.size ? "-" : "+"}${Math.abs(Math.round((1 - result.blob.size / result.originalSize) * 100))}%)`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.kind === "text" && (
                <Button variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <Check className="text-secondary" aria-hidden />
                  ) : (
                    <Copy aria-hidden />
                  )}
                  {copied ? "Tersalin" : "Salin Teks"}
                </Button>
              )}
              <Button onClick={handleDownload}>
                <Download aria-hidden />
                Download
              </Button>
            </div>
          </div>

          {result.kind === "text" && result.text !== undefined && (
            <pre className="max-h-80 overflow-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">
              {result.text}
            </pre>
          )}
        </CardContent>
      </Card>

      <Button variant="outline" onClick={onReset} className="w-full">
        <RotateCcw aria-hidden />
        Konversi file lain
      </Button>
    </div>
  );
}
