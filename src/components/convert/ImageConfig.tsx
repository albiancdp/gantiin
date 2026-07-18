"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ConversionOption } from "@/lib/conversions/registry";
import type { ConvertOptions, ConversionType } from "@/lib/conversions/types";

interface ImageConfigProps {
  option: ConversionOption;
  onConvert: (type: ConversionType, options: ConvertOptions) => void;
  onBack: () => void;
}

export function ImageConfig({ option, onConvert, onBack }: ImageConfigProps) {
  const [targetFormat, setTargetFormat] = useState<string>("jpeg");
  const [quality, setQuality] = useState(92);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [pageRange, setPageRange] = useState("");

  const needsFormat = useMemo(
    () =>
      ["image-convert", "heic-convert", "svg-convert", "image-resize", "pdf-to-image"].includes(option.id),
    [option.id],
  );

  const needsQuality = useMemo(
    () => ["image-convert", "image-compress", "image-resize", "heic-convert"].includes(option.id),
    [option.id],
  );

  const needsDimensions = option.id === "image-resize";
  const needsPageRange = option.id === "pdf-to-image" || option.id === "pdf-split";

  const formatOptions = useMemo(() => {
    if (option.id === "heic-convert" || option.id === "pdf-to-image") {
      return [
        { value: "jpeg", label: "JPG" },
        { value: "png", label: "PNG" },
      ];
    }
    return [
      { value: "jpeg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WebP" },
    ];
  }, [option.id]);

  const maxQuality = needsQuality ? (option.id === "image-compress" ? 85 : 100) : 100;

  const handleConvert = () => {
    const options: ConvertOptions = {
      targetFormat: (needsFormat ? targetFormat : undefined) as ConvertOptions["targetFormat"],
      quality: needsQuality ? quality / 100 : undefined,
      width: needsDimensions && width ? Number(width) : undefined,
      height: needsDimensions && height ? Number(height) : undefined,
      pageRange: needsPageRange ? pageRange : undefined,
    };

    let type: ConversionType;
    if (option.id.startsWith("heic")) {
      type = "heic-convert";
    } else if (option.id.startsWith("svg")) {
      type = "svg-convert";
    } else {
      type = option.id as ConversionType;
    }

    onConvert(type, options);
  };

  const canConvert = needsDimensions ? width !== "" && height !== "" : true;

  return (
    <div className="space-y-5 rounded-lg border p-4">
      <p className="font-medium">{option.title}</p>

      {needsFormat && (
        <div className="space-y-2">
          <Label htmlFor="target-format">Format tujuan</Label>
          <Select value={targetFormat} onValueChange={(v) => v && setTargetFormat(v)}>
            <SelectTrigger id="target-format" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {needsQuality && (
        <div className="space-y-2">
          <Label htmlFor="quality">
            Kualitas: {quality}%
          </Label>
          <input
            id="quality"
            type="range"
            min={10}
            max={maxQuality}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {needsDimensions && (
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Lebar (px)</Label>
            <input
              id="width"
              type="number"
              min={1}
              placeholder="auto"
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
                if (keepAspect && e.target.value) {
                  const ratio = 16 / 9;
                  setHeight(String(Math.round(Number(e.target.value) / ratio)));
                }
              }}
              className="w-32 rounded-md border bg-background px-3 py-1 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Tinggi (px)</Label>
            <input
              id="height"
              type="number"
              min={1}
              placeholder="auto"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-32 rounded-md border bg-background px-3 py-1 text-sm"
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-1 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
              />
              Jaga rasio
            </label>
          </div>
        </div>
      )}

      {needsPageRange && (
        <div className="space-y-2">
          <Label htmlFor="page-range">
            Halaman <span className="text-xs text-muted-foreground">(kosongi untuk semua)</span>
          </Label>
          <input
            id="page-range"
            type="text"
            placeholder="Contoh: 1-5, 7, 10-12"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-1.5 text-sm"
          />
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Kembali
        </Button>
        <Button onClick={handleConvert} disabled={!canConvert}>
          Mulai Konversi
        </Button>
      </div>
    </div>
  );
}
