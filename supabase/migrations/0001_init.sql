-- Andréas Mukonda — schéma initial, RLS, storage, seed de démonstration
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  bio text,
  avatar_url text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_name text not null default 'Andréas Mukonda',
  monogram text not null default 'AM',
  professional_title text,
  tagline text,
  hero_title text,
  hero_subtitle text,
  short_bio text,
  long_bio text,
  philosophy text,
  email text,
  phone text,
  whatsapp text,
  location text,
  availability text,
  portrait_url text,
  logo_url text,
  seo_title text,
  seo_description text,
  social_links jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  description text,
  category_id uuid references public.portfolio_categories (id) on delete set null,
  client text,
  year text,
  challenge text,
  solution text,
  services_done text[] not null default '{}',
  cover_image text,
  video_url text,
  external_url text,
  results text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects (id) on delete cascade,
  file_url text not null,
  media_type text not null default 'image',
  alt_text text,
  sort_order int not null default 0
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  description text,
  benefits text[] not null default '{}',
  deliverables text[] not null default '{}',
  price_label text not null default 'Sur devis',
  turnaround text,
  cover_image text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trainings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  description text,
  audience text,
  trainer text default 'Andréas Mukonda',
  program text,
  level text,
  format text,
  duration text,
  location text,
  start_at timestamptz,
  end_at timestamptz,
  capacity int,
  price_label text default 'Sur devis',
  cover_image text,
  registration_open boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.training_registrations (
  id uuid primary key default gen_random_uuid(),
  training_id uuid references public.trainings (id) on delete set null,
  training_slug text,
  full_name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  organization text,
  message text,
  status text not null default 'nouvelle',
  created_at timestamptz not null default now()
);

create table if not exists public.live_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  platform text not null,
  url text not null,
  thumbnail_url text,
  description text,
  scheduled_at timestamptz,
  duration text,
  status text not null default 'programme' check (status in ('programme', 'en-direct', 'replay')),
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.order_counters (
  year int primary key,
  last_seq int not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  service_id uuid references public.services (id) on delete set null,
  service_title text,
  full_name text not null,
  organization text,
  email text not null,
  phone text not null,
  whatsapp text,
  project_type text,
  description text not null,
  budget_range text,
  desired_deadline text,
  contact_preference text,
  attachment_url text,
  status text not null default 'nouvelle',
  quoted_price text,
  internal_note text,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  old_status text,
  new_status text not null,
  note text,
  changed_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  whatsapp text,
  category text not null,
  question text not null,
  consent_publication boolean not null default false,
  display_anonymously boolean not null default false,
  answer text,
  status text not null default 'nouvelle',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  organization text,
  photo_url text,
  quote text not null,
  collaboration_type text,
  published boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  category text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at date,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now()
);

create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  published boolean not null default false
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  preferred_contact text,
  status text not null default 'nouvelle',
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  whatsapp text,
  email text,
  organization text,
  subject text not null,
  description text not null,
  urgency text not null default 'normale',
  availability text,
  status text not null default 'nouvelle',
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_published on public.portfolio_projects (published, sort_order);
create index if not exists idx_services_published on public.services (published, sort_order);
create index if not exists idx_trainings_published on public.trainings (published);
create index if not exists idx_lives_published on public.live_items (published, scheduled_at desc);
create index if not exists idx_posts_published on public.posts (published, published_at desc);
create index if not exists idx_orders_created on public.orders (created_at desc);
create index if not exists idx_questions_status on public.questions (status, published);

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

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated on public.portfolio_projects;
create trigger trg_projects_updated before update on public.portfolio_projects
for each row execute function public.touch_updated_at();

drop trigger if exists trg_orders_updated on public.orders;
create trigger trg_orders_updated before update on public.orders
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.portfolio_categories enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_media enable row level security;
alter table public.services enable row level security;
alter table public.trainings enable row level security;
alter table public.training_registrations enable row level security;
alter table public.live_items enable row level security;
alter table public.order_counters enable row level security;
alter table public.orders enable row level security;
alter table public.order_status_history enable row level security;
alter table public.questions enable row level security;
alter table public.testimonials enable row level security;
alter table public.posts enable row level security;
alter table public.faq enable row level security;
alter table public.contact_messages enable row level security;
alter table public.consultations enable row level security;

