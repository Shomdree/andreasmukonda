-- Données confirmées (aucun client fictif, aucun projet inventé)
insert into public.site_settings (
  id, site_name, legal_name, monogram, professional_title, tagline, hero_title, hero_subtitle,
  short_bio, long_bio, philosophy, education, publications_note, ecosystem_intro,
  email, phone, phone_secondary, whatsapp, whatsapp_secondary,
  location, availability, portrait_url, seo_title, seo_description, social_links
) values (
  1,
  'Andréas Mukonda',
  'Andréas Mukonda Eke-Shomba',
  'AM',
  'Graphic Designer · Formateur · Consultant · Entrepreneur digital',
  'Créer aujourd’hui les solutions qui feront la différence demain.',
  'Créer aujourd’hui les solutions qui feront la différence demain.',
  'Design, digital, formation et stratégie pour transformer vos idées en projets visibles, crédibles et performants.',
  'Andréas Mukonda Eke-Shomba est un entrepreneur digital, graphic designer, formateur et consultant basé à Kinshasa.',
  'Né et ayant grandi à Kinshasa, Andréas Mukonda Eke-Shomba évolue dans un environnement où les valeurs de discipline, de simplicité, de responsabilité et de recherche de solutions occupent une place importante.',
  'Créer aujourd’hui les solutions qui feront la différence demain — concrètes, accessibles et adaptées aux réalités de Kinshasa et de ses interlocuteurs.',
  'Licence en administration des réseaux et gestion de bases de données — ESMICOM',
  'Auteur de deux ouvrages d’inspiration chrétienne.',
  'Global SHOMDREE Industries est l’écosystème entrepreneurial fondé en 2022 par Andréas Mukonda.',
  'andreasshomdree9@gmail.com',
  '+243 841 197 130',
  '+243 837 422 229',
  '243841197130',
  '243837422229',
  'Kinshasa, République démocratique du Congo',
  'Sur rendez-vous — réponses sous quelques jours ouvrés.',
  '/images/andreas/portrait.jpg',
  'Andréas Mukonda — Graphic Designer, Formateur & Consultant à Kinshasa',
  'Découvrez l’univers d’Andréas Mukonda : design graphique, formation, consulting, solutions numériques, photographie et médias à Kinshasa.',
  '{"facebook":"https://www.facebook.com/profile.php?id=61586200790214","pinterest":"https://pin.it/3y41F5NYN","instagram":"https://www.instagram.com/shomdree_design1","tiktok":"https://www.tiktok.com/@andreas_mukonda","youtube":"https://www.youtube.com/@shomdreedesign6871"}'::jsonb
) on conflict (id) do update set
  professional_title = excluded.professional_title,
  tagline = excluded.tagline,
  hero_title = excluded.hero_title,
  hero_subtitle = excluded.hero_subtitle,
  email = excluded.email,
  phone = excluded.phone,
  phone_secondary = excluded.phone_secondary,
  whatsapp = excluded.whatsapp,
  whatsapp_secondary = excluded.whatsapp_secondary,
  social_links = excluded.social_links,
  location = excluded.location,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  portrait_url = excluded.portrait_url;

insert into public.portfolio_categories (name, slug) values
  ('Design', 'design'),
  ('Branding', 'branding'),
  ('Photographie', 'photographie'),
  ('Web & logiciels', 'web-logiciels'),
  ('Livres', 'livres'),
  ('Médias', 'medias')
on conflict (slug) do nothing;

insert into public.faq (question, answer, category, sort_order, published)
select 'Comment commander un projet ?',
  'Utilisez la page Commander. Vous recevez une référence du type AM-2026-0001. Un devis suit après analyse. Aucun paiement n''est pris sur le site.',
  'Commandes', 1, true
where not exists (select 1 from public.faq where question like 'Comment commander%');
