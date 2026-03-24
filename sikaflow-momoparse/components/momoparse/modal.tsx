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
        className="absolute inset-0 bg-black/45"
        aria-label="Fermer"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mp-modal-title"
        className="sf-card-shadow-lg relative z-10 w-full max-w-md overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface"
      >
        <div className="border-b border-mp-border px-4 py-3">
          <h2 id="mp-modal-title" className="text-sm font-bold text-mp-text">
            {title}
          </h2>
        </div>
        <div className="px-4 py-4">{children}</div>
        {footer && <div className="border-t border-mp-border px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
}
