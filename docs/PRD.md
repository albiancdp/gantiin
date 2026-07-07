# Product Requirement Document (Updated)

## 1. Executive Summary

**Gantiin** adalah web application gratis untuk konversi file yang memproses semua file langsung di browser user (client-side). Tidak perlu upload ke server, tidak perlu registrasi, tidak ada batasan harian.

Gantiin menyelesaikan masalah utama user Indonesia yang frustasi dengan tool konversi file yang berbayar, penuh iklan, dan mengancam privasi. Dengan pendekatan client-side processing, Gantiin menawarkan **gratis tanpa batas, privasi terjamin, dan mudah digunakan**.

**Competitive Advantage:** Berdasarkan riset kompetitor (FreeConvert, iLovePDF, CloudConvert, Online-Convert), tidak ada yang menawarkan kombinasi **gratis tanpa batas + client-side processing + tanpa registrasi + tanpa iklan**.

Target: 10,000 MAU dalam 6 bulan pertama dengan revenue dari donasi komunitas.

---

## 2. Background & Context

### Market Condition
- 73% pengguna internet Indonesia mengakses melalui mobile device
- Kebutuhan konversi file meningkat (PDF, gambar) untuk work-from-home dan online learning
- Tool yang ada memiliki limitasi yang mengganggu user experience:
  - **FreeConvert:** 40+ format, tapi ada limit dan antrian
  - **iLovePDF:** Bagus untuk PDF, tapi OCR harus premium
  - **CloudConvert:** 200+ format, tapi harus registrasi dan ada limit
  - **Online-Convert:** Banyak fitur, tapi penuh iklan
- Kesadaran privasi digital meningkat di kalangan user Indonesia

### User Need
- Mahasiswa butuh konversi PDF untuk tugas
- Pekerja kantor butuh konversi gambar untuk presentasi
- Freelancer butuh kompres gambar untuk upload
- Content creator butuh multi-format untuk berbagai platform
- iPhone user butuh konversi HEIC ke JPG

### Why Now?
- Teknologi WASM memungkinkan client-side processing yang powerful
- Browser modern mendukung semua fitur yang dibutuhkan
- COVID-19 meningkatkan kebutuhan tool digital
- User mencari alternatif gratis yang benar-benar gratis
- Kompetitor utama memiliki kelemahan yang bisa kita exploit

---

## 3. Target Audience

### Primary: Indonesian Consumers (18-35 tahun)
- Mahasiswa dan pelajar
- Pekerja kantoran
- Freelancer dan content creator
- Small business owner
- iPhone users (HEIC conversion)

### Secondary
- User mobile yang butuh quick conversion
- User yang concern dengan privasi
- User yang tidak ingin install software
- Power users yang butuh batch processing

### User Characteristics
- **Technical Level:** Low to Medium
- **Device:** 70% mobile, 30% desktop
- **Connection:** Variable (4G, WiFi, 3G)
- **Language:** Bahasa Indonesia (primary), English (secondary)

---

## 4. User Stories (High-Level)

### Must Have (P0)

#### PDF Conversion
- As a **mahasiswa**, I want to **mengkonversi PDF ke Word/text** so that **saya bisa mengedit kutipan jurnal**
- As a **pekerja kantor**, I want to **mengextract text dari PDF** so that **saya bisa copy-paste ke dokumen lain**

#### Image Conversion
- As a **content creator**, I want to **mengkonversi PNG ke JPG** so that **saya bisa upload ke Instagram tanpa masalah**
- As a **toko online**, I want to **mengkompres gambar produk** so that **bisa upload ke Shopee tanpa melebihi batas**
- As an **iPhone user**, I want to **mengkonversi HEIC ke JPG** so that **gambar bisa digunakan di mana saja**

#### Core UX
- As a **user**, I want to **drag & drop file** so that **proses upload cepat dan mudah**
- As a **user**, I want to **download hasil konversi** so that **saya bisa gunakan file tersebut**
- As a **privacy-conscious user**, I want to **file saya tidak diupload ke server** so that **privasi saya terjamin**

### Should Have (P1)

#### Extended PDF
- As a **user**, I want to **merge beberapa PDF** so that **saya bisa gabungkan dokumen**
- As a **user**, I want to **split PDF** so that **saya bisa ambil halaman tertentu**
- As a **user**, I want to **konversi PDF ke gambar** so that **saya bisa share sebagai image**
- As a **user**, I want to **konversi gambar ke PDF** so that **saya bisa buat dokumen dari foto**

#### Extended Image
- As a **user**, I want to **resize gambar** so that **ukuran sesuai kebutuhan**
- As a **user**, I want to **compress gambar** so that **file lebih kecil tanpa loses kualitas**

#### UX Enhancement
- As a **user**, I want to **preview file sebelum convert** so that **saya yakin file yang benar**
- As a **user**, I want to **dark mode** so that **nyaman digunakan di malam hari**

### Nice to Have (P2)

#### Power User
- As a **power user**, I want to **batch convert** so that **bisa konversi banyak file sekaligus**
- As a **power user**, I want to **keyboard shortcuts** so that **lebih cepat**
- As a **power user**, I want to **history konversi** so that **bisa download ulang**

