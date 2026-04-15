import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

import * as schema from "@/db/schema";

declare global {
  var __rediantPostgresPool: Pool | undefined;
  var __rediantDrizzleDb: NodePgDatabase<typeof schema> | undefined;
}

function getConnectionString() {
  const connectionString = process.env.DATABASE_URL?.trim();

  return connectionString && connectionString.length > 0 ? connectionString : null;
}

function resolveSsl(connectionString: string): PoolConfig["ssl"] {
  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode");

    if (sslMode === "disable") {
      return false;
    }

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return false;
    }
  } catch {
    return undefined;
  }

  return { rejectUnauthorized: false };
}

export function isPostgresConfigured() {
  return Boolean(getConnectionString());
}

export function getPostgresPool() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.__rediantPostgresPool) {
    globalThis.__rediantPostgresPool = new Pool({
      allowExitOnIdle: true,
      connectionString,
      max: 10,
      ssl: resolveSsl(connectionString),
    });
  }

  return globalThis.__rediantPostgresPool;
}

export function getDb() {
  if (!globalThis.__rediantDrizzleDb) {
    globalThis.__rediantDrizzleDb = drizzle(getPostgresPool(), { schema });
  }

  return globalThis.__rediantDrizzleDb;
}
