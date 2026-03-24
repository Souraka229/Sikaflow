"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabaseBrowser } from "@/components/supabase/supabase-browser-provider";
import { getAuthCallbackAbsoluteUrl } from "@/lib/app-url";
import { USER_MSG_SIGNUP_UNAVAILABLE } from "@/lib/supabase/auth-env";

export function SignUpForm() {
  const router = useRouter();
  const { ready, configured, client } = useSupabaseBrowser();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);

    if (!ready) {
      setPending(false);
      return;
    }

    if (!configured || !client) {
      if (process.env.NODE_ENV === "development") {
        setError(
          "En développement : ajoutez l’URL et la clé publique Supabase dans .env.local (voir .env.example), puis redémarrez.",
        );
      } else {
        setError(USER_MSG_SIGNUP_UNAVAILABLE);
      }
      setPending(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        setPending(false);
        return;
      }

      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
        setPending(false);
        return;
      }

      const redirectTo = getAuthCallbackAbsoluteUrl();
      if (!redirectTo) {
        setError("Impossible de déterminer l’adresse de l’application pour la confirmation par e-mail.");
        setPending(false);
        return;
      }

      const { error: authError } = await client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: formData.get("fullName") || "",
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setPending(false);
        return;
      }

      router.push("/auth/sign-up-success");
    } catch {
      setError("Une erreur est survenue lors de l'inscription");
      setPending(false);
    }
  }

  return (
    <>
      {error && (
        <div className="rounded-[var(--radius-mp-inner)] border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <label
            htmlFor="signup-fullname"
            className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-mp-muted"
          >
            Nom complet
          </label>
          <input
            id="signup-fullname"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jean Dupont"
            className="h-12 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium text-mp-text placeholder:text-mp-muted/60 outline-none focus:ring-2 focus:ring-[#DFFF00]/60"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-mp-muted"
          >
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@entreprise.com"
            className="h-12 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium text-mp-text placeholder:text-mp-muted/60 outline-none focus:ring-2 focus:ring-[#DFFF00]/60"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="signup-password"
            className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-mp-muted"
          >
            Mot de passe
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="••••••••"
            className="h-12 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium text-mp-text outline-none focus:ring-2 focus:ring-[#DFFF00]/60"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="signup-confirm"
            className="ml-1 block text-[10px] font-bold uppercase tracking-widest text-mp-muted"
          >
            Confirmer le mot de passe
          </label>
          <input
            id="signup-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="••••••••"
            className="h-12 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium text-mp-text outline-none focus:ring-2 focus:ring-[#DFFF00]/60"
          />
        </div>
        <button
          type="submit"
          disabled={pending || !ready}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#DFFF00] px-6 text-sm font-bold text-black transition-colors hover:bg-[#c8e600] disabled:opacity-70"
        >
          {!ready ? "Chargement…" : pending ? "Création en cours…" : "Créer un compte"}
        </button>
      </form>
    </>
  );
}
