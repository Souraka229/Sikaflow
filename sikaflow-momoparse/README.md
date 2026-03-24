# Sika FLOW — MoMoParse

Application [Next.js](https://nextjs.org) : landing, dashboard, documentation et **API REST** `/api/v1/*` pour les transactions Mobile Money (MTN, Moov, Celtiis).

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Copier `.env.example` vers `.env.local` et ajuster si besoin.

## Production (checklist)

1. **Variables d’environnement** (ex. Vercel → Project → Settings → Environment Variables) :
   - `SIKAFLOW_API_KEYS` : au moins une clé secrète (séparées par des virgules si plusieurs). **Sans cela, en `NODE_ENV=production` l’API répond 503** et `/api/ready` est en échec.
   - `SIKAFLOW_CORS_ORIGIN` (recommandé) : origine exacte du front (ex. `https://votre-domaine.com`). Par défaut : `*` sur les réponses API.
   - `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` : optionnel mais **recommandé** sur Vercel pour une persistance durable (sinon store **mémoire**, perdu entre cold starts). Appliquer la migration SQL dans `supabase/migrations/`.
   - `SIKAFLOW_DOCS_DEMO_KEY` : optionnel, uniquement pour préremplir le playground docs (ne pas y mettre une clé de prod sur un repo public).

2. **Santé** :
   - `GET /api/health` — vivacité simple.
   - `GET /api/ready` — vérifie la config minimale en production (clés API).

3. **Sécurité** : en-têtes HTTP (HSTS, `X-Frame-Options`, etc.) sont définis dans `next.config.ts`.

## Déploiement Vercel

Le déploiement suit la [documentation Next.js](https://nextjs.org/docs/app/building-your-application/deploying). Après le premier déploiement, configurer les variables ci-dessus puis redéployer.
