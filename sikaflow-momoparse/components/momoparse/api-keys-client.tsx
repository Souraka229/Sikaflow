"use client";

import { useState } from "react";
import { Modal } from "@/components/momoparse/modal";

type KeyRow = {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  lastUsed: string;
  active: boolean;
};

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function ApiKeysClient({ initialKeys }: { initialKeys: KeyRow[] }) {
  const [keys, setKeys] = useState(initialKeys);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<"form" | "reveal">("form");
  const [name, setName] = useState("");
  const [readTx, setReadTx] = useState(true);
  const [writeTx, setWriteTx] = useState(false);
  const [generated, setGenerated] = useState("");
  const [busy, setBusy] = useState(false);

  function openNew() {
    setStep("form");
    setName("");
    setReadTx(true);
    setWriteTx(false);
    setGenerated("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setStep("form");
    setGenerated("");
  }

  function generate() {
    setBusy(true);
    window.setTimeout(() => {
      setGenerated("mklive_" + Math.random().toString(36).slice(2, 18) + "demo");
      setStep("reveal");
      setBusy(false);
    }, 600);
  }

  function confirmCopied() {
    if (generated) {
      const scopes: string[] = [];
      if (readTx) scopes.push("read:transactions");
      if (writeTx) scopes.push("write:transactions");
      setKeys((k) => [
        {
          id: String(Date.now()),
          name: name || "Sans nom",
          prefix: generated.slice(0, 12) + "…",
          scopes,
          lastUsed: "—",
          active: true,
        },
        ...k,
      ]);
    }
    closeModal();
  }

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(generated);
    } catch {
      /* ignore */
    }
  }

  if (keys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[8px] border border-dashed border-white/[0.12] bg-mp-surface px-6 py-16 text-center">
        <p className="text-sm text-white/55">Aucune clé API</p>
        <button
          type="button"
          onClick={openNew}
          className="mt-4 rounded-[8px] bg-[#FF6B35] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
        >
          Create your first API key
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openNew}
          className="rounded-[8px] bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
        >
          New API key
        </button>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-white/[0.08] bg-mp-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-white/45">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Prefix</th>
                <th className="px-4 py-2 font-medium">Scopes</th>
                <th className="px-4 py-2 font-medium">Last used</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr
                  key={k.id}
                  className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-2.5 font-medium text-white/[0.92]">{k.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-white/55">{k.prefix}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-white/45">
                    {k.scopes.join(", ")}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-white/55">{k.lastUsed}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-[6px] border px-2 py-0.5 text-[10px] font-mono uppercase ${
                        k.active
                          ? "border-[#00C48C]/35 bg-[#00C48C]/15 text-[#00C48C]"
                          : "border-white/15 bg-white/5 text-white/45"
                      }`}
                    >
                      {k.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      className="text-white/45 transition-colors hover:text-[#FF5C5C]"
                      aria-label="Révoquer"
                      onClick={() => setKeys((prev) => prev.filter((x) => x.id !== k.id))}
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

      <Modal
        open={modalOpen}
        onClose={step === "reveal" ? () => {} : closeModal}
        title={step === "form" ? "New API key" : "Your API key"}
        footer={
          step === "reveal" ? (
            <button
              type="button"
              onClick={confirmCopied}
              className="w-full rounded-[8px] bg-[#FF6B35] py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
            >
              I&apos;ve copied this key
            </button>
          ) : null
        }
      >
        {step === "form" && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/45">
                Key name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Restafy Production"
                className="mt-1.5 h-10 w-full rounded-[8px] border border-white/[0.08] bg-mp-bg px-3 text-sm outline-none focus:border-[#FF6B35]/50"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/45">Scopes</p>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={readTx} onChange={(e) => setReadTx(e.target.checked)} />
                read:transactions
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={writeTx} onChange={(e) => setWriteTx(e.target.checked)} />
                write:transactions
              </label>
            </div>
            <button
              type="button"
              disabled={busy || (!readTx && !writeTx)}
              onClick={generate}
              className="flex h-10 w-full items-center justify-center rounded-[8px] bg-[#FF6B35] text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A] disabled:opacity-50"
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                "Generate key"
              )}
            </button>
          </div>
        )}
        {step === "reveal" && (
          <div className="space-y-3">
            <p className="text-sm text-[#FF6B35]">
              Cette clé ne sera plus affichée. Copiez-la maintenant.
            </p>
            <div className="flex gap-2">
              <pre className="flex-1 overflow-x-auto rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] p-3 font-mono text-xs text-white/80">
                {generated}
              </pre>
            </div>
            <button
              type="button"
              onClick={copyKey}
              className="w-full rounded-[8px] border border-white/[0.08] py-2 text-sm text-white/80 transition-colors hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
            >
              Copy
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
