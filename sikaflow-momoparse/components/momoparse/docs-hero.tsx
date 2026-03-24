export function DocsHero() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[var(--radius-mp)] border border-mp-border bg-mp-surface p-6 md:p-10 sf-card-shadow-lg">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-mp-muted">
            Developer API · West Africa
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-mp-text md:text-4xl">
            L’API que vos équipes ouvrent{" "}
            <span className="bg-[#DFFF00] px-1.5 text-black">avant Postman</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-mp-muted">
            Documentation interactive, exemples copiables, playground connecté à votre instance — les
            mêmes standards qu’un portail &quot;Silicon Valley&quot;, pensés pour les builders
            fintech en Afrique de l&apos;Ouest : clarté, latence faible, schémas prévisibles.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Time-to-first-call",
                d: "Une clé, un header, une requête — pas de friction.",
              },
              { t: "Schémas stables", d: "{ success, data, meta } — erreurs sans stack trace." },
              { t: "Mobile & PWA", d: "Installez Sika FLOW sur l’écran d’accueil comme une app." },
            ].map((x) => (
              <li
                key={x.t}
                className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-4"
              >
                <p className="text-sm font-bold text-mp-text">{x.t}</p>
                <p className="mt-1 text-xs font-medium text-mp-muted">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[var(--radius-mp-inner)] border border-dashed border-mp-border bg-[#DFFF00]/10 p-5 md:p-6">
        <h2 className="text-sm font-bold text-mp-text">Bonnes pratiques (résumé)</h2>
        <ul className="mt-3 grid gap-2 text-sm font-medium text-mp-muted md:grid-cols-2">
          <li>• Authentification explicite (ici : en-tête unique X-Api-Key).</li>
          <li>• Exemples &quot;Try it&quot; sur la vraie API — moins d’écart doc / prod.</li>
          <li>• Pagination curseur + limit bornée (1–500) pour des réponses fiables.</li>
          <li>• Codes HTTP explicites : 401 auth, 429 rate limit, 400 validation.</li>
          <li>• Copier le bloc pour l’IA : collez dans ChatGPT / Claude pour générer du client code.</li>
          <li>• Versionnez vos intégrations sur /api/v1 — évolution sans casser les clients.</li>
        </ul>
        <p className="mt-4 text-xs font-semibold text-mp-text">
          PWA : sur Chrome / Edge / Android, menu « Installer l&apos;application » ; sur iOS Safari,
          « Partager » → « Sur l&apos;écran d&apos;accueil » — idéal pour suivre vos analytics comme une
          app native.
        </p>
      </div>
    </div>
  );
}
