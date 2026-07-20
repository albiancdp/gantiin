"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/constants";
import { APP_VERSION } from "@/lib/version";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Gantiin - Beranda">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ArrowRightLeft className="size-4" aria-hidden />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight">Gantiin</span>
            <span className="text-[10px] text-muted-foreground/60">v{APP_VERSION}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigasi utama">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            nativeButton={false}
            className="hidden md:inline-flex"
            render={<Link href="/konversi" />}
          >
            Mulai Konversi
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Buka menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <ArrowRightLeft className="size-3.5" aria-hidden />
                  </span>
                  Gantiin
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4" aria-label="Navigasi mobile">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
                <Button
                  nativeButton={false}
                  className="mt-2"
                  render={<Link href="/konversi" onClick={() => setOpen(false)} />}
                >
                  Mulai Konversi
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
