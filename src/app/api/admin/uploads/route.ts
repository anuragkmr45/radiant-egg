import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { canStoreCmsAssets, saveCmsAsset } from "@/lib/cms-assets";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

function sanitizeFileName(name: string, extension: string) {
  const baseName = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return `${baseName || "image"}.${extension}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json(
      {
        message: "You must be logged in as an admin to upload images.",
      },
      { status: 401 },
    );
  }

  if (!canStoreCmsAssets()) {
    return Response.json(
      {
        message: "DATABASE_URL is not configured for image uploads.",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json(
      {
        message: "Choose an image file to upload.",
      },
      { status: 400 },
    );
  }

  const extension = allowedImageTypes.get(file.type);

  if (!extension) {
    return Response.json(
      {
        message: "Only JPEG, PNG, and WebP images are supported.",
      },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    return Response.json(
      {
        message: "Upload a compressed image smaller than 4 MB.",
      },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const savedAsset = await saveCmsAsset({
    buffer,
    contentType: file.type,
    fileName: sanitizeFileName(file.name, extension),
  });

  return Response.json(
    {
      asset: savedAsset,
      message: "Image uploaded.",
    },
    { status: 201 },
  );
}
