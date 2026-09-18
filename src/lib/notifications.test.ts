import { describe, expect, it, vi } from "vitest";
import {
  deliverNotification,
  escapeHtml,
  formatNotificationEmail,
  sendResendEmail,
  type EmailConfig,
} from "./notifications";

const config: EmailConfig = {
  apiKey: "re_test",
  from: "Andréas Mukonda <beth.t@example.com>",
  to: "owner@example.com",
};

describe("notifications", () => {
  it("escapes HTML in email bodies", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it("formats contact details and an admin link", () => {
    const email = formatNotificationEmail(
      {
        type: "contact",
        title: "Nouveau message de contact",
        body: "Marie — Demande",
        replyTo: "marie@example.com",
        inboxPath: "/admin/messages/abc",
        fields: {
          Nom: "Marie",
          Email: "marie@example.com",
          Message: "Bonjour <b>Andréas</b>",
          Vide: "  ",
        },
      },
      "https://andreas-mukonda.example",
    );
    expect(email.subject).toBe("Nouveau message de contact");
    expect(email.replyTo).toBe("marie@example.com");
    expect(email.text).toContain("Nom : Marie");
    expect(email.text).toContain("Message : Bonjour <b>Andréas</b>");
    expect(email.text).not.toContain("Vide :");
    expect(email.text).toContain("https://andreas-mukonda.example/admin/messages/abc");
    expect(email.html).toContain("Bonjour &lt;b&gt;Andréas&lt;/b&gt;");
    expect(email.html).not.toContain("<b>Andréas</b>");
  });

  it("omits invalid reply-to addresses", () => {
    const email = formatNotificationEmail({
      type: "contact",
      title: "Nouveau message de contact",
      body: "Test",
      replyTo: "not-an-email",
    });
    expect(email.replyTo).toBeUndefined();
  });

  it("posts to Resend with the visitor as reply-to", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    await sendResendEmail(
      config,
      {
        subject: "Nouveau message de contact",
        text: "Marie — Demande",
        html: "<p>Marie — Demande</p>",
        replyTo: "marie@example.com",
      },
      fetcher,
    );
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
    expect(JSON.parse(String(init.body))).toMatchObject({
      from: config.from,
      to: [config.to],
      subject: "Nouveau message de contact",
      reply_to: "marie@example.com",
    });
  });

  it("does not call Resend when no API key is configured", async () => {
    const fetcher = vi.fn();
    await expect(
      deliverNotification(
        { type: "contact", title: "Nouveau message de contact", body: "Marie" },
        { config: null, fetcher },
      ),
    ).resolves.toBe("logged");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("swallows provider failures so the form still succeeds", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("network"));
    await expect(
      deliverNotification(
        { type: "contact", title: "Nouveau message de contact", body: "Marie" },
        { config, fetcher },
      ),
    ).resolves.toBe("failed");
  });
});
