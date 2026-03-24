import Link from "next/link";

const features = [
  {
    title: "Ingestion sécurisée",
    body: "Webhook Bearer depuis votre passerelle Android — horodatage, multi-SIM, suivi des appareils.",
  },
  {
    title: "Parsing multi-opérateurs",
    body: "MTN MoMo, Moov Money, Celtiis : réception, envoi, paiement marchand, retraits.",
  },
  {
    title: "Déduplication",
    body: "Hash SHA-256 du message + tenant : idempotence, zéro doublon.",
  },
  {
    title: "API publique",
    body: "X-Api-Key, rate limiting, pagination curseur, filtres opérateur / type / dates.",
  },
  {
    title: "Analytics en direct",
    body: "Volume 24h, taux de parse, statut gateway, flux live — interface type fintech claire.",
  },
  {
    title: "Tags & intégrations",
    body: "POST /transactions/:id/tag pour lier order_id et métadonnées — webhooks en Pro.",
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    detail: "Pour tester l’intégration",
    items: ["500 transactions / mois", "1 device", "100 req API / h"],
    cta: "Commencer",
    highlight: false,
  },
  {
    name: "Pro",
    price: "Sur devis",
    detail: "Équipes et volume réel",
    items: ["10 000 transactions / mois", "5 devices", "Support 48h", "Webhooks sortants"],
    cta: "Contacter",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    detail: "Banques, agrégateurs, scale",
    items: ["Volume illimité", "SLA", "White-label", "Support prioritaire"],
    cta: "Parler à l’équipe",
    highlight: false,
  },
];

const card = "rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 sf-card-shadow transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]";
const btnLime =
  "inline-flex h-12 items-center justify-center rounded-full bg-[#DFFF00] px-8 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]";
const btnOutline =
  "inline-flex h-12 items-center justify-center rounded-full border border-mp-border bg-mp-surface px-8 text-sm font-bold text-mp-text transition-colors hover:border-black/20";

