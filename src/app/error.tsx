"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <TriangleAlert className="size-8" aria-hidden />
      </span>
      <h1 className="text-3xl font-bold tracking-tight">Ada yang tidak beres</h1>
      <p className="max-w-md text-muted-foreground">
        Terjadi kesalahan tak terduga. Tenang, file kamu tetap aman di perangkat.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Coba Lagi</Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          Kembali ke Beranda
        </Button>
      </div>
    </Container>
  );
}
