import { getApiEnvTenantScope } from "@/lib/env/server";

/** Tenant effectif pour les lectures API (clé dashboard = user_id ; clé env = scope optionnel). */
export function resolveQueryTenantId(authTenantId?: string): string | undefined {
  return authTenantId ?? getApiEnvTenantScope();
}
