# Requirements Specification (Updated)

## 1. Functional Requirements

### Module: File Upload

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-001 | User dapat upload file dengan drag & drop | P0 | None |
| FR-002 | User dapat upload file dengan click-to-browse | P0 | None |
| FR-003 | System validasi file type berdasarkan magic bytes | P0 | None |
| FR-004 | System validasi file size (maks 50MB) | P0 | None |
| FR-005 | System tampilkan error untuk file tidak valid | P0 | FR-003, FR-004 |
| FR-006 | System tampilkan preview file setelah upload | P1 | FR-001, FR-002 |
| FR-007 | User dapat upload multiple files (batch) | P2 | FR-001 |
| FR-008 | System support upload dari clipboard (paste) | P2 | None |

### Module: PDF Conversion

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-010 | User dapat konversi PDF ke plain text | P0 | FR-001 |
| FR-011 | System extract text dengan layout yang sesuai | P0 | FR-010 |
| FR-012 | System tampilkan progress selama konversi | P0 | FR-010 |
| FR-013 | User dapat download hasil sebagai .txt file | P0 | FR-010 |
| FR-014 | User dapat copy text hasil konversi ke clipboard | P1 | FR-010 |
| FR-015 | User dapat merge 2+ PDF menjadi satu | P1 | FR-001 |
| FR-016 | User dapat split PDF berdasarkan halaman | P1 | FR-001 |
| FR-017 | User dapat konversi PDF ke gambar (PNG/JPG) | P1 | FR-001 |
| FR-018 | User dapat konversi gambar ke PDF | P1 | FR-001 |
| FR-019 | User dapat compress PDF | P2 | FR-001 |
| FR-020 | User dapat rotate PDF halaman | P2 | FR-001 |
| FR-021 | User dapat add page numbers ke PDF | P2 | FR-001 |

### Module: Image Conversion

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-030 | User dapat konversi PNG ke JPG | P0 | FR-001 |
| FR-031 | User dapat konversi JPG ke PNG | P0 | FR-001 |
| FR-032 | User dapat konversi PNG/JPG ke WebP | P0 | FR-001 |
| FR-033 | User dapat konversi WebP ke PNG/JPG | P0 | FR-001 |
| FR-034 | User dapat konversi HEIC ke JPG | P0 | FR-001 |
| FR-035 | User dapat atur quality JPG (1-100) | P1 | FR-030, FR-031 |
| FR-036 | User dapat resize gambar (width/height) | P1 | FR-001 |
| FR-037 | User dapat compress gambar | P1 | FR-001 |
| FR-038 | System tampilkan preview hasil konversi | P1 | FR-030-FR-034 |
| FR-039 | User dapat download hasil sebagai file | P0 | FR-030-FR-034 |
| FR-040 | User dapat crop gambar | P2 | FR-001 |
| FR-041 | User dapat rotate gambar | P2 | FR-001 |
| FR-042 | User dapat flip gambar (horizontal/vertical) | P2 | FR-001 |

### Module: Document Conversion (P2)

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-050 | User dapat konversi DOC/DOCX ke PDF | P2 | FR-001 |
| FR-051 | User dapat konversi PDF ke DOC/DOCX | P2 | FR-001 |
| FR-052 | User dapat konversi PPT/PPTX ke PDF | P2 | FR-001 |
| FR-053 | User dapat konversi XLS/XLSX ke PDF | P2 | FR-001 |
| FR-054 | User dapat konversi HTML ke PDF | P2 | FR-001 |
| FR-055 | User dapat konversi TXT ke PDF | P2 | FR-001 |

### Module: Download

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-060 | User dapat download hasil konversi | P0 | Any conversion |
| FR-061 | Filename sesuai dengan format tujuan | P0 | FR-060 |
| FR-062 | User dapat download sebagai ZIP (batch) | P2 | FR-007 |

### Module: Theme

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-070 | System support dark mode | P1 | None |
| FR-071 | System support light mode | P1 | None |
| FR-072 | User dapat toggle dark/light mode | P1 | FR-070, FR-071 |
| FR-073 | System detect system preference | P1 | FR-070, FR-071 |
| FR-074 | System simpan preference user | P1 | FR-072 |

### Module: Donation

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-080 | System tampilkan donation button | P1 | None |
| FR-081 | Donation button link ke Saweria | P1 | FR-080 |
| FR-082 | System tampilkan "Powered by donation" | P2 | FR-080 |

### Module: History (P2)

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-090 | System simpan riwayat konversi di localStorage | P2 | Any conversion |
| FR-091 | User dapat lihat riwayat konversi | P2 | FR-090 |
| FR-092 | User dapat download ulang dari riwayat | P2 | FR-090 |
| FR-093 | User dapat clear riwayat | P2 | FR-090 |

### Module: PWA (P2)

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-100 | System support PWA install | P2 | None |
| FR-101 | System support offline (basic) | P2 | FR-100 |
| FR-102 | System tampilkan install prompt | P2 | FR-100 |

---

## 2. Non-Functional Requirements

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-001 | Page Load (LCP) | < 2.5s (3G) | P0 |
| NFR-002 | Time to Interactive | < 3s | P0 |
| NFR-003 | Conversion Time (file < 10MB) | < 5s | P0 |
| NFR-004 | Conversion Time (file 10-50MB) | < 15s | P1 |
| NFR-005 | Bundle Size (gzipped) | < 200KB | P0 |
| NFR-006 | Lighthouse Performance Score | > 90 | P0 |
| NFR-007 | Lighthouse Accessibility Score | > 90 | P0 |
| NFR-008 | Lighthouse SEO Score | > 90 | P0 |
| NFR-009 | Browser Support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | P0 |
| NFR-010 | Mobile Responsive | Works on 320px - 2560px | P0 |
| NFR-011 | WCAG Compliance | 2.1 AA | P1 |
| NFR-012 | Uptime | 99.9% | P0 |
| NFR-013 | No Server-side Processing | 100% client-side | P0 |
| NFR-014 | File Privacy | No file leaves browser | P0 |
| NFR-015 | Memory Usage | No memory leak during conversion | P0 |
| NFR-016 | Concurrent Conversions | Support 3+ concurrent | P1 |
| NFR-017 | Error Recovery | Graceful fallback on failure | P0 |

