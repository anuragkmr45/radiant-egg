"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import type { CmsAssetRecord } from "@/lib/cms-assets";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface AdminImageToolsProps {
  canUpload: boolean;
  recentAssets: readonly CmsAssetRecord[];
}

interface UploadResult {
  asset: CmsAssetRecord;
  originalSize: number;
  compressedSize: number;
}

const formatExtensions: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getCompressedFileName(fileName: string, format: OutputFormat) {
  const baseName = fileName.replace(/\.[^.]+$/, "") || "image";

  return `${baseName}.${formatExtensions[format]}`;
}

function getAbsoluteAssetUrl(assetUrl: string, origin: string) {
  if (!origin) {
    return assetUrl;
  }

  try {
    return new URL(assetUrl, origin).toString();
  } catch {
    return assetUrl;
  }
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Unable to read this image."));
    };

    image.src = imageUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, format: OutputFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Unable to compress this image."));
      },
      format,
      quality,
    );
  });
}

async function compressImage({
  file,
  format,
  maxDimension,
  quality,
}: {
  file: File;
  format: OutputFormat;
  maxDimension: number;
  quality: number;
}) {
  const image = await loadImage(file);
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image compression is not available in this browser.");
  }

  canvas.width = width;
  canvas.height = height;

  if (format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, format, quality);

  return new File([blob], getCompressedFileName(file.name, format), {
    type: format,
  });
}

