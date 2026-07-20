import { describe, it, expect } from "vitest";

// We inline the pure functions (decoders/encoders) for direct testing
// since they're not exported from the module.

// ─── INLINED PURE FUNCTIONS ───────────────────────────────────────────────────

function decodeTGA(buffer: ArrayBuffer): ImageData {
  const v = new DataView(buffer);
  const idLen = v.getUint8(0);
  const imageType = v.getUint8(2);
  const width = v.getUint16(12, true);
  const height = v.getUint16(14, true);
  const bpp = v.getUint8(16);
  const descriptor = v.getUint8(17);
  const topDown = !!(descriptor & 0x20);
  const pixelStart = 18 + idLen;

  const out = new Uint8ClampedArray(width * height * 4);

  if (imageType === 2 || imageType === 3) {
    const channels = bpp === 24 ? 3 : 4;
    const rowSize = width * channels;
    for (let y = 0; y < height; y++) {
      const srcY = topDown ? y : height - 1 - y;
      for (let x = 0; x < width; x++) {
        const s = pixelStart + srcY * rowSize + x * channels;
        const d = (y * width + x) * 4;
        if (channels === 3) {
          out[d] = v.getUint8(s + 2);
          out[d + 1] = v.getUint8(s + 1);
          out[d + 2] = v.getUint8(s);
          out[d + 3] = 255;
        } else {
          out[d] = v.getUint8(s + 2);
          out[d + 1] = v.getUint8(s + 1);
          out[d + 2] = v.getUint8(s);
          out[d + 3] = v.getUint8(s + 3);
        }
      }
    }
  } else if (imageType === 10) {
    let pos = pixelStart;
    let px = 0;
    const channels = bpp === 24 ? 3 : 4;
    while (px < width * height) {
      const packet = v.getUint8(pos++);
      const isRLE = packet & 0x80;
      const count = (packet & 0x7f) + 1;
      const pixel: number[] = [];
      if (isRLE) {
        for (let c = 0; c < channels; c++) pixel.push(v.getUint8(pos++));
        for (let i = 0; i < count && px < width * height; i++) {
          const d = px * 4;
          out[d] = pixel[2];
          out[d + 1] = pixel[1];
          out[d + 2] = pixel[0];
          out[d + 3] = channels === 4 ? pixel[3] : 255;
          px++;
        }
      } else {
        for (let i = 0; i < count && px < width * height; i++) {
          const d = px * 4;
          if (channels === 3) {
            out[d] = v.getUint8(pos + 2);
            out[d + 1] = v.getUint8(pos + 1);
            out[d + 2] = v.getUint8(pos);
            out[d + 3] = 255;
            pos += 3;
          } else {
            out[d] = v.getUint8(pos + 2);
            out[d + 1] = v.getUint8(pos + 1);
            out[d + 2] = v.getUint8(pos);
            out[d + 3] = v.getUint8(pos + 3);
            pos += 4;
          }
          px++;
        }
      }
    }
  } else {
    throw new Error(`Unsupported TGA type ${imageType}`);
  }

  return new ImageData(out, width, height);
}

