-- Écritures Contact/Commande réservées au serveur, RPC verrouillé, rate-limit partagé.

drop policy if exists "anon insert contact" on public.contact_messages;
drop policy if exists "anon insert orders" on public.orders;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;
revoke all on function public.touch_updated_at() from public;

create or replace function public.next_order_reference()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  y int := extract(year from timezone('Africa/Kinshasa', now()))::int;
  seq int;
begin
  insert into public.order_counters (year, last_seq)
  values (y, 1)
  on conflict (year) do update
    set last_seq = public.order_counters.last_seq + 1
  returning last_seq into seq;
  return 'AM-' || y::text || '-' || lpad(seq::text, 4, '0');
end;
$$;

revoke all on function public.next_order_reference() from public;
revoke all on function public.next_order_reference() from anon;
revoke all on function public.next_order_reference() from authenticated;
grant execute on function public.next_order_reference() to service_role;

create or replace function public.record_order_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.order_status_history (order_id, old_status, new_status, note)
    values (new.id, null, new.status, 'Création');
  elsif tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.order_status_history (order_id, old_status, new_status)
    values (new.id, old.status, new.status);
  end if;
  return new;
end;
$$;

revoke all on function public.record_order_status() from public;

create table if not exists public.form_rate_limits (
  id text primary key,
  hits int not null default 0,
  reset_at timestamptz not null
);

alter table public.form_rate_limits enable row level security;

create or replace function public.consume_form_rate_limit(
  p_id text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  rec public.form_rate_limits%rowtype;
begin
  if p_id is null or length(p_id) < 8 or p_limit < 1 or p_window_seconds < 1 then
    return false;
  end if;

  insert into public.form_rate_limits (id, hits, reset_at)
  values (p_id, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (id) do update
    set
      hits = case
        when public.form_rate_limits.reset_at < now() then 1
        else public.form_rate_limits.hits + 1
      end,
      reset_at = case
        when public.form_rate_limits.reset_at < now() then now() + make_interval(secs => p_window_seconds)
        else public.form_rate_limits.reset_at
      end
  returning * into rec;

  return rec.hits <= p_limit;
end;
$$;

revoke all on function public.consume_form_rate_limit(text, integer, integer) from public;
revoke all on function public.consume_form_rate_limit(text, integer, integer) from anon;
revoke all on function public.consume_form_rate_limit(text, integer, integer) from authenticated;
grant execute on function public.consume_form_rate_limit(text, integer, integer) to service_role;

comment on table public.site_settings is
  'Identité publique du site uniquement. Ne jamais y stocker de secrets, clés API ou notes internes.';
comment on table public.form_rate_limits is
  'Compteurs de limitation. L’identifiant est un hash, jamais une IP en clair.';
