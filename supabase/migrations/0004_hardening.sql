-- Durcissement production : rôles, RPC, historique, storage privé
-- Idempotent vis-à-vis 0001–0003.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'user'));
alter table public.profiles alter column role set default 'user';

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

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
grant execute on function public.next_order_reference() to anon, authenticated, service_role;

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

drop trigger if exists trg_orders_status_history on public.orders;
create trigger trg_orders_status_history
  after insert or update of status on public.orders
  for each row execute function public.record_order_status();

drop policy if exists "anon insert contact" on public.contact_messages;
drop policy if exists "admin contact" on public.contact_messages;
drop policy if exists "admin contact upd" on public.contact_messages;
drop policy if exists "admin contact del" on public.contact_messages;
create policy "anon insert contact" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "admin contact" on public.contact_messages for select to authenticated using (public.is_admin());
create policy "admin contact upd" on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin contact del" on public.contact_messages for delete to authenticated using (public.is_admin());

drop policy if exists "anon insert orders" on public.orders;
drop policy if exists "admin read orders" on public.orders;
drop policy if exists "admin write orders" on public.orders;
drop policy if exists "admin delete orders" on public.orders;
create policy "anon insert orders" on public.orders for insert to anon, authenticated with check (true);
create policy "admin read orders" on public.orders for select to authenticated using (public.is_admin());
create policy "admin write orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin delete orders" on public.orders for delete to authenticated using (public.is_admin());

drop policy if exists "admin history" on public.order_status_history;
create policy "admin history" on public.order_status_history
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin counters" on public.order_counters;
create policy "admin counters" on public.order_counters
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "anon upload order attachments" on storage.objects;
drop policy if exists "admin read order attachments" on storage.objects;
create policy "admin read order attachments" on storage.objects
  for select to authenticated
  using (bucket_id = 'order-attachments' and public.is_admin());
create policy "admin write order attachments" on storage.objects
  for all to authenticated
  using (bucket_id = 'order-attachments' and public.is_admin())
  with check (bucket_id = 'order-attachments' and public.is_admin());

update storage.buckets
  set public = false
  where id = 'order-attachments';

update public.site_settings set
  portrait_url = coalesce(nullif(portrait_url, ''), '/images/andreas/portrait.jpg'),
  logo_url = coalesce(nullif(logo_url, ''), '/images/andreas/logo.webp')
where id = 1;
