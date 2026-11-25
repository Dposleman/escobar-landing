import { adminHeaders } from "./adminSession";

const MEDIA_ENDPOINT = "/api/media";
const MAX_SIDE = 1800;
const MAX_BYTES = 2_000_000;

export interface UploadedImage {
  url: string;
  width: number;
  height: number;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Scales the picture down in the browser (keeping transparency) so uploads stay small. */
async function prepare(file: File): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, 0.86);
    if (blob && blob.type === "image/webp" && blob.size <= MAX_BYTES) {
      bitmap.close();
      return { blob, width, height };
    }
    scale *= 0.75;
  }

  bitmap.close();
  throw new Error("The image is too large to upload.");
}

export async function uploadImage(file: File): Promise<UploadedImage> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    throw new Error("Choose a JPG, PNG or WebP picture.");
  }

  const { blob, width, height } = await prepare(file);
  const response = await fetch(MEDIA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...adminHeaders(),
    },
    body: JSON.stringify({ name: file.name, contentType: "image/webp", data: await blobToBase64(blob) }),
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean; url?: string; error?: string } | null;
  if (!response.ok || !result?.url) {
    throw new Error(result?.error === "Unauthorized" ? "Not authorised to upload." : "Upload failed. Try again.");
  }

  return { url: result.url, width, height };
}
