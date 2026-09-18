alter table public.site_settings
  add column if not exists legal_name text,
  add column if not exists positioning text,
  add column if not exists education text,
  add column if not exists publications_note text,
  add column if not exists ecosystem_intro text,
  add column if not exists phone_secondary text,
  add column if not exists whatsapp_secondary text;

alter table public.services
  add column if not exists cta_label text,
  add column if not exists cta_href text;

update public.site_settings set
  legal_name = coalesce(legal_name, 'Andréas Mukonda Eke-Shomba'),
  whatsapp = coalesce(nullif(whatsapp, ''), '243841197130'),
  whatsapp_secondary = coalesce(whatsapp_secondary, '243837422229'),
  phone = coalesce(nullif(phone, ''), '+243 841 197 130'),
  phone_secondary = coalesce(phone_secondary, '+243 837 422 229'),
  location = 'Kinshasa, République démocratique du Congo'
where id = 1;