#### Document Conversion
- As a **user**, I want to **konversi DOC/DOCX ke PDF** so that **dokumen bisa dibuka di mana saja**
- As a **user**, I want to **konversi PPT/PPTX ke PDF** so that **presentasi bisa di-share**
- As a **user**, I want to **konversi XLS/XLSX ke PDF** so that **spreadsheet bisa di-print**

#### Advanced PDF Tools
- As a **user**, I want to **compress PDF** so that **file lebih kecil untuk email**
- As a **user**, I want to **rotate PDF** so that **halaman bisa diputar**
- As a **user**, I want to **add page numbers** so that **dokumen lebih rapi**

---

## 5. Feature Overview

| Feature | Description | Priority | Notes |
|---------|-------------|----------|-------|
| PDF → Text | Extract text dari PDF | P0 | Core feature |
| Image Format Convert | PNG↔JPG↔WebP | P0 | Core feature |
| HEIC → JPG | Convert iPhone photos | P0 | High demand |
| Drag & Drop Upload | Upload file dengan drag | P0 | Core UX |
| File Download | Download hasil konversi | P0 | Core feature |
| Mobile Responsive | Responsive design | P0 | 70% mobile users |
| Dark/Light Mode | Toggle tema | P1 | UX |
| PDF → Image | PDF ke PNG/JPG | P1 | Extended |
| Image → PDF | Gambar ke PDF | P1 | Extended |
| PDF Merge | Gabungkan beberapa PDF | P1 | Extended |
| PDF Split | Ambil halaman dari PDF | P1 | Extended |
| Image Resize | Ubah ukuran gambar | P1 | Extended |
| Image Compress | Kompres ukuran file | P1 | Extended |
| File Preview | Preview sebelum convert | P1 | UX |
| Batch Convert | Konversi multiple files | P2 | Power user |
| History | Riwayat konversi | P2 | localStorage |
| DOC↔PDF | Document conversion | P2 | Extended |
| PPT↔PDF | Presentation conversion | P2 | Extended |
| XLS↔PDF | Spreadsheet conversion | P2 | Extended |
| PDF Compress | Kompres PDF | P2 | Advanced |
| PDF Rotate | Putar halaman PDF | P2 | Advanced |
| PDF Page Numbers | Tambah nomor halaman | P2 | Advanced |
| Image Crop | Potong gambar | P2 | Advanced |
| Image Rotate | Putar gambar | P2 | Advanced |
| Keyboard Shortcuts | Shortcuts untuk power user | P2 | UX |
| Donation Button | Donasi via Saweria | P1 | Revenue |
| SEO | Optimasi search engine | P0 | Acquisition |
| Analytics | Plausible analytics | P1 | Tracking |
| Error Handling | Graceful error handling | P0 | Reliability |
| Performance | Fast conversion | P0 | UX |
| PWA Support | Install like native app | P2 | Engagement |
| Browser Extension | Quick access | P3 | Distribution |

---

## 6. User Flows

### Flow 1: PDF to Text Conversion

```
1. User buka landing page
2. User klik "Konversi PDF" atau drag PDF ke area upload
3. System tampilkan preview PDF (halaman pertama)
4. User klik "Konversi"
5. System proses konversi (tampilkan progress)
6. System tampilkan hasil text
7. User klik "Download" atau "Copy to Clipboard"
8. Selesai
```

### Flow 2: Image Format Conversion

```
1. User buka landing page
2. User klik "Konversi Gambar" atau drag gambar
3. System tampilkan preview gambar + format asli
4. User pilih format tujuan (PNG/JPG/WebP)
5. User atur quality (optional)
6. System tampilkan preview hasil
7. User klik "Download"
8. Selesai
```

### Flow 3: PDF Merge

```
1. User buka halaman "Merge PDF"
2. User drag beberapa PDF (atau klik untuk pilih)
3. System tampilkan list PDF yang diupload
4. User urutkan PDF jika perlu (drag & drop)
5. User klik "Gabungkan"
6. System proses merge
7. User download hasil PDF gabungan
8. Selesai
```

### Flow 4: HEIC to JPG (iPhone User)

```
1. User buka Gantiin dari iPhone
2. User klik "Konversi HEIC"
3. User pilih foto HEIC dari galeri
4. System tampilkan preview
5. User atur quality (optional)
6. User klik "Konversi"
7. System konversi ke JPG
8. User download JPG
9. Selesai
```

### Flow 5: Error State

```
1. User upload file yang tidak didukung
2. System tampilkan error: "Format file tidak didukung"
3. User upload file yang terlalu besar
4. System tampilkan error: "File terlalu besar (maks 50MB)"
5. Konversi gagal
6. System tampilkan error: "Gagal mengkonversi file"
7. User bisa coba lagi atau upload file lain
```

---

## 7. Non-Functional Requirements

### Performance
- **Page Load:** < 2 detik (3G connection)
- **Time to Interactive:** < 3 detik
- **Conversion Time:** < 5 detik (file < 10MB)
- **Bundle Size:** < 200KB (gzipped)

