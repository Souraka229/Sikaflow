"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type SupabaseBrowserState = {
  /** Premier fetch terminé */
  ready: boolean;
  /** URL + clé publique disponibles (serveur) */
  configured: boolean;
  client: SupabaseClient | null;
};

const defaultState: SupabaseBrowserState = {
  ready: false,
  configured: false,
  client: null,
};

const SupabaseBrowserContext = createContext<SupabaseBrowserState>(defaultState);

export function SupabaseBrowserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SupabaseBrowserState>(defaultState);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/config/supabase-public", { cache: "no-store" });
        const data = (await res.json()) as {
          ok: boolean;
          url?: string;
          anonKey?: string;
        };
        if (cancelled) return;
        if (data.ok && data.url && data.anonKey) {
          const client = createBrowserClient(data.url, data.anonKey);
          setState({ ready: true, configured: true, client });
        } else {
          setState({ ready: true, configured: false, client: null });
        }
      } catch {
        if (!cancelled) {
          setState({ ready: true, configured: false, client: null });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SupabaseBrowserContext.Provider value={state}>
      {children}
    </SupabaseBrowserContext.Provider>
  );
}

export function useSupabaseBrowser(): SupabaseBrowserState {
  return useContext(SupabaseBrowserContext);
}
