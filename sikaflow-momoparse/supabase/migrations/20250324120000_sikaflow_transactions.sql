-- Persistance API (service role) : ids TEXT, tenant_id TEXT, sans RLS utilisateur.
-- Pour le schéma complet (Auth, UUID, RLS, api_keys, devices), voir :
--   scripts/001_create_schema.sql
-- Ne pas appliquer les deux jeux de migrations sur la même base sans fusion manuelle.
--
-- Colonnes snake_case ; mapping dans lib/api/store-supabase.ts

create table if not exists public.sikaflow_transactions (
  id text primary key,
  tenant_id text not null default 'default',
  operator text not null,
  type text not null,
  status text not null,
  amount bigint not null,
  currency text not null default 'XOF',
  reference text not null,
  counterparty text,
  received_at timestamptz not null,
  raw_sms text not null,
  external_ref text,
  metadata jsonb
);

create index if not exists sikaflow_transactions_tenant_received_idx
  on public.sikaflow_transactions (tenant_id, received_at desc);