export function HomeSections() {
  return (
    <>
      <section className="border-b border-mp-border px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mp-muted">
            Afrique de l&apos;Ouest · Mobile Money
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-mp-text md:text-5xl">
            Vos paiements SMS,{" "}
            <span className="rounded-lg bg-[#DFFF00] px-2 text-black">lisibles en un coup d’œil</span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-mp-muted md:text-lg">
            <strong className="text-mp-text">Sika FLOW</strong> transforme les SMS MTN, Moov et Celtiis en
            données structurées — même esprit que votre maquette : fond clair, noir, accent citron.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/login" className={btnLime}>
              Accéder à l’app
            </Link>
            <Link href="/dashboard/docs" className={btnOutline}>
              Documentation
            </Link>
          </div>
          <div className="mt-14 grid gap-3 rounded-[var(--radius-mp)] border border-mp-border bg-mp-surface p-4 sm:grid-cols-3 md:mt-20 md:p-6 sf-card-shadow-lg">
            {[
              { k: "Opérateurs", v: "MTN · Moov · Celtiis" },
              { k: "Auth API", v: "X-Api-Key + rate limit" },
              { k: "Stack", v: "Next.js · API REST · persistance optionnelle" },
            ].map((row) => (
              <div
                key={row.k}
                className="border-b border-mp-border pb-3 sm:border-b-0 sm:pb-0 sm:pr-4 md:border-r md:last:border-r-0 md:last:pr-0"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">{row.k}</p>
                <p className="mt-1 text-sm font-bold text-mp-text">{row.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-mp-text md:text-3xl">Une plateforme complète</h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-mp-muted md:text-base">
            Ingestion, parsing, API et dashboard — stack Next.js sur Vercel, prête pour la prod.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className={card}>
                <h3 className="font-bold text-mp-text">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mp-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="operateurs" className="scroll-mt-20 border-y border-mp-border bg-mp-bg px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-mp-text md:text-3xl">Opérateurs pris en charge</h2>
          <p className="mt-2 max-w-2xl text-sm font-medium text-mp-muted">
            Détection par shortcode et contenu — montants et numéros normalisés.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { name: "MTN MoMo", lines: ["Réception / envoi", "Paiement marchand", "Retrait"] },
              { name: "Moov Money", lines: ["Réception / envoi", "Paiement marchand"] },
              { name: "Celtiis", lines: ["Crédit reçu", "Débit paiement"] },
            ].map((op) => (
              <div
                key={op.name}
                className={`${card} border-t-[3px] border-t-[#DFFF00] bg-mp-surface`}
              >
                <h3 className="font-bold text-mp-text">{op.name}</h3>
                <ul className="mt-3 space-y-1.5 text-xs font-semibold text-mp-muted">
                  {op.lines.map((l) => (
                    <li key={l}>— {l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="api" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold text-mp-text md:text-3xl">API REST v1</h2>
            <p className="mt-2 text-sm font-medium text-mp-muted md:text-base">
              En-tête <code className="rounded bg-[#DFFF00]/40 px-1 font-mono text-sm font-bold text-black">X-Api-Key</code>
              , réponses <span className="font-mono text-sm text-mp-text">{"{ success, data, meta }"}</span>.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs font-semibold text-mp-text">
              <li>GET /api/v1/transactions</li>
              <li>GET /api/v1/transactions/:id</li>
              <li>GET /api/v1/stats</li>
              <li>POST /api/v1/transactions/:id/tag</li>
            </ul>
            <Link href="/dashboard/docs" className={`mt-8 ${btnOutline} !h-10 !px-4`}>
              Playground →
            </Link>
          </div>
          <pre className="mt-10 overflow-x-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-4 font-mono text-[11px] leading-relaxed text-mp-text sf-card-shadow lg:mt-0">
            {`const res = await fetch(
  "https://app.sikaflow.com/api/v1/transactions?type=received",
  { headers: { "X-Api-Key": process.env.SIKAFLOW_KEY! } }
);
const { data, meta } = await res.json();`}
          </pre>
        </div>
      </section>

      <section id="tarifs" className="scroll-mt-20 border-t border-mp-border px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-mp-text md:text-3xl">Tarifs</h2>
          <p className="mt-2 text-sm font-medium text-mp-muted">Évoluez quand le volume augmente.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-[var(--radius-mp-inner)] border p-6 sf-card-shadow ${
                  p.highlight
                    ? "border-[#DFFF00] bg-[#DFFF00]/15"
                    : "border-mp-border bg-mp-surface"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-mp-muted">{p.name}</p>
                <p className="mt-2 text-2xl font-bold text-mp-text">{p.price}</p>
                <p className="mt-1 text-sm text-mp-muted">{p.detail}</p>
                <ul className="mt-6 space-y-2 text-sm font-medium text-mp-text">
                  {p.items.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 flex h-11 w-full items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    p.highlight
                      ? "bg-[#DFFF00] text-black hover:bg-[#c8e600]"
                      : "border border-mp-border text-mp-text hover:border-black/30"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-mp-border px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-mp-text md:text-3xl">Questions fréquentes</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm font-medium text-mp-muted">
            Intégration expert, sans passer par le dashboard si vous préférez l’API seule.
          </p>
          <ul className="mt-10 space-y-3">
            {[
              {
                q: "Puis-je utiliser Sika FLOW uniquement via l’API ?",
                a: "Oui. Vos applications appellent les endpoints /api/v1/* avec l’en-tête X-Api-Key. Le tableau de bord est optionnel pour le suivi humain.",
              },
              {
                q: "Quelles variables sont nécessaires en production ?",
                a: "Au minimum SIKAFLOW_API_KEYS sur votre hébergeur (ex. Vercel). Pour des données durables entre redémarrages, ajoutez Supabase (URL + clé service role) et exécutez la migration SQL fournie.",
              },
              {
                q: "Les SMS sont-ils stockés en clair ?",
                a: "Le modèle actuel conserve le texte parsé pour la démo et l’audit. En production, adaptez la rétention et le chiffrement selon votre politique de conformité.",
              },
              {
                q: "Comment tester l’API en local ?",
                a: "Sans clés définies, une clé de développement est acceptée (voir .env.example). Utilisez /dashboard/docs pour le playground ou curl avec X-Api-Key.",
              },
            ].map((item) => (
              <li
                key={item.q}
                className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 text-left sf-card-shadow"
              >
                <p className="font-bold text-mp-text">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-mp-muted">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-mp-border px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-mp)] border border-mp-border bg-[#DFFF00]/25 px-6 py-12 text-center sf-card-shadow">
          <h2 className="text-xl font-bold text-mp-text md:text-2xl">Prêt à piloter vos encaissements ?</h2>
          <p className="mt-3 text-sm font-medium text-mp-muted">
            Dashboard, clés API, appareils — même design clair partout.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className={btnLime}>
              Tableau de bord
            </Link>
            <Link href="/login" className={btnOutline}>
              Connexion
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
