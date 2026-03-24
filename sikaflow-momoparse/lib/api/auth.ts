import { timingSafeEqual } from "node:crypto";

/**
 * Clés acceptées : variable d’environnement `SIKAFLOW_API_KEYS` (séparées par des virgules)
 * ou une seule `SIKAFLOW_API_KEY`.
 * Les clés créées dans le tableau de bord sont validées en base (hash) — voir `authorizeApiRequest`.
 */
export function getValidApiKeys(): string[] {
  const raw =
    process.env.SIKAFLOW_API_KEYS ?? process.env.SIKAFLOW_API_KEY ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
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