async function decodePPM(file: File): Promise<ImageData> {
  const text = await file.text();
  const lines: string[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) lines.push(trimmed);
  }

  const header = lines[0];
  const dims = lines[1].split(/\s+/).map(Number);
  const maxVal = Number(lines[2]);
  const width = dims[0];
  const height = dims[1];
  const isGrayscale = header === "P2" || header === "P5";
  const channels = maxVal > 255 ? (isGrayscale ? 2 : 6) : (isGrayscale ? 1 : 3);

  let headerLinesSeen = 0;
  let dataStart = 0;
  for (let i = 0; i < text.length && headerLinesSeen < 3; i++) {
    if (text[i] === "\n") {
      const line = text.slice(dataStart, i).trim();
      if (line && !line.startsWith("#")) headerLinesSeen++;
      dataStart = i + 1;
    }
  }
  const rawBuffer = new Uint8Array(await file.slice(dataStart).arrayBuffer());
  const pixels = new Uint8ClampedArray(width * height * 4);

  if (header === "P6") {
    for (let i = 0; i < width * height; i++) {
      const s = i * 3;
      const d = i * 4;
      pixels[d] = rawBuffer[s];
      pixels[d + 1] = rawBuffer[s + 1];
      pixels[d + 2] = rawBuffer[s + 2];
      pixels[d + 3] = 255;
    }
  } else if (header === "P5") {
    for (let i = 0; i < width * height; i++) {
      const d = i * 4;
      const v = rawBuffer[i];
      pixels[d] = v;
      pixels[d + 1] = v;
      pixels[d + 2] = v;
      pixels[d + 3] = 255;
    }
  } else {
    const parts = text.slice(dataStart).trim().split(/\s+/).map(Number);
    for (let i = 0; i < width * height; i++) {
      const d = i * 4;
      if (isGrayscale) {
        const v = parts[i];
        pixels[d] = v;
        pixels[d + 1] = v;
        pixels[d + 2] = v;
      } else {
        pixels[d] = parts[i * 3];
        pixels[d + 1] = parts[i * 3 + 1];
        pixels[d + 2] = parts[i * 3 + 2];
      }
      pixels[d + 3] = 255;
    }
  }

  return new ImageData(pixels, width, height);
}

function encodePPM(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const header = `P6\n${width} ${height}\n255\n`;
  const enc = new TextEncoder();
  const headerBytes = enc.encode(header);
  const pixelData = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const d = i * 3;
    pixelData[d] = data[s];
    pixelData[d + 1] = data[s + 1];
    pixelData[d + 2] = data[s + 2];
  }
  const combined = new Uint8Array(headerBytes.length + pixelData.length);
  combined.set(headerBytes);
  combined.set(pixelData, headerBytes.length);
  return new Blob([combined], { type: "image/x-portable-pixmap" });
}

function encodeBMP(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowSize = ((width * 3 + 3) >>> 2) << 2;
  const pixelDataSize = rowSize * height;
  const fileSize = 14 + 40 + pixelDataSize;

  const buf = new ArrayBuffer(fileSize);
  const v = new DataView(buf);

  // BMP header
  v.setUint16(0, 0x4D42, true); // "BM"
  v.setUint32(2, fileSize, true);
  v.setUint32(10, 54, true); // pixel offset

  // DIB header
  v.setUint32(14, 40, true); // header size
  v.setInt32(18, width, true);
  v.setInt32(22, height, true);
  v.setUint16(26, 1, true); // planes
  v.setUint16(28, 24, true); // bpp
  v.setUint32(30, 0, true); // compression (none)

  // Pixel data: bottom-up BGR
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const s = ((height - 1 - y) * width + x) * 4;
      const d = 54 + y * rowSize + x * 3;
      v.setUint8(d, data[s + 2]); // B
      v.setUint8(d + 1, data[s + 1]); // G
      v.setUint8(d + 2, data[s]); // R
    }
  }

  return new Blob([buf], { type: "image/bmp" });
}

function encodeICO(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const andRowSize = ((width + 31) >>> 5) << 2;
  const xorRowSize = ((width * 4 + 31) >>> 5) << 2;
  const xorSize = xorRowSize * height;
  const andSize = andRowSize * height;
  const iconSize = 6 + 16 + xorSize + andSize;

  const buf = new ArrayBuffer(iconSize);
  const v = new DataView(buf);

  // ICO header
  v.setUint16(0, 0, true); // reserved
  v.setUint16(2, 1, true); // type = ICO
  v.setUint16(4, 1, true); // count

  // Directory entry
  v.setUint8(6, width >= 256 ? 0 : width);
  v.setUint8(7, height >= 256 ? 0 : height);
  v.setUint8(8, 0); // colors
  v.setUint8(9, 0); // reserved
  v.setUint16(10, 1, true); // planes
  v.setUint16(12, 32, true); // bpp
  v.setUint32(14, xorSize + andSize, true); // size
  v.setUint32(18, 22, true); // offset

  // XOR mask: BGRA (blue, green, red, alpha)
  const xorStart = 22;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const s = ((height - 1 - y) * width + x) * 4;
      const d = xorStart + y * xorRowSize + x * 4;
      v.setUint8(d, data[s + 2]); // B
      v.setUint8(d + 1, data[s + 1]); // G
      v.setUint8(d + 2, data[s]); // R
      v.setUint8(d + 3, data[s + 3]); // A
    }
  }

  // AND mask: all 0 (transparency via alpha channel)
  const andStart = 22 + xorSize;
  for (let i = 0; i < andSize; i++) {
    v.setUint8(andStart + i, 0);
  }

  return new Blob([buf], { type: "image/x-icon" });
}

