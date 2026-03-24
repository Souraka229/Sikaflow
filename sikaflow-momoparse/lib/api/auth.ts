import { timingSafeEqual } from "node:crypto";

/**
 * Clés acceptées : variable d’environnement `SIKAFLOW_API_KEYS` (séparées par des virgules)
 * ou une seule `SIKAFLOW_API_KEY`.
 * En développement uniquement, si aucune clé n’est définie : `mklive_dev_sikaflow_local`.
 */
export function getValidApiKeys(): string[] {
  const raw =
    process.env.SIKAFLOW_API_KEYS ?? process.env.SIKAFLOW_API_KEY ?? "";
  const keys = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (keys.length === 0 && process.env.NODE_ENV === "development") {
    return ["mklive_dev_sikaflow_local"];
  }
  return keys;
}

export function validateApiKey(provided: string | null | undefined): boolean {
  if (!provided || typeof provided !== "string") return false;
  const trimmed = provided.trim();
  const buf = Buffer.from(trimmed, "utf8");
  for (const key of getValidApiKeys()) {
    const kb = Buffer.from(key, "utf8");
    if (buf.length !== kb.length) continue;
    try {
      if (timingSafeEqual(buf, kb)) return true;
    } catch {
      /* length mismatch guard */
    }
  }
  return false;
}

export function getApiKeyFromRequest(request: Request): string | null {
  return request.headers.get("x-api-key") ?? request.headers.get("X-Api-Key");
}
