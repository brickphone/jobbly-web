-- Waitlist schema. Runs in its OWN Supabase project, separate from the app's,
-- so the marketing site never holds a credential that can reach user data.
--
-- Safe to run repeatedly: it creates the table if missing and adds any columns
-- an older version of this file didn't have.

create table if not exists public.waitlist (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    source text not null default 'web',
    created_at timestamptz not null default now()
);

-- Employer modal fields. Separate from the create above, because `create table
-- if not exists` is skipped entirely on an existing table and would leave these
-- missing.
alter table public.waitlist
    add column if not exists company text,
    add column if not exists website text,
    add column if not exists contact_name text,
    add column if not exists phone text,
    add column if not exists hiring_needs text,
    add column if not exists notes text;

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
        and source in ('web', 'android-hero', 'employer')
        -- Caps so a public endpoint can't be used to write large blobs.
        and coalesce(length(company), 0) <= 200
        and coalesce(length(website), 0) <= 300
        and coalesce(length(contact_name), 0) <= 200
        and coalesce(length(phone), 0) <= 40
        and coalesce(length(hiring_needs), 0) <= 2000
        and coalesce(length(notes), 0) <= 2000
    );

-- PostgREST caches the schema; without this the new columns stay invisible and
-- inserts fail with PGRST204 until the cache happens to refresh on its own.
notify pgrst, 'reload schema';

-- Read your signups from the dashboard or with the service role key, never
-- from the website:
--   select email, source, company, contact_name, created_at
--   from public.waitlist order by created_at desc;
