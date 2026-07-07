# Sequence Diagrams

## User Registration Flow
*Tidak ada user registration — Gantiin tidak memerlukan akun.*

---

## PDF to Text Conversion Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Next.js UI
    participant Drop as DropZone
    participant Conv as Conversion Engine
    participant Worker as Web Worker
    participant Lib as pdf.js

    User->>Drop: Drag & drop PDF file
    Drop->>UI: onDrop(file)
    UI->>UI: Validate file type & size
    UI->>Conv: convertFile(file, {type: 'pdf-to-text'})
    Conv->>Worker: Post file to worker
    Worker->>Lib: Load PDF document
    Lib-->>Worker: PDF document
    Worker->>Lib: Extract text from pages
    Lib-->>Worker: Text content
    Worker->>Conv: Return converted text
    Conv->>UI: Update state with result
    UI->>User: Show text preview + download button
    User->>UI: Click download
    UI->>UI: Create blob and trigger download
```

---

## Image Format Conversion Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Next.js UI
    participant Drop as DropZone
    participant Conv as Conversion Engine
    participant Worker as Web Worker
    participant Lib as Image Library

    User->>Drop: Drag & drop image file
    Drop->>UI: onDrop(file)
    UI->>UI: Validate file type & size
    UI->>UI: Show image preview
    User->>UI: Select target format (JPG/PNG/WebP)
    User->>UI: Adjust quality (optional)
    UI->>Conv: convertFile(file, {format, quality})
    Conv->>Worker: Post file + options
    Worker->>Lib: Process image conversion
    Lib-->>Worker: Converted image
    Worker->>Conv: Return blob
    Conv->>UI: Update state with result
    UI->>User: Show converted preview + download button
    User->>UI: Click download
    UI->>UI: Create blob URL and trigger download
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
    participant Store as Zustand Store
    participant Local as localStorage

    User->>UI: Click theme toggle
    UI->>Store: toggleTheme()
    Store->>Local: Save preference
    Store->>UI: Update state
    UI->>UI: Apply theme class to <html>
    UI->>User: Theme changed
```

---

## Download Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as ConvertResult
    participant FS as file-saver
    participant Browser as Browser

    User->>UI: Click download button
    UI->>UI: Get blob from state
    UI->>FS: saveAs(blob, filename)
    FS->>Browser: Create object URL
    FS->>Browser: Trigger download
    Browser->>User: File saved to downloads
    UI->>UI: Revoke object URL (cleanup)
```
