import Link from "next/link";

const features = [
  {
    title: "Ingestion sécurisée",
    body: "Webhook Bearer depuis votre passerelle Android vers /api/ingest/sms — horodatage, multi-SIM, suivi des devices.",
  },
  {
    title: "Parsing multi-opérateurs",
    body: "MTN MoMo, Moov Money, Celtiis : réception, envoi, paiement marchand, retraits — patterns maintenus et tolérants.",
  },
  {
    title: "Déduplication",
    body: "Hash SHA-256 du message + tenant : idempotence et zéro doublon en base.",
  },
  {
    title: "API publique",
    body: "X-Api-Key, rate limiting (Upstash), pagination curseur, filtres opérateur / type / dates / référence.",
  },
  {
    title: "Dashboard temps réel",
    body: "Volume 24h, taux de parse, statut gateway, flux live Supabase Realtime, tableaux type terminal.",
  },
  {
    title: "Tags & intégrations",
    body: "POST /transactions/:id/tag pour lier order_id, métadonnées Restafy — webhooks sortants en Pro.",
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
    items: [
      "10 000 transactions / mois",
      "5 devices",
      "Support 48h",
      "Webhooks sortants",
    ],
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

export function HomeSections() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/[0.08] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B35]">
            West Africa · Mobile Money
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white/[0.92] md:text-5xl">
            Du SMS brut à une API structurée — en quelques millisecondes.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            MoMoParse extrait montants, références, contreparties et statuts depuis les SMS MTN, Moov
            et Celtiis. Conçu pour SikaFlow et toute application qui doit réconcilier des paiements
            sans friction.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#FF6B35] px-8 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
            >
              Accéder à l’app
            </Link>
            <Link
              href="/dashboard/docs"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-white/[0.12] px-8 text-sm font-medium text-white/80 transition-colors hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
            >
              Lire la documentation
            </Link>
          </div>
          <div className="mt-14 grid gap-3 border border-white/[0.08] bg-mp-surface p-4 sm:grid-cols-3 md:mt-20 md:p-6">
            {[
              { k: "Opérateurs", v: "MTN · Moov · Celtiis" },
              { k: "Auth API", v: "X-Api-Key + rate limit" },
              { k: "Temps réel", v: "Supabase Realtime" },
            ].map((row) => (
              <div key={row.k} className="border-b border-white/[0.06] pb-3 sm:border-b-0 sm:pb-0 sm:pr-4 md:border-r md:border-white/[0.06] md:last:border-r-0 md:last:pr-0">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{row.k}</p>
                <p className="mt-1 text-sm font-medium text-white/[0.92]">{row.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white/[0.92] md:text-3xl">
            Une plateforme complète
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/55 md:text-base">
            Ingestion, parsing, API, dashboard admin et SDK-friendly — le même socle que celui
            décrit pour votre stack SikaFlow sur Vercel.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li
                key={f.title}
                className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-5 transition-colors hover:border-white/[0.12]"
              >
                <h3 className="font-semibold text-white/[0.92]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Operators */}
      <section id="operateurs" className="scroll-mt-20 border-y border-white/[0.08] bg-mp-surface/50 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white/[0.92] md:text-3xl">
            Opérateurs pris en charge
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Détection par shortcode et par contenu — normalisation des montants (1.500 → 1500) et des
            numéros.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                name: "MTN MoMo",
                color: "#FF6B35",
                lines: ["Réception / envoi", "Paiement marchand", "Retrait"],
              },
              {
                name: "Moov Money",
                color: "#6B4EFF",
                lines: ["Réception / envoi", "Paiement marchand"],
              },
              {
                name: "Celtiis",
                color: "#2D9CDB",
                lines: ["Crédit reçu", "Débit paiement"],
              },
            ].map((op) => (
              <div
                key={op.name}
                className="rounded-[8px] border border-white/[0.08] bg-mp-bg p-5"
                style={{ borderTopWidth: "3px", borderTopColor: op.color }}
              >
                <h3 className="font-mono font-semibold text-white/[0.92]">{op.name}</h3>
                <ul className="mt-3 space-y-1.5 font-mono text-xs text-white/55">
                  {op.lines.map((l) => (
                    <li key={l}>— {l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold text-white/[0.92] md:text-3xl">API REST v1</h2>
            <p className="mt-2 text-sm text-white/55 md:text-base">
              Authentification par en-tête <code className="font-mono text-[#FF6B35]">X-Api-Key</code>
              , réponses <span className="font-mono text-white/70">{"{ success, data, meta }"}</span>
              , erreurs sans stack trace — prête pour Restafy et vos backends.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/55">
              <li className="font-mono text-xs text-white/70">GET /api/v1/transactions</li>
              <li className="font-mono text-xs text-white/70">GET /api/v1/transactions/:id</li>
              <li className="font-mono text-xs text-white/70">GET /api/v1/stats</li>
              <li className="font-mono text-xs text-white/70">POST /api/v1/transactions/:id/tag</li>
            </ul>
            <Link
              href="/dashboard/docs"
              className="mt-8 inline-flex rounded-[8px] border border-white/[0.12] px-4 py-2 text-sm text-white/80 hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
            >
              Tester dans le playground →
            </Link>
          </div>
          <pre className="mt-10 overflow-x-auto rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] p-4 font-mono text-[11px] leading-relaxed text-[#2D9CDB] lg:mt-0">
            {`const res = await fetch(
  "https://app.sikaflow.com/api/v1/transactions?type=received",
  { headers: { "X-Api-Key": process.env.MOMOPARSE_KEY! } }
);
const { data, meta } = await res.json();

await fetch(
  \`https://app.sikaflow.com/api/v1/transactions/\${id}/tag\`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.MOMOPARSE_KEY!,
    },
    body: JSON.stringify({
      external_ref: "order_456",
      metadata: { restaurant: "Chez Sika", table: 12 },
    }),
  }
);`}
          </pre>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="scroll-mt-20 border-t border-white/[0.08] px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white/[0.92] md:text-3xl">Tarifs</h2>
          <p className="mt-2 text-sm text-white/55">
            Alignés sur votre roadmap produit — upgrade quand le volume explose.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-[8px] border p-6 ${
                  p.highlight
                    ? "border-[#FF6B35]/50 bg-[#FF6B35]/[0.06]"
                    : "border-white/[0.08] bg-mp-surface"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                  {p.name}
                </p>
                <p className="mt-2 font-mono text-2xl font-semibold text-white/[0.92]">{p.price}</p>
                <p className="mt-1 text-sm text-white/50">{p.detail}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/65">
                  {p.items.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-semibold transition-colors ${
                    p.highlight
                      ? "bg-[#FF6B35] text-black hover:bg-[#E55A2A]"
                      : "border border-white/[0.12] text-white/85 hover:border-[#FF6B35]/40"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl rounded-[8px] border border-[#FF6B35]/30 bg-[#FF6B35]/[0.06] px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-white/[0.92] md:text-2xl">
            Prêt à brancher votre caisse ?
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Connectez le dashboard, créez une clé API, configurez votre device Android — tout est
            pensé pour la prod sur Vercel.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-[8px] bg-[#FF6B35] px-6 text-sm font-semibold text-black hover:bg-[#E55A2A]"
            >
              Ouvrir le tableau de bord
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-[8px] border border-white/[0.15] px-6 text-sm font-medium text-white/85 hover:border-white/25"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