### Security
- **Client-side Processing:** File tidak meninggalkan browser
- **No Server Storage:** Tidak ada file yang disimpan di server
- **CSP:** Content Security Policy yang ketat
- **Input Validation:** Validasi file type dan size

### Scalability
- **Concurrent Users:** 1000+ (client-side, no server limit)
- **File Size Limit:** 50MB
- **No Database:** Semua data di browser (localStorage/IndexedDB)

### Availability
- **Uptime:** 99.9% (Vercel SLA)
- **Offline Support:** Basic offline via Service Worker (P2)
- **CDN:** Global edge network (Vercel)

### Accessibility
- **WCAG:** 2.1 AA compliance
- **Keyboard Navigation:** Full support
- **Screen Reader:** ARIA labels
- **Color Contrast:** Minimum 4.5:1

---

## 8. Constraints

### Technical
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No Server:** 100% client-side processing
- **File Size:** Maximum 50MB per file
- **Memory:** Limit concurrent conversions based on device capability

### Budget
- **Infrastructure:** Rp 0 (Vercel free tier)
- **Domain:** ~Rp 150.000/tahun (.com)
- **Development:** Solo developer (time cost only)

### Timeline
- **MVP:** 8 minggu
- **V2:** 3-4 bulan
- **V3:** 6-12 bulan

### Regulatory
- **PDP Law:** Compliance dengan undang-undang pelindungan data pribadi Indonesia
- **GDPR:** Basic compliance untuk user EU (if any)
- **No PII Collection:** Tidak mengumpulkan data pribadi

---

## 9. Out of Scope

### MVP (Tidak Ada di V1)
- ❌ Video conversion
- ❌ Audio conversion
- ❌ User accounts / authentication
- ❌ Cloud storage
- ❌ Server-side processing
- ❌ API for third-party
- ❌ Mobile apps (native)
- ❌ Paid features
- ❌ Ads
- ❌ OCR (scanned PDF to text)
- ❌ AI features (summarizer, translator)

### Future Consideration (Mungkin di V2/V3)
- ⬜ Video conversion (client-side, terbatas)
- ⬜ User accounts (optional, untuk sync)
- ⬜ API access (developer tier)
- ⬜ Desktop app (Electron)
- ⬜ Browser extension (Chrome, Firefox, Edge)
- ⬜ OCR support (client-side via WASM)
- ⬜ AI features (client-side via WASM)

---

## 10. Success Criteria

### MVP Success
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Features Complete | 4 conversion types | Feature checklist |
| Format Support | PDF, PNG, JPG, WEBP, HEIC | Format list |
| Performance | LCP < 2.5s | Lighthouse |
| Accessibility | WCAG 2.1 AA | Audit |
| Mobile Responsive | Works on mobile | Manual testing |
| Deployed | Live on Vercel | URL accessible |

### 6-Month Success
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Users | 10,000 MAU | Analytics |
| Revenue | Rp 5 juta/bulan | Saweria |
| Satisfaction | > 4.5/5 | Feedback |
| Performance | < 5s conversion | Metrics |
| Bugs | < 5/month | Issues |
| Format Support | 15+ formats | Format list |

### Long-term Success
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Brand Recognition | Known in Indonesia | Social mentions |
| Community | Active donors | Donation dashboard |
| Sustainability | Self-sustaining | Revenue > costs |
| Impact | Helped 100,000 users | Cumulative users |
| Format Support | 30+ formats | Format list |
| Features | 20+ conversion types | Feature list |

---

## 11. Competitive Positioning

### vs FreeConvert
- **FreeConvert:** 40+ format, tapi ada limit dan antrian
- **Gantiin:** Lebih sedikit format, tapi **gratis tanpa batas dan tanpa antrian**

### vs iLovePDF
- **iLovePDF:** PDF tools lengkap, tapi OCR harus premium
- **Gantiin:** Tidak ada OCR, tapi **semua fitur gratis dan client-side**

### vs CloudConvert
- **CloudConvert:** 200+ format, tapi harus registrasi dan ada limit
- **Gantiin:** Lebih sedikit format, tapi **tanpa registrasi dan tanpa limit**

### vs Online-Convert
- **Online-Convert:** Banyak fitur, tapi penuh iklan
- **Gantiin:** Lebih sedikit fitur, tapi **tanpa iklan dan lebih bersih**

### vs Squoosh
- **Squoosh:** Client-side, tapi hanya image compression
- **Gantiin:** Client-side, tapi **lebih banyak fitur (PDF + Image)**

### Unique Value Proposition
**"Gratis, Aman, dan Mudah"** — Kombinasi unik yang tidak dimiliki kompetitor manapun:
1. **Gratis Tanpa Batas** — Tidak ada limit harian
2. **Client-Side Processing** — File tidak pernah meninggalkan browser
3. **Tanpa Registrasi** — Langsung gunakan
4. **Tanpa Iklan** — UI bersih dan fokus
5. **Mobile-First** — Bisa digunakan dari HP kapan saja