create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "public read categories" on public.portfolio_categories for select using (true);
create policy "admin write categories" on public.portfolio_categories for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published projects" on public.portfolio_projects for select using (published = true or public.is_admin());
create policy "admin write projects" on public.portfolio_projects for all using (public.is_admin()) with check (public.is_admin());

create policy "public read media" on public.portfolio_media for select using (
  exists (select 1 from public.portfolio_projects p where p.id = project_id and (p.published = true or public.is_admin()))
);
create policy "admin write media" on public.portfolio_media for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published services" on public.services for select using (published = true or public.is_admin());
create policy "admin write services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published trainings" on public.trainings for select using (published = true or public.is_admin());
create policy "admin write trainings" on public.trainings for all using (public.is_admin()) with check (public.is_admin());

create policy "anon insert registrations" on public.training_registrations for insert with check (true);
create policy "admin read registrations" on public.training_registrations for select using (public.is_admin());
create policy "admin write registrations" on public.training_registrations for update using (public.is_admin());

create policy "public read published lives" on public.live_items for select using (published = true or public.is_admin());
create policy "admin write lives" on public.live_items for all using (public.is_admin()) with check (public.is_admin());

create policy "anon insert orders" on public.orders for insert with check (true);
create policy "admin read orders" on public.orders for select using (public.is_admin());
create policy "admin write orders" on public.orders for update using (public.is_admin());
create policy "admin delete orders" on public.orders for delete using (public.is_admin());

create policy "admin history" on public.order_status_history for all using (public.is_admin()) with check (public.is_admin());
create policy "admin counters" on public.order_counters for all using (public.is_admin()) with check (public.is_admin());

create policy "anon insert questions" on public.questions for insert with check (published = false);
create policy "public read published questions" on public.questions for select using ((published = true and status = 'publiee') or public.is_admin());
create policy "admin write questions" on public.questions for update using (public.is_admin());

create policy "public read testimonials" on public.testimonials for select using (published = true or public.is_admin());
create policy "admin write testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

create policy "public read posts" on public.posts for select using (published = true or public.is_admin());
create policy "admin write posts" on public.posts for all using (public.is_admin()) with check (public.is_admin());

create policy "public read faq" on public.faq for select using (published = true or public.is_admin());
create policy "admin write faq" on public.faq for all using (public.is_admin()) with check (public.is_admin());

create policy "anon insert contact" on public.contact_messages for insert with check (true);
create policy "admin contact" on public.contact_messages for select using (public.is_admin());
create policy "admin contact upd" on public.contact_messages for update using (public.is_admin());

create policy "anon insert consultations" on public.consultations for insert with check (true);
create policy "admin consultations" on public.consultations for select using (public.is_admin());
create policy "admin consultations upd" on public.consultations for update using (public.is_admin());

create policy "admin profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "self profile" on public.profiles for select using (auth.uid() = id);

insert into storage.buckets (id, name, public)
values
  ('portfolio', 'portfolio', true),
  ('avatars', 'avatars', true),
  ('trainings', 'trainings', true),
  ('posts', 'posts', true),
  ('lives', 'lives', true),
  ('order-attachments', 'order-attachments', false)
on conflict (id) do nothing;

create policy "public read public buckets" on storage.objects
  for select using (bucket_id in ('portfolio', 'avatars', 'trainings', 'posts', 'lives'));

create policy "anon upload order attachments" on storage.objects
  for insert with check (
    bucket_id = 'order-attachments'
    and (storage.extension(name) in ('pdf', 'jpg', 'jpeg', 'png', 'webp', 'avif'))
  );

create policy "admin storage" on storage.objects
  for all using (public.is_admin()) with check (public.is_admin());
