import { identity } from "../i18n/identity";
import { logServerError, siteUrl } from "./env";

export type NotificationPayload = {
  type: "order" | "question" | "registration" | "consultation" | "contact";
  title: string;
  body: string;
  replyTo?: string;
  fields?: Record<string, string | null | undefined>;
  inboxPath?: string;
};

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export type FormattedEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<void>;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Andreas Mukonda <beth.t@example.com>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function secret(name: "EMAIL_PROVIDER_API_KEY" | "EMAIL_FROM" | "ADMIN_EMAIL"): string {
  const fromVite = import.meta.env[name];
  const fromNode = typeof process !== "undefined" ? process.env[name] : undefined;
  return String(fromVite ?? fromNode ?? "").trim();
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function filledFields(fields?: NotificationPayload["fields"]): [string, string][] {
  if (!fields) return [];
  return Object.entries(fields).flatMap(([label, value]) => {
    const text = typeof value === "string" ? value.trim() : "";
    return text ? [[label, text] as [string, string]] : [];
  });
}

export function readEmailConfig(): EmailConfig | null {
  const apiKey = secret("EMAIL_PROVIDER_API_KEY");
  if (!apiKey) return null;
  const from = secret("EMAIL_FROM") || DEFAULT_FROM;
  const to = secret("ADMIN_EMAIL") || identity.email;
  return { apiKey, from, to };
}

export function formatNotificationEmail(payload: NotificationPayload, adminBaseUrl = ""): FormattedEmail {
  const rows = filledFields(payload.fields);
  const textLines = [payload.body];
  if (rows.length) {
    textLines.push("");
    for (const [label, value] of rows) textLines.push(`${label} : ${value}`);
  }
  const inbox = payload.inboxPath || "/admin";
  if (adminBaseUrl) {
    textLines.push("", `Ouvrir dans l'administration : ${adminBaseUrl}${inbox}`);
  }

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const inboxHtml = adminBaseUrl
    ? `<p><a href="${escapeHtml(`${adminBaseUrl}${inbox}`)}">Ouvrir dans l'administration</a></p>`
    : "";

  return {
    subject: payload.title,
    text: textLines.join("\n"),
    html: `<p>${escapeHtml(payload.body)}</p>${htmlRows ? `<table>${htmlRows}</table>` : ""}${inboxHtml}`,
    replyTo: payload.replyTo && EMAIL_RE.test(payload.replyTo) ? payload.replyTo : undefined,
  };
}

export async function sendResendEmail(
  config: EmailConfig,
  email: FormattedEmail,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const response = await fetcher(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: email.subject,
      text: email.text,
      html: email.html,
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    let code = String(response.status);
    try {
      const body = (await response.json()) as { name?: string };
      if (body?.name) code = `${response.status}:${body.name}`;
    } catch {
      /* ignore parse errors */
    }
    logServerError("notify.email", code);
    throw new Error("email_failed");
  }
}

class LogNotificationProvider implements NotificationProvider {
  async send(payload: NotificationPayload): Promise<void> {
    if (import.meta.env.DEV) {
      console.info(`[notification:${payload.type}] ${payload.title}`);
    }
  }
}

export async function deliverNotification(
  payload: NotificationPayload,
  options: {
    config?: EmailConfig | null;
    fetcher?: typeof fetch;
    adminBaseUrl?: string;
  } = {},
): Promise<"sent" | "logged" | "failed"> {
  const config = options.config === undefined ? readEmailConfig() : options.config;
  const email = formatNotificationEmail(payload, options.adminBaseUrl ?? siteUrl());
  if (!config) {
    await new LogNotificationProvider().send(payload);
    return "logged";
  }
  try {
    await sendResendEmail(config, email, options.fetcher ?? fetch);
    if (import.meta.env.DEV) console.info(`[notification:${payload.type}] sent`);
    return "sent";
  } catch {
    logServerError("notify.email", "send");
    return "failed";
  }
}

class EmailNotificationProvider implements NotificationProvider {
  async send(payload: NotificationPayload): Promise<void> {
    await deliverNotification(payload);
  }
}

export const notificationService: NotificationProvider = new EmailNotificationProvider();

export async function notifyAfterSave(payload: NotificationPayload): Promise<void> {
  try {
    await notificationService.send(payload);
  } catch {
    // Les données sont déjà persistées ; la notification ne doit pas faire échouer la requête.
  }
}
