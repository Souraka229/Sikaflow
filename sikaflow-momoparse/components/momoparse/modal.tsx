"use client";

import { useEffect, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Fermer"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mp-modal-title"
        className="relative z-10 w-full max-w-md rounded-[8px] border border-white/[0.08] bg-[#141414] shadow-none"
      >
        <div className="border-b border-white/[0.08] px-4 py-3">
          <h2 id="mp-modal-title" className="font-mono text-sm font-semibold text-white/[0.92]">
            {title}
          </h2>
        </div>
        <div className="px-4 py-4">{children}</div>
        {footer && <div className="border-t border-white/[0.08] px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
}
