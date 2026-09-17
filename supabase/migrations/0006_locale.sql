-- Additive locale column for visitor language. Existing rows stay valid.

alter table public.contact_messages
  add column if not exists locale text not null default 'fr';

alter table public.orders
  add column if not exists locale text not null default 'fr';

alter table public.questions
  add column if not exists locale text not null default 'fr';

alter table public.consultations
  add column if not exists locale text not null default 'fr';

alter table public.training_registrations
  add column if not exists locale text not null default 'fr';

alter table public.contact_messages
  drop constraint if exists contact_messages_locale_check;
alter table public.contact_messages
  add constraint contact_messages_locale_check check (locale in ('fr', 'ln', 'en'));

alter table public.orders
  drop constraint if exists orders_locale_check;
alter table public.orders
  add constraint orders_locale_check check (locale in ('fr', 'ln', 'en'));

alter table public.questions
  drop constraint if exists questions_locale_check;
alter table public.questions
  add constraint questions_locale_check check (locale in ('fr', 'ln', 'en'));

alter table public.consultations
  drop constraint if exists consultations_locale_check;
alter table public.consultations
  add constraint consultations_locale_check check (locale in ('fr', 'ln', 'en'));

alter table public.training_registrations
  drop constraint if exists training_registrations_locale_check;
alter table public.training_registrations
  add constraint training_registrations_locale_check check (locale in ('fr', 'ln', 'en'));
