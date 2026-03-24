import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  getSupabaseAuthMissingMessage,
  getSupabasePublicAnonKey,
  getSupabasePublicUrl,
  isSupabaseAuthConfigured,
} from "@/lib/supabase/auth-env";

export async function createClient() {
  if (!isSupabaseAuthConfigured()) {
    throw new Error(getSupabaseAuthMissingMessage());
  }

  const cookieStore = await cookies();

  return createServerClient(
    getSupabasePublicUrl()!,
    getSupabasePublicAnonKey()!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
