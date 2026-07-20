export const siteConfig = {
  name: "Gantiin",
  tagline: "Gantiin aja, gampang kok!",

  description:
    "Konversi PDF dan gambar gratis langsung di browser. Tanpa upload ke server, tanpa registrasi, tanpa batas harian.",
  url: "https://gantiin.vercel.app",
  donationUrl: "https://trakteer.id/allbee/tip",
  nav: [
    { title: "Semua Konversi", href: "/konversi" },
    { title: "PDF", href: "/pdf" },
    { title: "Gambar", href: "/image" },
    { title: "Merge PDF", href: "/merge" },
    { title: "Dukung", href: "/dukung" },
  ],
} as const;

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPT_PDF = ".pdf,application/pdf";
export const ACCEPT_ALL = ".pdf,.png,.jpg,.jpeg,.jfif,.webp,.heic,.heif,.svg,.gif,.bmp,.tiff,.tif,.avif,.ico,.tga,.ppm";
