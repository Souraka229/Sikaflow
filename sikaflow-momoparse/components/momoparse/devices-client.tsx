"use client";

import { useState } from "react";
import { OperatorBadge } from "@/components/momoparse/badge";
import { Modal } from "@/components/momoparse/modal";

type Operator = "mtn" | "moov" | "celtiis";

interface Device {
  id: string;
  name: string;
  deviceId: string;
  operators: Operator[];
  lastPingMin: number;
  isActive?: boolean;
}

function statusFromMin(m: number) {
  if (m < 5) return { dot: "bg-emerald-500", label: `Dernier ping : il y a ${m} min` };
  if (m < 60) return { dot: "bg-amber-500", label: `Dernier ping : il y a ${m} min` };
  return { dot: "bg-red-500", label: `Dernier ping : il y a ${m} min` };
}

const btnLime =
  "rounded-full bg-[#DFFF00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]";

export function DevicesClient({ initialDevices }: { initialDevices: Device[] }) {
  const [devices, setDevices] = useState(initialDevices);
  const [addOpen, setAddOpen] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const [step, setStep] = useState<"form" | "secret">("form");
  const [dname, setDname] = useState("");
  const [mtn, setMtn] = useState(true);
  const [moov, setMoov] = useState(false);
  const [celtiis, setCeltiis] = useState(false);
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);

  function openAdd() {
    setStep("form");
    setDname("");
    setMtn(true);
    setMoov(false);
    setCeltiis(false);
    setSecret("");
    setAddOpen(true);
  }

  function closeAdd() {
    setAddOpen(false);
    setStep("form");
    setSecret("");
  }

  function createDevice() {
    const ops: Operator[] = [];
    if (mtn) ops.push("mtn");
    if (moov) ops.push("moov");
    if (celtiis) ops.push("celtiis");
    if (ops.length === 0) return;
    setBusy(true);
    window.setTimeout(() => {
      const id = "dev_" + Math.random().toString(36).slice(2, 10);
      const sec = "gwsec_" + Math.random().toString(36).slice(2, 22);
      setSecret(sec);
      setDevices((d) => [
        {
          id: String(Date.now()),
          name: dname || "Nouveau device",
          deviceId: id,
          operators: ops,
          lastPingMin: 0,
        },
        ...d,
      ]);
      setStep("secret");
      setBusy(false);
    }, 500);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button type="button" onClick={openAdd} className={btnLime}>
          Ajouter un appareil
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {devices.map((d) => {
          const st = statusFromMin(d.lastPingMin);
          return (
            <div
              key={d.id}
              className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 transition-shadow sf-card-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-mp-text">{d.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.operators.map((op) => (
                      <OperatorBadge key={op} op={op} />
                    ))}
                  </div>
                </div>
                <span className={`h-3 w-3 shrink-0 rounded-full ${st.dot}`} />
              </div>
              <p className="mt-3 text-xs font-medium text-mp-muted">{st.label}</p>
              <p className="mt-1 font-mono text-[11px] text-mp-muted">{d.deviceId}</p>
              <button
                type="button"
                onClick={() => setWarnOpen(true)}
                className="mt-4 w-full rounded-full border border-mp-border py-2.5 text-xs font-bold uppercase tracking-wide text-mp-muted transition-colors hover:border-black hover:text-mp-text"
              >
                Régénérer le secret
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        open={addOpen}
        onClose={step === "secret" ? () => {} : closeAdd}
        title={step === "form" ? "Nouvel appareil" : "Secret appareil"}
        footer={
          step === "secret" ? (
            <button type="button" onClick={closeAdd} className={`w-full ${btnLime}`}>
              Terminé
            </button>
          ) : null
        }
      >
        {step === "form" && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-mp-muted">
                Nom de l&apos;appareil
              </label>
              <input
                value={dname}
                onChange={(e) => setDname(e.target.value)}
                placeholder="Caisse principale"
                className="mt-1.5 h-11 w-full rounded-full border border-mp-border bg-mp-bg px-4 text-sm outline-none focus:ring-2 focus:ring-[#DFFF00]/50"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">
                Opérateurs
              </p>
              <label className="flex items-center gap-2 text-sm font-medium text-mp-text">
                <input type="checkbox" checked={mtn} onChange={(e) => setMtn(e.target.checked)} />
                MTN
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-mp-text">
                <input type="checkbox" checked={moov} onChange={(e) => setMoov(e.target.checked)} />
                Moov
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-mp-text">
                <input type="checkbox" checked={celtiis} onChange={(e) => setCeltiis(e.target.checked)} />
                Celtiis
              </label>
            </div>
            <button
              type="button"
              disabled={busy || (!mtn && !moov && !celtiis)}
              onClick={createDevice}
              className={`flex h-11 w-full items-center justify-center ${btnLime} disabled:opacity-50`}
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                "Créer"
              )}
            </button>
          </div>
        )}
        {step === "secret" && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-mp-muted">
              Ce secret ne sera plus affiché. Copiez-le pour configurer la passerelle Android.
            </p>
            <pre className="overflow-x-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-3 font-mono text-xs text-mp-text">
              {secret}
            </pre>
          </div>
        )}
      </Modal>

      <Modal
        open={warnOpen}
        onClose={() => setWarnOpen(false)}
        title="Régénérer le secret ?"
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setWarnOpen(false)}
              className="flex-1 rounded-full border border-mp-border py-2.5 text-sm font-semibold text-mp-text"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => setWarnOpen(false)}
              className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-bold text-white"
            >
              Confirmer
            </button>
          </div>
        }
      >
        <p className="text-sm text-mp-muted">
          L&apos;ancien secret cessera de fonctionner immédiatement. Mettez à jour l&apos;application
          Android.
        </p>
      </Modal>
    </div>
  );
}
