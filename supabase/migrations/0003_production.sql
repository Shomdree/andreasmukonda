-- Identité officielle, référence de commande atomique, admin messages

create or replace function public.next_order_reference()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  y int := extract(year from timezone('utc', now()))::int;
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
grant execute on function public.next_order_reference() to service_role;
grant execute on function public.next_order_reference() to authenticated;

drop policy if exists "admin contact del" on public.contact_messages;
create policy "admin contact del" on public.contact_messages for delete using (public.is_admin());

update public.site_settings set
  legal_name = 'Andréas Mukonda Eke-Shomba',
  professional_title = 'Graphic Designer · Formateur · Consultant · Entrepreneur digital',
  tagline = 'Créer aujourd’hui les solutions qui feront la différence demain.',
  hero_title = 'Créer aujourd’hui les solutions qui feront la différence demain.',
  hero_subtitle = 'Design, digital, formation et stratégie pour transformer vos idées en projets visibles, crédibles et performants.',
  email = coalesce(nullif(email, ''), 'andreasshomdree9@gmail.com'),
  phone = coalesce(nullif(phone, ''), '+243 841 197 130'),
  phone_secondary = coalesce(nullif(phone_secondary, ''), '+243 837 422 229'),
  whatsapp = coalesce(nullif(whatsapp, ''), '243841197130'),
  whatsapp_secondary = coalesce(nullif(whatsapp_secondary, ''), '243837422229'),
  seo_title = 'Andréas Mukonda — Graphic Designer, Formateur & Consultant à Kinshasa',
  seo_description = 'Découvrez l’univers d’Andréas Mukonda : design graphique, formation, consulting, solutions numériques, photographie et médias à Kinshasa.',
  social_links = coalesce(social_links, '{}'::jsonb) || jsonb_build_object(
    'facebook', 'https://www.facebook.com/profile.php?id=61586200790214',
    'pinterest', 'https://pin.it/3y41F5NYN',
    'instagram', 'https://www.instagram.com/shomdree_design1',
    'tiktok', 'https://www.tiktok.com/@andreas_mukonda',
    'youtube', 'https://www.youtube.com/@shomdreedesign6871'
  )
where id = 1;
