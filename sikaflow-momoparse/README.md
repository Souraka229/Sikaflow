# Sika FLOW (MoMoParse)

Plateforme **Next.js** pour transformer les SMS **Mobile Money** (MTN, Moov, Celtiis) en données exploitables : **landing** marketing, **tableau de bord** type fintech, **documentation** avec playground, et **API REST** versionnée (`/api/v1`).

| | |
| --- | --- |
| **Stack** | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 |
| **Déploiement** | [Vercel](https://vercel.com) (recommandé) |
| **Persistance optionnelle** | [Supabase](https://supabase.com) (PostgreSQL) |

---

## Fonctionnalités

- **Landing** : offre, opérateurs, extrait d’API, tarifs indicatifs, FAQ.
- **Dashboard** : vue d’ensemble (Bento), transactions, clés API, appareils, docs intégrées.
- **API publique** : authentification `X-Api-Key`, CORS configurable, pagination par curseur, filtres (opérateur, type, statut, dates, référence).
- **Santé** : `/api/health` (liveness), `/api/ready` (prêt pour la prod si clés configurées).
- **PWA** : manifeste et icônes dans `public/icons/`.
- **Observabilité** : Vercel Analytics & Speed Insights (voir `app/layout.tsx`).

---

## Prérequis

- **Node.js** 20+ (LTS recommandé)
- **npm** (ou pnpm / bun selon votre habitude)

---

## Installation et scripts

À la racine de ce dossier (`sikaflow-momoparse/`) :

```bash
npm install
npm run dev
```

L’application est disponible sur [http://localhost:3000](http://localhost:3000).

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build (après `build`) |
| `npm run lint` | ESLint |

### Dépôt monorepo (dossier parent)

Si votre clone contient un `package.json` à la racine qui pointe vers ce sous-dossier :

```bash
npm run install:app   # installe les deps dans sikaflow-momoparse
npm run dev           # démarre l’app via --prefix
```

---

## Configuration

Copier le modèle d’environnement :

```bash
cp .env.example .env.local
```

| Variable | Obligatoire en prod | Description |
| --- | --- | --- |
| `SIKAFLOW_API_KEYS` | Conditionnelle | Clés API séparées par des virgules (machine / intégrations). |
| `SIKAFLOW_API_KEY` | Alternative | Une seule clé si vous n’utilisez pas `SIKAFLOW_API_KEYS`. |
| `SIKAFLOW_API_TENANT_ID` | Non | UUID utilisateur Auth : limite les lectures API pour les clés « env » au `tenant_id` correspondant. |
| `SIKAFLOW_CORS_ORIGIN` | Non | Origine autorisée pour les réponses API (ex. `https://app.example.com`). Défaut : `*`. |
| `SUPABASE_URL` | Non* | URL du projet Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Non* | Clé **service role** : persistance `/api/v1` sur PostgreSQL + validation des clés créées dans le dashboard. |
| `SIKAFLOW_DOCS_DEMO_KEY` | Non | Préremplit le champ clé du playground documentation. Éviter une clé de prod sur un repo public. |

\* **Production** : configurez au moins `SIKAFLOW_API_*` **ou** `SUPABASE_SERVICE_ROLE_KEY` (sinon **503** sur l’API). Sans service role, l’API utilise un **store mémoire vide** (non durable).

---

## API REST v1

Toutes les routes JSON supportent les méthodes nécessaires et les en-têtes CORS (y compris `OPTIONS`).

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/api/v1/transactions` | Liste paginée + filtres (`operator`, `type`, `status`, `reference`, `from`, `to`, `limit`, `cursor`). |
| `GET` | `/api/v1/transactions/:id` | Détail + `rawSms`. |
| `GET` | `/api/v1/stats` | Agrégats (volume, comptes, par opérateur, etc.). |
| `POST` | `/api/v1/transactions/:id/tag` | Met à jour `external_ref` et `metadata` (corps JSON validé). |

**Exemple** :

```bash
curl -sS "http://localhost:3000/api/v1/transactions?limit=5" \
  -H "X-Api-Key: VOTRE_CLE"
```

---

## Base de données (Supabase)

1. Créer un projet Supabase et récupérer l’URL + la **service role key**.
2. Exécuter le script SQL dans `supabase/migrations/20250324120000_sikaflow_transactions.sql` (SQL Editor ou CLI).
3. Définir `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sur l’environnement d’exécution.

Sans ces variables, l’application continue de fonctionner avec le store en mémoire (données de démo).

---

## Structure utile du projet

```
app/                    # App Router (pages, layouts, API routes)
components/landing/     # Site vitrine
components/momoparse/   # Dashboard, docs, playground
lib/api/                # Auth, store, validation Zod, réponses CORS
lib/supabase/           # Client admin (optionnel)
public/icons/           # Icônes PWA
supabase/migrations/    # Schéma SQL optionnel
```

---

## Production : checklist rapide

1. Définir **`SIKAFLOW_API_KEYS`** (ou `SIKAFLOW_API_KEY`) sur l’hébergeur.
2. Configurer **`SIKAFLOW_CORS_ORIGIN`** si le front est sur un autre domaine.
3. Brancher **Supabase** pour une persistance réelle (migration + variables).
4. Vérifier **`GET /api/ready`** (doit répondre 200 une fois les clés posées).
5. Consulter `next.config.ts` pour les **en-têtes de sécurité** (HSTS, etc.).

Guide officiel déploiement Next.js : [Deploying](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Pages applicatives (aperçu)

| Chemin | Rôle |
| --- | --- |
| `/` | Landing |
| `/login` | Connexion (démo → redirection dashboard) |
| `/dashboard` | Vue d’ensemble |
| `/dashboard/transactions` | Liste et filtres |
| `/dashboard/api-keys` | Gestion des clés (UI) |
| `/dashboard/devices` | Passerelles |
| `/dashboard/docs` | Documentation + try-it |
| `/mentions-legales` · `/confidentialite` | Pages légales type (à compléter) |

---

## Licence et marque

Projet privé / usage selon votre organisation. La marque affichée dans l’UI est **Sika FLOW**.
