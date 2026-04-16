import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

const iconKeys = new Set([
  "award",
  "badge",
  "bolt",
  "briefcase",
  "building",
  "clipboard",
  "droplets",
  "factory",
  "flask",
  "fuel",
  "graduation",
  "hardhat",
  "layers",
  "package",
  "scroll",
  "search",
  "shield",
  "train",
]);

const stringEnums = {
  changeFrequency: new Set(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]),
  glowPosition: new Set(["left", "right"]),
  icon: iconKeys,
  imageSide: new Set(["left", "right"]),
  kind: new Set(["address", "phone", "email"]),
  layout: new Set(["split", "splitWithFullWidthCapabilities"]),
  pdfState: new Set(["comingSoon", "available", "hidden"]),
  state: new Set(["comingSoon", "available", "hidden"]),
  tone: new Set(["default", "muted"]),
  variant: new Set(["centered", "split"]),
} as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isAllowedString(key: string | undefined, value: string): boolean {
  if (!key) {
    return true;
  }

  const allowedValues = stringEnums[key as keyof typeof stringEnums];
  return allowedValues ? allowedValues.has(value) : true;
}

function mergeCmsValue<T>(defaultValue: T, rawValue: unknown, key?: string): T {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(rawValue)) {
      return structuredClone(defaultValue) as T;
    }

    const sample = defaultValue[0];

    if (sample === undefined) {
      return structuredClone(rawValue) as T;
    }

    if (typeof sample === "string") {
      return rawValue.filter((item): item is string => {
        return typeof item === "string" && isAllowedString(key, item);
      }) as T;
    }

    if (typeof sample === "number") {
      return rawValue.filter((item): item is number => {
        return typeof item === "number" && Number.isFinite(item);
      }) as T;
    }

    if (typeof sample === "boolean") {
      return rawValue.filter((item): item is boolean => typeof item === "boolean") as T;
    }

    if (isPlainObject(sample)) {
      return rawValue
        .filter(isPlainObject)
        .map((item, index) => {
          const indexedDefault = defaultValue[index];
          const objectDefault = isPlainObject(indexedDefault) ? indexedDefault : sample;

          return mergeCmsValue(objectDefault, item);
        }) as T;
    }

    return structuredClone(defaultValue) as T;
  }

  if (typeof defaultValue === "string") {
    if (typeof rawValue !== "string") {
      return defaultValue;
    }

    return (isAllowedString(key, rawValue) ? rawValue : defaultValue) as T;
  }

  if (typeof defaultValue === "number") {
    return (typeof rawValue === "number" && Number.isFinite(rawValue) ? rawValue : defaultValue) as T;
  }

  if (typeof defaultValue === "boolean") {
    return (typeof rawValue === "boolean" ? rawValue : defaultValue) as T;
  }

  if (isPlainObject(defaultValue)) {
    if (!isPlainObject(rawValue)) {
      return structuredClone(defaultValue) as T;
    }

    const mergedEntries = Object.keys(defaultValue).map((fieldName) => {
      const defaultField = defaultValue[fieldName];
      const rawField = rawValue[fieldName];

      return [fieldName, mergeCmsValue(defaultField, rawField, fieldName)];
    });

    return Object.fromEntries(mergedEntries) as T;
  }

  return structuredClone(defaultValue);
}

export function loadCmsDocument<T>(relativeFilePath: string, defaults: T): T {
  const absoluteFilePath = path.join(process.cwd(), "content", relativeFilePath);

  try {
    const rawDocument = readFileSync(absoluteFilePath, "utf8");
    const parsedDocument = JSON.parse(rawDocument) as unknown;

    return mergeCmsValue(defaults, parsedDocument);
  } catch {
    return structuredClone(defaults);
  }
}
