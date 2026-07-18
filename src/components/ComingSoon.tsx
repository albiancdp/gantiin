import Link from "next/link";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Construction className="size-8" aria-hidden />
      </span>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="max-w-md text-muted-foreground">{description}</p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Kembali ke Beranda
      </Button>
    </Container>
  );
}
