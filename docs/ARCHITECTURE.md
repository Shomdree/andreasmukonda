# Architecture technique

- Front : Astro 5, TypeScript strict, Tailwind 4, îlots JS minimaux.
- Back : Supabase (Postgres, Auth, Storage, RLS). Fallback démo si les variables publiques sont absentes.
- Formulaires : POST sur la même page, validation Zod, honeypot, rate limit mémoire.
- Admin : middleware `src/middleware.ts` + `requireAdmin`.
- Notifications : `src/lib/notifications.ts` (log / email ultérieur).
- Paiements : `src/lib/payments.ts` (devis différé).
