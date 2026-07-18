"use client";

import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface ConvertProgressProps {
  progress: number;
  statusText?: string;
}

export function ConvertProgress({ progress, statusText }: ConvertProgressProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-8">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
        <p className="font-medium" role="status" aria-live="polite">
          {statusText ?? "Mengkonversi file…"}
        </p>
        <div className="flex w-full items-center gap-3">
          <Progress value={progress} className="flex-1" aria-label="Progress konversi" />
          <span className="w-12 text-right font-mono text-sm text-muted-foreground">
            {progress}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
