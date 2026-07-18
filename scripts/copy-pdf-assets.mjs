/**
 * Copy asset pdf.js yang tidak bisa di-bundle Turbopack (standard fonts)
 * dari node_modules ke public/ agar tersedia sebagai static file.
 * Dijalankan otomatis via `postinstall`.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "node_modules", "pdfjs-dist", "standard_fonts");
const target = join(root, "public", "pdfjs", "standard_fonts");

if (!existsSync(source)) {
  console.warn("[copy-pdf-assets] pdfjs-dist/standard_fonts tidak ditemukan, skip");
  process.exit(0);
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });
console.log("[copy-pdf-assets] standard_fonts -> public/pdfjs/standard_fonts");
