"use client";

export function FilterBar() {
  const selectClass =
    "h-9 min-w-[120px] rounded-[8px] border border-white/[0.08] bg-mp-surface px-2 text-sm text-white/[0.92] outline-none transition-colors focus:border-[#FF6B35]/50";

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-2">
        <select className={selectClass} aria-label="Opérateur" defaultValue="">
          <option value="">Opérateur</option>
          <option value="mtn">MTN</option>
          <option value="moov">Moov</option>
          <option value="celtiis">Celtiis</option>
        </select>
        <select className={selectClass} aria-label="Type" defaultValue="">
          <option value="">Type</option>
          <option value="received">Received</option>
          <option value="sent">Sent</option>
          <option value="payment">Payment</option>
        </select>
        <select className={selectClass} aria-label="Statut" defaultValue="">
          <option value="">Statut</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
        <select className={selectClass} aria-label="Période" defaultValue="today">
          <option value="today">Aujourd&apos;hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Rechercher par référence, numéro..."
          className="h-9 w-full flex-1 rounded-[8px] border border-white/[0.08] bg-mp-surface px-3 text-sm text-white/[0.92] placeholder:text-white/30 outline-none focus:border-[#FF6B35]/50"
        />
        <button
          type="button"
          className="h-9 shrink-0 rounded-[8px] border border-white/[0.08] px-3 text-xs font-mono uppercase tracking-wide text-white/55 transition-colors hover:border-white/[0.15] hover:text-white/80"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
