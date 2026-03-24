import { createHash } from "node:crypto";

export function hashApiKeySecret(plain: string): string {
  return createHash("sha256").update(plain, "utf8").digest("hex");
}
