# Andréas Mukonda — site officiel

Site personnel, portfolio, services, formations, lives, questions et demandes de commande.

Stack : **Astro 5** · **TypeScript strict** · **Tailwind 4** · **Supabase** (Postgres, Auth, Storage, RLS).

Le thème sombre est l’identité principale. Les pages publiques restent lisibles sans JavaScript.

## Installation

Prérequis : Node.js 20.11+.

```bash
npm install
cp .env.example .env
npm run dev
```

Ouvrir [http://localhost:4321](http://localhost:4321).

Sans credentials Supabase, le **catalogue local** (`src/content/defaults.ts`, `src/content/demo.ts`) alimente services, formations et FAQ.

En **développement** uniquement, les formulaires peuvent être acceptés en mémoire processus. En **production**, aucun message ni aucune commande n’est confirmé s’il n’est pas persisté dans Supabase.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (adaptateur Node) |
| `npm start` | Lancer le serveur Node (`dist/server/entry.mjs`) après build |
| `npm run preview` | Aperçu Astro |
| `npm run check` | `astro check` |
| `npm test` | Tests unitaires Vitest |
| `npm run test:e2e` | Playwright (sur Windows, `PLAYWRIGHT_CHANNEL=msedge` si Chromium Playwright est bloqué) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Variables d’environnement

Voir `.env.example`. Aucun secret ne doit porter le préfixe `PUBLIC_`.

### Public

| Variable | Usage |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical, sitemap, Open Graph |
| `PUBLIC_SUPABASE_URL` | Client Supabase |
| `PUBLIC_SUPABASE_ANON_KEY` | Clé anon (RLS obligatoire) |
| `PUBLIC_WHATSAPP_NUMBER` | Optionnel, chiffres `243…` |
| `PUBLIC_ANALYTICS_SRC` / `PUBLIC_ANALYTICS_DOMAIN` | Plausible / Umami (optionnel) |

### Secret (serveur uniquement)

| Variable | Usage |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Inserts serveur, RPC `next_order_reference`, Storage privé, URL signées |
| `ADMIN_EMAIL` | Allowlist optionnelle, **en plus** de `profiles.role = 'admin'` ; destinataire des notifications email |
| `EMAIL_PROVIDER_API_KEY` / `EMAIL_FROM` | Envoi réel via [Resend](https://resend.com) après chaque formulaire. Sans clé API, le visiteur peut être confirmé mais **aucun email n’arrive** |

Ne jamais committer `.env`. Ne jamais exposer la service role dans le navigateur.

## Mise en production

1. **Créer un projet Supabase** sur [supabase.com](https://supabase.com). Désactiver l’inscription publique (Auth → Providers → Email : pas de signup ouvert).
2. **Appliquer les migrations** avec la CLI (méthode recommandée) :

```bash
npx supabase login
npx supabase link --project-ref VOTRE_PROJECT_REF
```

Renseigner ensuite `.env` (URL, anon, **service role**, `ADMIN_EMAIL`, `PUBLIC_SITE_URL`).

```bash
npx supabase db push
```

Cela applique `0001` → `0005` dans l’ordre. Ne pas coller les mêmes fichiers dans le SQL Editor **en plus** de `db push`.

3. **Seed** (identité, FAQ, catégories — aucun client fictif) :

```bash
psql "$DATABASE_URL" -f supabase/seed.sql
```

Alternative manuelle **si la CLI n’est pas disponible** : coller une seule fois, dans l’ordre, `0001_init.sql` … `0005_server_writes.sql` puis `seed.sql` dans le SQL Editor. Ne pas cumuler SQL Editor et `db push`.

4. **Créer le premier administrateur**

   Un trigger `handle_new_user` crée automatiquement une ligne `profiles` (`role = 'user'`) à chaque nouvel utilisateur Auth.

   1. Auth → Add user : email + mot de passe (ne pas commiter le mot de passe).
   2. Copier l’UUID de l’utilisateur.
   3. Promouvoir en admin (fonctionne même si le trigger n’a pas encore tourné) :

```sql
insert into public.profiles (id, display_name, role)
values ('UUID-DU-COMPTE', 'Andréas Mukonda', 'admin')
on conflict (id) do update
set role = 'admin', display_name = excluded.display_name;
```

   4. Mettre `ADMIN_EMAIL` sur cet email dans l’environnement du serveur.
   5. Se connecter sur `/admin/login` puis ouvrir `/admin`. Sans session, `/admin/messages` redirige vers le login.

   Les nouveaux comptes Auth reçoivent `profiles.role = 'user'` et **n’ont pas** accès à l’admin.

5. **Storage** : la migration crée le bucket privé `order-attachments`. Les fichiers de commande ne sont pas listables publiquement. L’admin ouvre un lien signé temporaire.

6. **Variables** : renseigner `.env` / secrets d’hébergement (URL, anon, **service role**, `ADMIN_EMAIL`, `PUBLIC_SITE_URL` en https).

7. **Tests** :

```bash
npm test
npx playwright install --with-deps
# Windows : si l'install Chromium est bloquée, PLAYWRIGHT_CHANNEL=msedge npm run test:e2e
npm run test:e2e
npm run test:supabase
```

`test:supabase` exige `.env` local (URL + service role). Sans ces secrets, le script s’arrête avec `SKIP` et ne confirme pas la persistance.

8. **Build** :

```bash
npm ci
npm run build
NODE_ENV=production node dist/server/entry.mjs
```

9. **Déployer** : Node autonome (Fly.io, Railway, Render, VPS derrière Caddy/Nginx). Ce dépôt utilise `@astrojs/node` (`output: "server"`) à cause des formulaires, de l’admin et des cookies Auth.

10. **Smoke test** après déploiement : `/`, `/a-propos`, `/services`, `/contact`, `/commander`, `/portfolio`, `/formations`, `/admin/login`. Vérifier qu’un envoi Contact crée une ligne dans `contact_messages`, et qu’un redémarrage du serveur ne l’efface pas.

11. **Email propriétaire** : créer une clé Resend, renseigner `EMAIL_PROVIDER_API_KEY`, `ADMIN_EMAIL` (votre Gmail) et optionnellement `EMAIL_FROM` sur l’hébergeur, puis redémarrer. Un message Contact doit arriver dans Gmail **et** dans `/admin/messages`. Sans cette clé, seule l’admin (ou la mémoire de développement) reçoit la demande. Le succès affiché au visiteur ne signifie pas qu’un email est parti.

## Supabase — schéma utile

- Tables formulaires : `contact_messages`, `orders`, `order_status_history`, `order_counters`, `questions`, `consultations`, `training_registrations`
- Contenu : `site_settings`, `services`, `trainings`, `portfolio_*`, `posts`, `faq`, `live_items`, `testimonials`
- Auth : `profiles.role` (`admin` \| `user`) ; `public.is_admin()`
- RPC : `next_order_reference()` — compteur SQL atomique, format `AM-AAAA-NNNN`, contrainte UNIQUE sur `orders.reference`
- RLS : **aucun INSERT anon** sur `contact_messages` / `orders` (écritures service role via Astro) ; **aucun SELECT** anon sur ces tables ; CRUD admin via `is_admin()`
- RPC `next_order_reference()` et `consume_form_rate_limit()` : `EXECUTE` réservé à `service_role`
- Limitation de débit : hash SHA-256 de l’IP + bucket ; table `form_rate_limits` (multi-instances) avec repli mémoire processus si la RPC n’est pas encore disponible

## Administration

- URL : `/admin/login`
- Protection **middleware serveur** : session Supabase Auth **et** `profiles.role = 'admin'`
- Messages : `/admin/messages` (lu / traité / archivé)
- Commandes : statuts + notes + historique
- Les questions **ne sont jamais publiées automatiquement**

## Médias

Portraits et logo : `public/images/andreas/` (AVIF / WebP / JPEG). Open Graph : `/images/andreas/og.jpg`.

## Sécurité

- RLS sur toutes les tables métier
- Headers : CSP, nosniff, frame deny, origin check Astro
- Honeypot + rate limit + Zod serveur
- Rate limit : compteur hashé (pas d’IP brute). Avec service role : Postgres partagé ; sinon mémoire du processus Node (non partagée entre instances)
- Uploads : extension, MIME, magie fichier, 5 Mo max ; bucket privé
- Admin hors indexation (`noindex`)
- Logs production : code d’erreur technique, pas de mot de passe / token / service-role / contenu privé

## Performance (RDC)

- HTML utile dès le premier octet
- Polices variables locales, pas de vidéo autoplay
- Lazy-load hors hero, `prefers-reduced-motion`

## Prochaines évolutions (non livrées)

Mobile money, newsletter, i18n EN, sync YouTube, espace étudiant.
