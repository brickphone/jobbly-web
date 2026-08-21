-- Waitlist schema. Runs in its OWN Supabase project, separate from the app's,
-- so the marketing site never holds a credential that can reach user data.
--
-- Paste into the new project's SQL editor and run once.

create table if not exists public.waitlist (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    source text not null default 'web',
    created_at timestamptz not null default now()
);

-- Case-insensitive uniqueness: a duplicate signup fails at the database rather
-- than needing a read to check for it first.
create unique index if not exists waitlist_email_key
    on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

-- The only policy on this table. `anon` may insert and nothing else — no
-- select, update or delete policy exists, so the key the website carries
-- cannot read back a single row, including its own writes.
drop policy if exists waitlist_anon_insert on public.waitlist;
create policy waitlist_anon_insert on public.waitlist
    for insert to anon
    with check (
        email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
        and length(email) <= 254
        and source in ('web', 'android-hero')
    );

-- Read your signups from the dashboard or with the service role key, never
-- from the website:
--   select email, source, created_at from public.waitlist order by created_at desc;
