"use client";

import { useState } from "react";
import { OperatorBadge } from "@/components/momoparse/badge";
import { Modal } from "@/components/momoparse/modal";
import type { Operator } from "@/lib/mock-data";

type Device = {
  id: string;
  name: string;
  deviceId: string;
  operators: Operator[];
  lastPingMin: number;
};

function statusFromMin(m: number) {
  if (m < 5) return { dot: "bg-[#00C48C]", label: `Last ping: il y a ${m} min` };
  if (m < 60) return { dot: "bg-[#FF6B35]", label: `Last ping: il y a ${m} min` };
  return { dot: "bg-[#FF5C5C]", label: `Last ping: il y a ${m} min` };
}

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
        <button
          type="button"
          onClick={openAdd}
          className="rounded-[8px] bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
        >
          Add device
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {devices.map((d) => {
          const st = statusFromMin(d.lastPingMin);
          return (
            <div
              key={d.id}
              className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-4 transition-colors hover:border-white/[0.12]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white/[0.92]">{d.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.operators.map((op) => (
                      <OperatorBadge key={op} op={op} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`h-2.5 w-2.5 rounded-full ${st.dot}`} />
                </div>
              </div>
              <p className="mt-3 text-xs text-white/45">{st.label}</p>
              <p className="mt-1 font-mono text-[11px] text-white/35">{d.deviceId}</p>
              <button
                type="button"
                onClick={() => setWarnOpen(true)}
                className="mt-4 w-full rounded-[8px] border border-white/[0.08] py-2 text-xs font-mono uppercase tracking-wide text-white/55 transition-colors hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
              >
                Regenerate secret
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        open={addOpen}
        onClose={step === "secret" ? () => {} : closeAdd}
        title={step === "form" ? "Add device" : "Device secret"}
        footer={
          step === "secret" ? (
            <button
              type="button"
              onClick={closeAdd}
              className="w-full rounded-[8px] bg-[#FF6B35] py-2.5 text-sm font-semibold text-black hover:bg-[#E55A2A]"
            >
              Done
            </button>
          ) : null
        }
      >
        {step === "form" && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-white/45">
                Device name
              </label>
              <input
                value={dname}
                onChange={(e) => setDname(e.target.value)}
                placeholder="Caisse principale"
                className="mt-1.5 h-10 w-full rounded-[8px] border border-white/[0.08] bg-mp-bg px-3 text-sm outline-none focus:border-[#FF6B35]/50"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/45">
                Opérateurs assignés
              </p>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={mtn} onChange={(e) => setMtn(e.target.checked)} />
                MTN
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={moov} onChange={(e) => setMoov(e.target.checked)} />
                Moov
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={celtiis} onChange={(e) => setCeltiis(e.target.checked)} />
                Celtiis
              </label>
            </div>
            <button
              type="button"
              disabled={busy || (!mtn && !moov && !celtiis)}
              onClick={createDevice}
              className="flex h-10 w-full items-center justify-center rounded-[8px] bg-[#FF6B35] text-sm font-semibold text-black hover:bg-[#E55A2A] disabled:opacity-50"
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                "Create device"
              )}
            </button>
          </div>
        )}
        {step === "secret" && (
          <div className="space-y-3">
            <p className="text-sm text-white/70">
              This secret will not be shown again. Copy it to configure your Android gateway.
            </p>
            <pre className="overflow-x-auto rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] p-3 font-mono text-xs text-white/80">
              {secret}
            </pre>
          </div>
        )}
      </Modal>

      <Modal
        open={warnOpen}
        onClose={() => setWarnOpen(false)}
        title="Regenerate secret?"
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setWarnOpen(false)}
              className="flex-1 rounded-[8px] border border-white/[0.08] py-2 text-sm text-white/70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setWarnOpen(false)}
              className="flex-1 rounded-[8px] bg-[#FF5C5C] py-2 text-sm font-semibold text-black"
            >
              Confirm
            </button>
          </div>
        }
      >
        <p className="text-sm text-white/60">
          L&apos;ancien secret cessera de fonctionner immédiatement. Vous devrez mettre à jour
          l&apos;application Android.
        </p>
      </Modal>
    </div>
  );
}
