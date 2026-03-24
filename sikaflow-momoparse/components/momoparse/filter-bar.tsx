"use client";

export function FilterBar() {
  const selectClass =
    "h-10 min-w-[120px] rounded-full border border-mp-border bg-mp-surface px-3 text-sm font-semibold text-mp-text outline-none transition-colors focus:border-black/20 focus:ring-2 focus:ring-[#DFFF00]/50";

  return (
    <div className="sf-card-shadow rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-4">
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
            <option value="received">Reçu</option>
            <option value="sent">Envoyé</option>
            <option value="payment">Paiement</option>
          </select>
          <select className={selectClass} aria-label="Statut" defaultValue="">
            <option value="">Statut</option>
            <option value="success">OK</option>
            <option value="failed">Échec</option>
            <option value="pending">En cours</option>
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
            placeholder="Référence, numéro…"
            className="h-10 w-full flex-1 rounded-full border border-mp-border bg-mp-bg px-4 text-sm font-medium text-mp-text placeholder:text-mp-muted/70 outline-none focus:border-black/20 focus:ring-2 focus:ring-[#DFFF00]/50"
          />
          <button
            type="button"
            className="h-10 shrink-0 rounded-full border border-mp-border bg-mp-bg px-4 text-xs font-bold uppercase tracking-wide text-mp-muted transition-colors hover:border-mp-text hover:text-mp-text"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