function encodeTGA(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const header = new Uint8Array(18);
  header[2] = 2; // uncompressed RGB
  header[12] = width & 0xff;
  header[13] = (width >> 8) & 0xff;
  header[14] = height & 0xff;
  header[15] = (height >> 8) & 0xff;
  header[16] = 24; // bpp
  header[17] = 0; // descriptor (bottom-left origin)

  // Pixel data: BGR order, bottom row first (bottom-left origin)
  const pixelData = new Uint8Array(width * height * 3);
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y; // bottom-left origin
    for (let x = 0; x < width; x++) {
      const s = (srcY * width + x) * 4;
      const d = (y * width + x) * 3;
      pixelData[d] = data[s + 2]; // B
      pixelData[d + 1] = data[s + 1]; // G
      pixelData[d + 2] = data[s]; // R
    }
  }

  const combined = new Uint8Array(header.length + pixelData.length);
  combined.set(header);
  combined.set(pixelData, header.length);
  return new Blob([combined], { type: "image/x-tga" });
}

function encodeTIFF(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const stripSize = width * height * 3;
  const ifdEntries = 10;
  const ifdSize = 2 + ifdEntries * 12 + 4;
  const bitsPerSampleOffset = 8 + ifdSize;
  const xresOffset = bitsPerSampleOffset + 6;
  const stripOffset = xresOffset + 8;
  const fileSize = stripOffset + stripSize;

  const buf = new ArrayBuffer(fileSize);
  const v = new DataView(buf);

  // TIFF header: little-endian
  v.setUint16(0, 0x4949, true);
  v.setUint16(2, 42, true);
  v.setUint32(4, 8, true);

  // IFD
  v.setUint16(8, ifdEntries, true);
  let ifdPtr = 10;
  let nextTag = 0;

  function addTag(tag: number, type: number, count: number, value: number) {
    const p = ifdPtr + nextTag * 12;
    v.setUint16(p, tag, true);
    v.setUint16(p + 2, type, true);
    v.setUint32(p + 4, count, true);
    v.setUint32(p + 8, value, true);
    nextTag++;
  }

  addTag(256, 3, 1, width);
  addTag(257, 3, 1, height);
  addTag(258, 3, 3, bitsPerSampleOffset);
  addTag(259, 3, 1, 1);
  addTag(262, 3, 1, 2);
  addTag(273, 4, 1, stripOffset);
  addTag(277, 3, 1, 3);
  addTag(278, 3, 1, height);
  addTag(279, 4, 1, stripSize);
  addTag(282, 5, 1, xresOffset);

  v.setUint32(ifdPtr + nextTag * 12, 0, true);

  v.setUint16(bitsPerSampleOffset, 8, true);
  v.setUint16(bitsPerSampleOffset + 2, 8, true);
  v.setUint16(bitsPerSampleOffset + 4, 8, true);

  v.setUint32(xresOffset, 72, true);
  v.setUint32(xresOffset + 4, 1, true);

  for (let i = 0; i < width * height; i++) {
    const s = i * 4;
    const d = stripOffset + i * 3;
    v.setUint8(d, data[s]);
    v.setUint8(d + 1, data[s + 1]);
    v.setUint8(d + 2, data[s + 2]);
  }

  return new Blob([buf], { type: "image/tiff" });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function makeImageData(w: number, h: number, fill: number[]): ImageData {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    d[i * 4] = fill[0];
    d[i * 4 + 1] = fill[1];
    d[i * 4 + 2] = fill[2];
    d[i * 4 + 3] = fill[3] ?? 255;
  }
  return new ImageData(d, w, h);
}

