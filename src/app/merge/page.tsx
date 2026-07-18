"use client";

import { useCallback, useState } from "react";
import { ArrowUp, ArrowDown, FileText, Merge, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components/layout/Container";
import { DropZone } from "@/components/upload/DropZone";
import { ConvertProgress } from "@/components/convert/ConvertProgress";
import { ConvertResult } from "@/components/convert/ConvertResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mergePdfs } from "@/lib/conversions/pdf";
import { formatFileSize } from "@/lib/validations";
import { ACCEPT_PDF } from "@/lib/constants";
import type { ConversionResultData } from "@/lib/conversions/types";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResultData | null>(null);

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return next;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) {
      toast.error("Pilih minimal 2 file PDF untuk di-merge");
      return;
    }

    setStatus("converting");
    setProgress(0);

    try {
      const data = await mergePdfs(files, setProgress);
      setResult(data);
      setStatus("done");
      toast.success("PDF berhasil digabungkan!");
    } catch {
      setStatus("error");
      toast.error("Gagal menggabungkan PDF. Coba lagi.");
    }
  }, [files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setStatus("idle");
    setProgress(0);
  }, []);

  if (status === "done" && result) {
    return (
      <Container className="max-w-3xl py-12 sm:py-16">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Merge PDF</h1>
          <ConvertResult result={result} onReset={handleReset} />
        </div>
      </Container>
    );
  }

  if (status === "converting") {
    return (
      <Container className="max-w-3xl py-12 sm:py-16">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Merge PDF</h1>
          <ConvertProgress progress={progress} />
        </div>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Merge PDF</h1>
          <p className="text-muted-foreground">
            Gabungkan beberapa PDF jadi satu. Urutkan sesuai keinginan.
          </p>
        </div>

        {files.length === 0 ? (
          <DropZone
            onFilesSelected={handleFilesSelected}
            accept={ACCEPT_PDF}
            multiple
            description="atau klik untuk memilih beberapa file PDF • Maks 50MB per file"
          />
        ) : (
          <div className="space-y-4">
            <DropZone
              onFilesSelected={handleFilesSelected}
              accept={ACCEPT_PDF}
              multiple
              title="Tambah file PDF lain"
              description="atau klik untuk tambah file • Maks 50MB"
            />

            <Card>
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {files.length} file ({files.reduce((s, f) => s + f.size, 0) > 0
                    ? formatFileSize(files.reduce((s, f) => s + f.size, 0))
                    : "0 B"})
                </p>
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
                  >
                    <FileText className="size-5 shrink-0 text-primary" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        disabled={index === 0}
                        onClick={() => moveFile(index, -1)}
                        aria-label="Pindah ke atas"
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        disabled={index === files.length - 1}
                        onClick={() => moveFile(index, 1)}
                        aria-label="Pindah ke bawah"
                      >
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => removeFile(index)}
                        aria-label="Hapus file"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-destructive">
                Gagal menggabungkan PDF. Pastikan semua file valid dan coba lagi.
              </p>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Mulai Ulang
              </Button>
              <Button onClick={handleMerge} disabled={files.length < 2} className="flex-1">
                <Merge aria-hidden />
                Gabungkan {files.length} PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
