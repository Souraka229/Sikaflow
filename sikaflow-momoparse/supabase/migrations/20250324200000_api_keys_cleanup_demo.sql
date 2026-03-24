-- Supprime les transactions de démo historiques (si présentes).
delete from public.sikaflow_transactions
where id in (
  'txn_7f2a9c1e001',
  'txn_7f2a9c1e002',
  'txn_7f2a9c1e003',
  'txn_7f2a9c1e004',
  'txn_7f2a9c1e005'
);

-- Clés API créées depuis le tableau de bord (hash côté serveur, jamais stocker la clé en clair).
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null default '',
  key_prefix text not null,
  secret_hash text not null,
  scopes text[] not null default '{}',
  is_active boolean not null default true,
  last_used_at timestamptz,
  created_at timestamptz not null default now(),
  constraint api_keys_secret_hash_unique unique (secret_hash)
);

create index if not exists api_keys_user_id_idx on public.api_keys (user_id);

alter table public.api_keys enable row level security;

drop policy if exists "api_keys_select_own" on public.api_keys;
create policy "api_keys_select_own"
  on public.api_keys for select
  using (auth.uid() = user_id);

drop policy if exists "api_keys_insert_own" on public.api_keys;
create policy "api_keys_insert_own"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

drop policy if exists "api_keys_update_own" on public.api_keys;
create policy "api_keys_update_own"
  on public.api_keys for update
  using (auth.uid() = user_id);