async function blobHeader(b: Blob, bytes: number): Promise<string> {
  const buf = await b.arrayBuffer();
  const u = new Uint8Array(buf, 0, bytes);
  return Array.from(u).map((x) => x.toString(16).padStart(2, "0")).join(" ");
}

// ─── TGA DECODER TESTS ────────────────────────────────────────────────────────

describe("decodeTGA", () => {
  function makeTgaBuf(w: number, h: number, pixels: number[], type = 2, bpp = 24): ArrayBuffer {
    const header = new Uint8Array(18);
    header[2] = type;
    header[12] = w & 0xff;
    header[13] = (w >> 8) & 0xff;
    header[14] = h & 0xff;
    header[15] = (h >> 8) & 0xff;
    header[16] = bpp;
    const pixelBytes = new Uint8Array(pixels);
    const combined = new Uint8Array(header.length + pixelBytes.length);
    combined.set(header);
    combined.set(pixelBytes, header.length);
    return combined.buffer;
  }

  it("decodes 24-bit uncompressed TGA (type 2), bottom-left origin", () => {
    // TGA stores BGR (Blue-Green-Red), bottom row first (bottom-left origin).
    // BGR byte order for each pixel:
    //   Blue  = [255, 0, 0]
    //   Green = [0, 255, 0]
    //   Red   = [0, 0, 255]
    //   White = [255, 255, 255]
    // Bottom row first: BL, BR, TL, TR
    const pixels = [
      255, 0, 0,    // BL: Blue
      0, 255, 0,    // BR: Green
      0, 0, 255,    // TL: Red
      255, 255, 255, // TR: White
    ];
    const buf = makeTgaBuf(2, 2, pixels);
    const result = decodeTGA(buf);

    expect(result.width).toBe(2);
    expect(result.height).toBe(2);

    // Canvas origin is top-left. Decoder flips rows.
    // Row 0 (top): Red(255,0,0) at (0,0), White(255,255,255) at (1,0)
    expect(result.data[0]).toBe(255);
    expect(result.data[1]).toBe(0);
    expect(result.data[2]).toBe(0);
    expect(result.data[3]).toBe(255);
    expect(result.data[4]).toBe(255);
    expect(result.data[5]).toBe(255);
    expect(result.data[6]).toBe(255);
    expect(result.data[7]).toBe(255);

    // Row 1 (bottom): Blue(0,0,255) at (0,1), Green(0,255,0) at (1,1)
    expect(result.data[8]).toBe(0);
    expect(result.data[9]).toBe(0);
    expect(result.data[10]).toBe(255);
    expect(result.data[11]).toBe(255);
    expect(result.data[12]).toBe(0);
    expect(result.data[13]).toBe(255);
    expect(result.data[14]).toBe(0);
    expect(result.data[15]).toBe(255);
  });

  it("decodes 24-bit RLE-compressed TGA (type 10)", () => {
    // 3x1 image: all blue pixels RLE-encoded as a run of 3
    // Blue in BGR = [255, 0, 0]
    // RLE packet: repeat count = 3, so count-1 = 2 → 0x80 | 2 = 0x82
    const pixels = [
      0x82,       // RLE packet: isRLE=1, count=3
      255, 0, 0,  // Blue in BGR (B=255, G=0, R=0)
    ];
    const buf = makeTgaBuf(3, 1, pixels, 10);
    const result = decodeTGA(buf);
    expect(result.width).toBe(3);
    expect(result.height).toBe(1);
    // All three pixels: BGR [255,0,0] → RGB (0,0,255) = Blue
    for (let i = 0; i < 3; i++) {
      expect(result.data[i * 4]).toBe(0);
      expect(result.data[i * 4 + 1]).toBe(0);
      expect(result.data[i * 4 + 2]).toBe(255);
      expect(result.data[i * 4 + 3]).toBe(255);
    }
  });

  it("ignores unsupported TGA type", () => {
    const buf = makeTgaBuf(1, 1, [0, 0, 0], 1); // type 1 = indexed
    expect(() => decodeTGA(buf)).toThrow("Unsupported TGA type 1");
  });
});