---

## 3. Business Rules

| ID | Rule | Applies To |
|----|------|------------|
| BR-001 | File harus dalam format yang didukung | File Upload |
| BR-002 | File size maksimum 50MB | File Upload |
| BR-003 | Tidak ada limit konversi per hari | All Conversions |
| BR-004 | Tidak ada registrasi wajib | All Features |
| BR-005 | Tidak ada file yang disimpan di server | All Features |
| BR-006 | Hasil konversi hanya tersedia sesi ini | Download |
| BR-007 | Dark mode adalah default untuk pertama kali | Theme |
| BR-008 | Donation bersifat voluntary | Donation |
| BR-009 | History disimpan di localStorage (max 100 items) | History |
| BR-010 | PWA offline support hanya untuk landing page | PWA |

---

## 4. Format Support Matrix

### P0 - MVP Formats

| Format | Input | Output | Conversion |
|--------|-------|--------|------------|
| **PDF** | ✅ | ❌ | PDF → TXT |
| **PNG** | ✅ | ✅ | PNG → JPG, PNG → WebP |
| **JPG/JPEG** | ✅ | ✅ | JPG → PNG, JPG → WebP |
| **WEBP** | ✅ | ✅ | WEBP → PNG, WEBP → JPG |
| **HEIC** | ✅ | ❌ | HEIC → JPG |

### P1 - Extended Formats

| Format | Input | Output | Conversion |
|--------|-------|--------|------------|
| **PDF** | ✅ | ✅ | PDF → Image, Image → PDF |
| **PDF** | ✅ | ✅ | PDF Merge, PDF Split |
| **PNG/JPG** | ✅ | ✅ | Image Resize, Image Compress |

### P2 - Growth Formats

| Format | Input | Output | Conversion |
|--------|-------|--------|------------|
| **DOC/DOCX** | ✅ | ✅ | DOC ↔ PDF |
| **PPT/PPTX** | ✅ | ✅ | PPT ↔ PDF |
| **XLS/XLSX** | ✅ | ✅ | XLS ↔ PDF |
| **HTML** | ✅ | ✅ | HTML ↔ PDF |
| **TXT** | ✅ | ✅ | TXT ↔ PDF |
| **PDF** | ✅ | ✅ | PDF Compress, PDF Rotate |

### P3 - Future Formats

| Format | Input | Output | Conversion |
|--------|-------|--------|------------|
| **GIF** | ✅ | ✅ | GIF Support |
| **SVG** | ✅ | ✅ | SVG Support |
| **BMP** | ✅ | ✅ | BMP Support |
| **TIFF** | ✅ | ✅ | TIFF Support |
| **ODT** | ✅ | ✅ | ODT ↔ PDF |
| **RTF** | ✅ | ✅ | RTF ↔ PDF |
| **CSV** | ✅ | ✅ | CSV ↔ PDF |

---

## 5. Assumptions

- User memiliki browser modern (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- User memiliki koneksi internet minimal 3G
- User tidak membutuhkan akun atau registrasi
- File yang diupload bukan file berisi malware
- User memahami format file dasar (PDF, JPG, PNG, WEBP)
- User tidak membutuhkan batch conversion untuk MVP
- User tidak membutuhkan history konversi untuk MVP
- iPhone users membutuhkan HEIC conversion

---

## 6. Constraints

- **Technical:** Semua proses harus client-side (tidak ada server)
- **Budget:** Infrastructure cost harus Rp 0 (free tier)
- **Timeline:** MVP harus selesai dalam 8 minggu
- **Developer:** Solo developer
- **Browser:** Tidak bisa support browser lama (IE11, Chrome < 90)
- **File Size:** Maksimum 50MB karena memory browser
- **Format:** Hanya format populer untuk MVP (PDF, PNG, JPG, WEBP, HEIC)
- **Privacy:** Tidak boleh mengumpulkan data user
- **Memory:** Harus handle memory dengan baik untuk file besar

---

## 7. Acceptance Criteria Summary

### MVP Must Pass
- [ ] User bisa upload file dengan drag & drop
- [ ] User bisa upload file dengan click-to-browse
- [ ] User bisa konversi PDF ke TXT
- [ ] User bisa konversi PNG ke JPG
- [ ] User bisa konversi JPG ke PNG
- [ ] User bisa konversi PNG/JPG ke WebP
- [ ] User bisa konversi WebP ke PNG/JPG
- [ ] User bisa konversi HEIC ke JPG
- [ ] User bisa download hasil konversi
- [ ] Error handling untuk file tidak valid
- [ ] Mobile responsive
- [ ] Dark/Light mode
- [ ] Performance < 5s untuk file < 10MB
- [ ] Lighthouse score > 90

### Extended Features Must Pass (P1)
- [ ] User bisa merge PDF
- [ ] User bisa split PDF
- [ ] User bisa konversi PDF ke Image
- [ ] User bisa konversi Image ke PDF
- [ ] User bisa resize gambar
- [ ] User bisa compress gambar
- [ ] File preview sebelum convert
- [ ] Donation button
