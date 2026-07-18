# Sequence Diagrams

## User Registration Flow
*Tidak ada user registration — Gantiin tidak memerlukan akun.*

---

## PDF to Text Conversion Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as UniversalConverter
    participant Drop as DropZone
    participant Opt as ConversionOptions
    participant Conv as Conversion Engine
    participant Lib as pdf.js (worker internal)

    User->>Drop: Drag & drop PDF file
    Drop->>UI: onFilesSelected([file])
    UI->>UI: validateFile (magic bytes + size)
    UI->>Lib: renderPdfThumbnail (async, lazy-load)
    Lib-->>UI: Thumbnail halaman 1
    UI->>Opt: Tampilkan opsi "Bisa dikonversi ke:"
    User->>Opt: Pilih "PDF ke Teks"
    Opt->>UI: onSelect(option)
    UI->>Conv: convertFile(file, 'pdf-to-text', onProgress)
    Conv->>Lib: getDocument + extract text per halaman
    Lib-->>Conv: Text content + progress %
    Conv-->>UI: ConversionResultData (blob .txt)
    UI->>User: Show text preview + download button
    User->>UI: Click download
    UI->>UI: downloadBlob (native <a download>)
```

---

## Image Format Conversion Flow (Sprint 3)

```mermaid
sequenceDiagram
    actor User
    participant UI as UniversalConverter
    participant Drop as DropZone
    participant Opt as ConversionOptions
    participant Conv as Conversion Engine
    participant Canvas as Canvas API

    User->>Drop: Drag & drop image file
    Drop->>UI: onFilesSelected([file])
    UI->>UI: validateFile (magic bytes + size)
    UI->>UI: Show image preview (object URL)
    UI->>Opt: Tampilkan opsi "Bisa dikonversi ke:"
    User->>Opt: Pilih "Ganti Format"
    User->>UI: Select target format (JPG/PNG/WebP)
    User->>UI: Adjust quality (optional)
    UI->>Conv: convertFile(file, 'image-convert', options)
    Conv->>Canvas: createImageBitmap + draw + toBlob
    Canvas-->>Conv: Converted image blob
    Conv-->>UI: ConversionResultData
    UI->>User: Show converted preview + download button
    User->>UI: Click download
    UI->>UI: downloadBlob (native <a download>)
```

---

## PDF Merge Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Next.js UI
    participant Drop as DropZone
    participant Conv as Conversion Engine
    participant Worker as Web Worker
    participant Lib as pdf-lib

    User->>Drop: Drag & drop multiple PDFs
    Drop->>UI: onDrop(files[])
    UI->>UI: Validate all files
    UI->>UI: Show file list with order
    User->>UI: Reorder files (drag & drop)
    User->>UI: Click "Merge"
    UI->>Conv: mergePDFs(files[])
    Conv->>Worker: Post files to worker
    Worker->>Lib: Create new PDF
    loop For each PDF
        Worker->>Lib: Load and merge pages
    end
    Lib-->>Worker: Merged PDF
    Worker->>Conv: Return merged blob
    Conv->>UI: Update state with result
    UI->>User: Show merged preview + download button
    User->>UI: Click download
    UI->>UI: Create blob URL and trigger download
```

---

## Error Handling Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Next.js UI
    participant Drop as DropZone
    participant Conv as Conversion Engine

    User->>Drop: Drag & drop file
    Drop->>UI: onDrop(file)
    
    alt Invalid file type
        UI->>UI: Validate file type
        UI->>User: Show error toast "Format tidak didukung"
    else File too large
        UI->>UI: Validate file size
        UI->>User: Show error toast "File terlalu besar (maks 50MB)"
    else Conversion failed
        UI->>Conv: convertFile(file)
        Conv-->>UI: Error thrown
        UI->>User: Show error toast "Gagal mengkonversi file"
    else Success
        UI->>Conv: convertFile(file)
        Conv-->>UI: Success result
        UI->>User: Show success toast + download button
    end
```

---

## Theme Toggle Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as ThemeToggle
    participant NT as next-themes
    participant Local as localStorage

    User->>UI: Click theme toggle
    UI->>NT: setTheme('light' | 'dark')
    NT->>Local: Save preference (otomatis)
    NT->>UI: Apply class .dark ke <html>
    UI->>User: Theme changed (icon Sun/Moon via CSS dark: variant)
```

---

## Download Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as ConvertResult
    participant DL as downloadBlob
    participant Browser as Browser

    User->>UI: Click download button
    UI->>DL: downloadBlob(blob, filename)
    DL->>Browser: URL.createObjectURL(blob)
    DL->>Browser: <a download> click (native)
    Browser->>User: File saved to downloads
    DL->>DL: Revoke object URL (cleanup)
```