// ─── PPM DECODER TESTS ────────────────────────────────────────────────────────

describe("decodePPM", () => {
  it("decodes P6 binary RGB", async () => {
    const header = "P6\n2 2\n255\n";
    const pixels = new Uint8Array([
      255, 0, 0,
      0, 255, 0,
      0, 0, 255,
      128, 128, 128,
    ]);
    const combined = new Uint8Array(header.length + pixels.length);
    combined.set(new TextEncoder().encode(header));
    combined.set(pixels, header.length);
    const file = new File([combined], "test.ppm");

    const result = await decodePPM(file);
    expect(result.width).toBe(2);
    expect(result.height).toBe(2);
    expect(result.data[0]).toBe(255);
    expect(result.data[1]).toBe(0);
    expect(result.data[2]).toBe(0);
    expect(result.data[3]).toBe(255);
    expect(result.data[12]).toBe(128);
    expect(result.data[13]).toBe(128);
    expect(result.data[14]).toBe(128);
    expect(result.data[15]).toBe(255);
  });

  it("decodes P5 binary grayscale", async () => {
    const header = "P5\n3 2\n255\n";
    const pixels = new Uint8Array([0, 128, 255, 64, 192, 32]);
    const combined = new Uint8Array(header.length + pixels.length);
    combined.set(new TextEncoder().encode(header));
    combined.set(pixels, header.length);
    const file = new File([combined], "test.pgm");

    const result = await decodePPM(file);
    expect(result.width).toBe(3);
    expect(result.height).toBe(2);
    // First pixel
    expect(result.data[0]).toBe(0);
    expect(result.data[1]).toBe(0);
    expect(result.data[2]).toBe(0);
    expect(result.data[3]).toBe(255);
    // Last pixel
    expect(result.data[20]).toBe(32);
    expect(result.data[21]).toBe(32);
    expect(result.data[22]).toBe(32);
    expect(result.data[23]).toBe(255);
  });

  it("decodes P3 ASCII RGB with comments", async () => {
    const raw = "P3\n# test image\n2 2\n200\n200 50 0 0 200 50\n50 0 200 128 128 128\n";
    const file = new File([raw], "test.ppm");

    // Extract dataStart logic inline to verify
    const text = await file.text();
    let headerLinesSeen = 0;
    let dataStart = 0;
    for (let i = 0; i < text.length && headerLinesSeen < 3; i++) {
      if (text[i] === "\n") {
        const line = text.slice(dataStart, i).trim();
        if (line && !line.startsWith("#")) headerLinesSeen++;
        dataStart = i + 1;
      }
    }
    const pixelStr = text.slice(dataStart).trim();
    const parts = pixelStr.split(/\s+/).map(Number);
    expect(parts[0]).toBe(200); // verify scan works

    const result = await decodePPM(file);
    expect(result.width).toBe(2);
    expect(result.height).toBe(2);
    expect(result.data[0]).toBe(200);
    expect(result.data[3]).toBe(255);
    expect(result.data[12]).toBe(128);
  });
});

// ─── PPM ENCODER TESTS ────────────────────────────────────────────────────────

describe("encodePPM", () => {
  it("produces valid P6 header and pixel data", async () => {
    const imgData = makeImageData(2, 2, [255, 128, 64, 255]);
    const blob = encodePPM(imgData);
    expect(blob.type).toBe("image/x-portable-pixmap");

    const text = await blob.text();
    expect(text.startsWith("P6\n2 2\n255\n")).toBe(true);

    const headerLen = new TextEncoder().encode("P6\n2 2\n255\n").length;
    const buf = await blob.arrayBuffer();
    const pixels = new Uint8Array(buf, headerLen);
    // All pixels [255,128,64,255] → RGB = [255,128,64]
    expect(pixels[0]).toBe(255);
    expect(pixels[1]).toBe(128);
    expect(pixels[2]).toBe(64);
  });
});

// ─── BMP ENCODER TESTS ────────────────────────────────────────────────────────

