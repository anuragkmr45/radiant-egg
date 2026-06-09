export type CmsFieldPathSegment = string | number;

const cmsFieldPrefix = "cms-field:";

export function encodeCmsFieldName(path: readonly CmsFieldPathSegment[]) {
  return `${cmsFieldPrefix}${path.map((segment) => encodeURIComponent(String(segment))).join("/")}`;
}

export function decodeCmsFieldName(name: string): CmsFieldPathSegment[] | null {
  if (!name.startsWith(cmsFieldPrefix)) {
    return null;
  }

  const rawPath = name.slice(cmsFieldPrefix.length);

  if (!rawPath) {
    return null;
  }

  return rawPath.split("/").map((segment) => {
    const decodedSegment = decodeURIComponent(segment);

    return /^\d+$/.test(decodedSegment) ? Number(decodedSegment) : decodedSegment;
  });
}
