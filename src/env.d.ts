/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_ANALYTICS_SRC: string;
  readonly PUBLIC_ANALYTICS_DOMAIN: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly ADMIN_EMAIL: string;
  readonly EMAIL_PROVIDER_API_KEY: string;
  readonly EMAIL_FROM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    locale: import("./i18n/config").Locale;
    pathWithoutLocale: string;
  }
}