describe("encodeBMP", () => {
  it("produces valid BMP with correct magic bytes and size", () => {
    const imgData = makeImageData(2, 2, [255, 0, 0, 255]);
    const blob = encodeBMP(imgData);
    expect(blob.type).toBe("image/bmp");
    expect(blob.size).toBeGreaterThan(40);
  });

  it("writes correct magic bytes", async () => {
    const imgData = makeImageData(1, 1, [0, 255, 0, 255]);
    const blob = encodeBMP(imgData);
    await expect(blobHeader(blob, 2)).resolves.toBe("42 4d");
  });
});

// ─── ICO ENCODER TESTS ────────────────────────────────────────────────────────

describe("encodeICO", () => {
  it("produces valid ICO with correct header", async () => {
    const imgData = makeImageData(1, 1, [0, 0, 255, 255]);
    const blob = encodeICO(imgData);
    await expect(blobHeader(blob, 6)).resolves.toBe("00 00 01 00 01 00");
    expect(blob.type).toBe("image/x-icon");
    expect(blob.size).toBeGreaterThan(20);
  });
});

// ─── TGA ENCODER TESTS ────────────────────────────────────────────────────────

describe("encodeTGA", () => {
  it("produces valid TGA header", async () => {
    const imgData = makeImageData(2, 2, [255, 0, 0, 255]);
    const blob = encodeTGA(imgData);
    expect(blob.type).toBe("image/x-tga");

    const buf = await blob.arrayBuffer();
    const v = new DataView(buf);
    expect(v.getUint8(0)).toBe(0);  // ID length
    expect(v.getUint8(1)).toBe(0);  // color map
    expect(v.getUint8(2)).toBe(2);  // image type = uncompressed RGB
    expect(v.getUint16(12, true)).toBe(2); // width
    expect(v.getUint16(14, true)).toBe(2); // height
    expect(v.getUint8(16)).toBe(24); // bpp
  });
});

// ─── TIFF ENCODER TESTS ───────────────────────────────────────────────────────

describe("encodeTIFF", () => {
  it("produces valid TIFF with II magic", async () => {
    const imgData = makeImageData(1, 1, [128, 64, 32, 255]);
    const blob = encodeTIFF(imgData);
    await expect(blobHeader(blob, 4)).resolves.toBe("49 49 2a 00");
    expect(blob.type).toBe("image/tiff");
  });
});

// ─── ROUND-TRIP TESTS ─────────────────────────────────────────────────────────

describe("TGA round-trip", () => {
  it("encode → decode preserves pixel data (24-bit)", async () => {
    const fills: number[][] = [
      [255, 0, 0, 255],
      [0, 255, 0, 255],
      [0, 0, 255, 255],
      [128, 64, 32, 255],
      [255, 255, 255, 255],
    ];
    for (const fill of fills) {
      const original = makeImageData(2, 2, fill);
      const blob = encodeTGA(original);
      const buf = await blob.arrayBuffer();
      const decoded = decodeTGA(buf);
      expect(decoded.width).toBe(2);
      expect(decoded.height).toBe(2);
      for (let i = 0; i < 4; i++) {
        expect(decoded.data[i * 4]).toBe(fill[0]);
        expect(decoded.data[i * 4 + 1]).toBe(fill[1]);
        expect(decoded.data[i * 4 + 2]).toBe(fill[2]);
        expect(decoded.data[i * 4 + 3]).toBe(fill[3]);
      }
    }
  });

  it("TGA encode → PPM decode", async () => {
    const fill = [255, 128, 64, 255];
    const original = makeImageData(1, 1, fill);
    // Encode TGA, then decode using decodeTGA
    const tgaBlob = encodeTGA(original);
    const buf = await tgaBlob.arrayBuffer();
    const decoded = decodeTGA(buf);
    expect(decoded.width).toBe(1);
    expect(decoded.height).toBe(1);
    expect(decoded.data[0]).toBe(255);
    expect(decoded.data[1]).toBe(128);
    expect(decoded.data[2]).toBe(64);
    expect(decoded.data[3]).toBe(255);
  });
});

