import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabaseAuthMissingMessage,
  getSupabasePublicAnonKey,
  getSupabasePublicUrl,
  isSupabaseAuthConfigured,
} from "@/lib/supabase/auth-env";

export function createClient() {
  if (!isSupabaseAuthConfigured()) {
    throw new Error(getSupabaseAuthMissingMessage());
  }
  const url = getSupabasePublicUrl()!;
  const anon = getSupabasePublicAnonKey()!;
  return createBrowserClient(url, anon);
}