export function AdminImageTools({ canUpload, recentAssets }: AdminImageToolsProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>("image/webp");
  const [quality, setQuality] = useState(0.78);
  const [maxDimension, setMaxDimension] = useState(1600);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [origin, setOrigin] = useState("");

  const estimatedSettings = useMemo(() => {
    return `${Math.round(quality * 100)}% quality, ${maxDimension}px max edge`;
  }, [maxDimension, quality]);

  const generatedUrl = uploadResult ? getAbsoluteAssetUrl(uploadResult.asset.url, origin) : "";

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  function updateSelectedFile(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    setSelectedFile(nextFile);
    setFeedback("");
    setUploadResult(null);
    setCopiedUrl("");
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
    } catch {
      setFeedback("Unable to copy automatically. Select the URL and copy it manually.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setFeedback("Choose an image before uploading.");
      return;
    }

    setIsUploading(true);
    setFeedback("");
    setCopiedUrl("");

    try {
      const compressedFile = await compressImage({
        file: selectedFile,
        format,
        maxDimension,
        quality,
      });
      const formData = new FormData();

      formData.set("file", compressedFile);

      const response = await fetch("/api/admin/uploads", {
        body: formData,
        method: "POST",
      });
      const payload = (await response.json().catch(() => null)) as
        | {
            asset?: CmsAssetRecord;
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.asset) {
        setFeedback(payload?.message ?? "Unable to upload this image.");
        return;
      }

      setUploadResult({
        asset: payload.asset,
        compressedSize: compressedFile.size,
        originalSize: selectedFile.size,
      });
      setFeedback("Image uploaded. Use the URL below in any image field.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to upload this image.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="admin-tools">
      <section className="admin-content__section">
        <div className="admin-content__section-header">
          <div>
            <p className="admin-panel__eyebrow">Image Compressor</p>
            <h3>Upload and Copy Image URL</h3>
          </div>
          <span>{estimatedSettings}</span>
        </div>

        <form className="admin-tools__form" onSubmit={(event) => void submit(event)}>
          <label className="admin-content-field" htmlFor="admin-image-upload">
            <span className="admin-content-field__label">Image File</span>
            <span className="admin-content-field__control-wrap">
              <input
                accept="image/jpeg,image/png,image/webp"
                className="admin-content-field__control"
                disabled={!canUpload || isUploading}
                id="admin-image-upload"
                onChange={updateSelectedFile}
                type="file"
              />
            </span>
            <small className="admin-content-field__help">
              JPEG, PNG, or WebP. The upload is compressed before it is saved.
            </small>
          </label>

          <div className="admin-content__field-grid">
            <label className="admin-content-field" htmlFor="admin-image-format">
              <span className="admin-content-field__label">Output Format</span>
              <span className="admin-content-field__control-wrap">
                <select
                  className="admin-content-field__control"
                  disabled={!canUpload || isUploading}
                  id="admin-image-format"
                  onChange={(event) => setFormat(event.target.value as OutputFormat)}
                  value={format}
                >
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </span>
            </label>

            <label className="admin-content-field" htmlFor="admin-image-max-dimension">
              <span className="admin-content-field__label">Max Edge</span>
              <span className="admin-content-field__control-wrap">
                <input
                  className="admin-content-field__control"
                  disabled={!canUpload || isUploading}
                  id="admin-image-max-dimension"
                  max={3000}
                  min={640}
                  onChange={(event) => setMaxDimension(Number(event.target.value))}
                  step={80}
                  type="number"
                  value={maxDimension}
                />
              </span>
            </label>

            <label className="admin-content-field" htmlFor="admin-image-quality">
              <span className="admin-content-field__label">Quality</span>
              <span className="admin-content-field__control-wrap">
                <input
                  className="admin-content-field__control"
                  disabled={!canUpload || isUploading || format === "image/png"}
                  id="admin-image-quality"
                  max={0.95}
                  min={0.45}
                  onChange={(event) => setQuality(Number(event.target.value))}
                  step={0.01}
                  type="range"
                  value={quality}
                />
              </span>
              <small className="admin-content-field__help">{Math.round(quality * 100)}%</small>
            </label>
          </div>

          <div className="admin-content__actions">
            <button className="admin-auth-form__submit" disabled={!canUpload || isUploading} type="submit">
              {isUploading ? "Uploading..." : "Compress and Upload"}
            </button>
            {selectedFile ? (
              <span className="admin-dashboard__hint">Original size: {formatBytes(selectedFile.size)}</span>
            ) : null}
          </div>
        </form>

        {feedback ? (
          <p
            className={
              uploadResult ? "admin-content__notice" : "admin-content__notice admin-content__notice--error"
            }
          >
            {feedback}
          </p>
        ) : null}

        {uploadResult ? (
          <div className="admin-tools__result">
            <div className="admin-tools__preview">
              <Image
                alt=""
                className="admin-tools__image"
                fill
                sizes="(min-width: 768px) 18rem, 100vw"
                src={uploadResult.asset.url}
              />
            </div>
            <div className="admin-tools__url-card">
              <span className="admin-dashboard__label">Complete Image URL</span>
              <input className="admin-content-field__control" readOnly value={generatedUrl} />
              <div className="admin-tools__row">
                <button
                  className="admin-panel__link admin-panel__link--button"
                  onClick={() => void copyUrl(generatedUrl)}
                  type="button"
                >
                  Copy URL
                </button>
                <span className="admin-dashboard__hint">
                  {formatBytes(uploadResult.originalSize)} to {formatBytes(uploadResult.compressedSize)}
                </span>
              </div>
              {copiedUrl === generatedUrl ? (
                <span className="admin-dashboard__hint">Copied.</span>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      {recentAssets.length > 0 ? (
        <section className="admin-content__section">
          <div className="admin-content__section-header">
            <div>
              <p className="admin-panel__eyebrow">Recent Uploads</p>
              <h3>Reusable Image URLs</h3>
            </div>
            <span>{recentAssets.length} images</span>
          </div>
          <div className="admin-tools__asset-list">
            {recentAssets.map((asset) => (
              <article className="admin-tools__asset" key={asset.id}>
                <Image
                  alt=""
                  className="admin-tools__image"
                  height={88}
                  src={asset.url}
                  width={88}
                />
                <div>
                  <strong>{asset.fileName}</strong>
                  <span>{formatBytes(asset.byteSize)}</span>
                </div>
                <button
                  className="admin-panel__link admin-panel__link--button"
                  onClick={() => void copyUrl(getAbsoluteAssetUrl(asset.url, origin))}
                  type="button"
                >
                  {copiedUrl === getAbsoluteAssetUrl(asset.url, origin) ? "Copied" : "Copy"}
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
