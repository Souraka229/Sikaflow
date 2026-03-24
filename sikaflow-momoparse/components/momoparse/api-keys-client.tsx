"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/momoparse/modal";

interface KeyRow {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  lastUsed: string | null;
  active: boolean;
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

const btnLime =
  "rounded-full bg-[#DFFF00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]";

export function ApiKeysClient({ initialKeys }: { initialKeys: KeyRow[] }) {
  const router = useRouter();
  const [keys, setKeys] = useState(initialKeys);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<"form" | "reveal">("form");
  const [name, setName] = useState("");
  const [readTx, setReadTx] = useState(true);
  const [writeTx, setWriteTx] = useState(false);
  const [generated, setGenerated] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setKeys(initialKeys);
  }, [initialKeys]);

  function openNew() {
    setStep("form");
    setName("");
    setReadTx(true);
    setWriteTx(false);
    setGenerated("");
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setStep("form");
    setGenerated("");
    setFormError("");
  }

  async function generate() {
    setBusy(true);
    setFormError("");
    const scopes: string[] = [];
    if (readTx) scopes.push("read:transactions");
    if (writeTx) scopes.push("write:transactions");
    try {
      const res = await fetch("/api/dashboard/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          scopes,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; secret?: string };
      if (!res.ok) {
        setFormError(data.error || "Création impossible");
        return;
      }
      if (data.secret) {
        setGenerated(data.secret);
        setStep("reveal");
      }
    } catch {
      setFormError("Réseau ou serveur indisponible");
    } finally {
      setBusy(false);
    }
  }

  function confirmCopied() {
    closeModal();
    router.refresh();
  }

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(generated);
    } catch {
      /* ignore */
    }
  }

  async function revoke(id: string) {
    const res = await fetch(`/api/dashboard/api-keys?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <>
      {keys.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[var(--radius-mp-inner)] border border-dashed border-mp-border bg-mp-surface px-6 py-16 text-center sf-card-shadow">
          <p className="text-sm font-medium text-mp-muted">Aucune clé API</p>
          <p className="mt-2 max-w-sm text-xs text-mp-muted/80">
            La clé est enregistrée dans Supabase (hash). Utilisez-la comme en-tête{" "}
            <span className="font-mono">X-Api-Key</span> sur l’API publique.
          </p>
          <button type="button" onClick={openNew} className={`mt-4 ${btnLime}`}>
            Créer votre première clé
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button type="button" onClick={openNew} className={btnLime}>
              Nouvelle clé API
            </button>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-mp-border text-[10px] font-bold uppercase tracking-wider text-mp-muted">
                    <th className="px-4 py-3 font-bold">Nom</th>
                    <th className="px-4 py-3 font-bold">Préfixe</th>
                    <th className="px-4 py-3 font-bold">Scopes</th>
                    <th className="px-4 py-3 font-bold">Dernière utilisation</th>
                    <th className="px-4 py-3 font-bold">Statut</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((k) => (
                    <tr
                      key={k.id}
                      className="border-b border-mp-border transition-colors hover:bg-mp-bg"
                    >
                      <td className="px-4 py-3 font-bold text-mp-text">{k.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-mp-muted">{k.prefix}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-mp-muted">
                        {k.scopes.join(", ")}
                      </td>
                      <td className="px-4 py-3 text-xs text-mp-muted">{k.lastUsed}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            k.active
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                              : "border-mp-border bg-mp-bg text-mp-muted"
                          }`}
                        >
                          {k.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-mp-muted transition-colors hover:text-red-600"
                          aria-label="Révoquer"
                          onClick={() => void revoke(k.id)}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={step === "reveal" ? () => {} : closeModal}
        title={step === "form" ? "Nouvelle clé API" : "Votre clé API"}
        footer={
          step === "reveal" ? (
            <button type="button" onClick={confirmCopied} className={`w-full ${btnLime}`}>
              J&apos;ai copié cette clé
            </button>
          ) : null
        }
      >
        {step === "form" && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-mp-muted">
                Nom de la clé
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Production — caisse 1"
                className="mt-1.5 h-11 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#DFFF00]/60"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">Scopes</p>
              <label className="flex items-center gap-2 text-sm font-medium text-mp-text">
                <input type="checkbox" checked={readTx} onChange={(e) => setReadTx(e.target.checked)} />
                read:transactions
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-mp-text">
                <input type="checkbox" checked={writeTx} onChange={(e) => setWriteTx(e.target.checked)} />
                write:transactions
              </label>
            </div>
            {formError ? (
              <p className="text-sm font-medium text-red-600" role="alert">
                {formError}
              </p>
            ) : null}
            <button
              type="button"
              disabled={busy || (!readTx && !writeTx)}
              onClick={() => void generate()}
              className={`flex h-11 w-full items-center justify-center ${btnLime} disabled:opacity-50`}
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                "Générer la clé"
              )}
            </button>
          </div>
        )}
        {step === "reveal" && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-mp-text">
              Cette clé ne sera plus affichée. Copiez-la maintenant.
            </p>
            <pre className="overflow-x-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-3 font-mono text-xs text-mp-text">
              {generated}
            </pre>
            <button
              type="button"
              onClick={() => void copyKey()}
              className="w-full rounded-full border border-mp-border py-2.5 text-sm font-bold text-mp-text transition-colors hover:border-black hover:bg-[#DFFF00]/20"
            >
              Copier
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