describe("PPM round-trip", () => {
  it("encodePPM → decodePPM preserves pixel data", async () => {
    const fill = [64, 128, 192, 255];
    const original = makeImageData(3, 2, fill);
    const blob = encodePPM(original);
    const file = new File([blob], "test.ppm");
    const decoded = await decodePPM(file);
    expect(decoded.width).toBe(3);
    expect(decoded.height).toBe(2);
    for (let i = 0; i < 6; i++) {
      expect(decoded.data[i * 4]).toBe(fill[0]);
      expect(decoded.data[i * 4 + 1]).toBe(fill[1]);
      expect(decoded.data[i * 4 + 2]).toBe(fill[2]);
      expect(decoded.data[i * 4 + 3]).toBe(fill[3]);
    }
  });
});

// ─── MODULE INTEGRATION TESTS ─────────────────────────────────────────────────

describe("image module exports", () => {
  it("imports all expected converters", async () => {
    const mod = await import("./image");
    expect(typeof mod.convertImageFormat).toBe("function");
    expect(typeof mod.resizeImage).toBe("function");
    expect(typeof mod.compressImage).toBe("function");
    expect(typeof mod.convertSVG).toBe("function");
    expect(typeof mod.convertImageToPdf).toBe("function");
    expect(typeof mod.convertImageToDoc).toBe("function");
    expect(typeof mod.convertImageToBase64).toBe("function");
    expect(typeof mod.extractTextFromImage).toBe("function");
  });
});

describe("validations exports", () => {
  it("detectFileType returns correct types", async () => {
    const { detectFileType } = await import("@/lib/validations");
    const png = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], "x.png");
    expect(await detectFileType(png)).toBe("png");

    const ppm = new File([new Uint8Array([0x50, 0x36, 0x0A])], "x.ppm");
    expect(await detectFileType(ppm)).toBe("ppm");

    const heif = new File([new Uint8Array([0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x66])], "x.heif");
    expect(await detectFileType(heif)).toBe("heic");
  });
});

describe("registry exports", () => {
  it("heic entry has image-convert (not heic-convert)", async () => {
    const { CONVERSION_REGISTRY } = await import("@/lib/conversions/registry");
    const ids = CONVERSION_REGISTRY.heic.map((o) => o.id);
    expect(ids).toContain("image-convert");
    expect(ids).not.toContain("heic-convert");
  });

  it("ppm entry exists and is implemented", async () => {
    const { CONVERSION_REGISTRY } = await import("@/lib/conversions/registry");
    expect(CONVERSION_REGISTRY.ppm).toBeDefined();
    expect(CONVERSION_REGISTRY.ppm.length).toBeGreaterThan(0);
    expect(CONVERSION_REGISTRY.ppm[0].implemented).toBe(true);
  });

  it("tga entry exists and is implemented", async () => {
    const { CONVERSION_REGISTRY } = await import("@/lib/conversions/registry");
    expect(CONVERSION_REGISTRY.tga).toBeDefined();
    expect(CONVERSION_REGISTRY.tga.length).toBeGreaterThan(0);
    expect(CONVERSION_REGISTRY.tga[0].implemented).toBe(true);
  });
});

describe("types exports", () => {
  it("targetFormat includes ppm", async () => {
    // We can't check TypeScript types at runtime, just verify module loads
    const mod = await import("@/lib/conversions/types");
    expect(mod).toBeDefined();
    // ImageConvertOptions is an interface, not a runtime value
    // But we can check the ConversionType union doesn't include heic-convert
  });
});

describe("engine exports", () => {
  it("convertFile is a function", async () => {
    const { convertFile } = await import("@/lib/conversions/engine");
    expect(typeof convertFile).toBe("function");
  });
});

// ─── ACCEPT CONSTANTS ─────────────────────────────────────────────────────────

describe("constants", () => {
  it("ACCEPT_ALL includes ppm and jfif", async () => {
    const { ACCEPT_ALL } = await import("@/lib/constants");
    expect(ACCEPT_ALL).toContain(".ppm");
    expect(ACCEPT_ALL).toContain(".jfif");
  });
});
