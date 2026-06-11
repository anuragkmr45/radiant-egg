import { getCmsAsset } from "@/lib/cms-assets";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      assetId: string;
      fileName: string;
    }>;
  },
) {
  const { assetId } = await params;
  const asset = await getCmsAsset(assetId);

  if (!asset) {
    return new Response("Image not found.", { status: 404 });
  }

  const imageBuffer = Buffer.from(asset.dataBase64, "base64");

  return new Response(imageBuffer, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(asset.byteSize),
      "Content-Type": asset.contentType,
    },
  });
}
