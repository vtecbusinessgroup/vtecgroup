import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);

type ChatMessage = { role: "user" | "assistant"; content: string; timestamp?: number };

const TEAL = "#0D3B38";
const NAVY = "#0A1628";
const GOLD = "#D4AF37";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatTime(ts?: number): string {
  if (!ts) return "";
  try {
    return new Date(ts).toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Nairobi",
    });
  } catch {
    return "";
  }
}

function buildTranscriptEmail(messages: ChatMessage[]): string {
  const rows = messages
    .map((m) => {
      const isUser = m.role === "user";
      return `<tr><td style="padding:10px 0;">
        <div style="font-size:11px;font-weight:700;letter-spacing:.5px;color:${isUser ? NAVY : TEAL};text-transform:uppercase;margin-bottom:3px;">
          ${isUser ? "You" : "VTEC Assistant"}${m.timestamp ? ` &middot; ${esc(formatTime(m.timestamp))}` : ""}
        </div>
        <div style="font-size:14px;line-height:1.55;color:#374151;background:${isUser ? "#f4f6fa" : "rgba(13,59,56,0.06)"};border-radius:10px;padding:10px 14px;display:inline-block;max-width:100%;">
          ${esc(m.content).replace(/\n/g, "<br/>")}
        </div>
      </td></tr>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:${NAVY};">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:24px 12px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,40,0.08);">
          <tr><td style="background:${NAVY};padding:26px 28px;border-bottom:3px solid ${GOLD};">
            <div style="font-size:12px;letter-spacing:2px;color:${GOLD};font-weight:700;">VTEC BUSINESS GROUP</div>
            <h1 style="margin:6px 0 0;font-size:21px;color:#fff;">Your Conversation Transcript</h1>
          </td></tr>
          <tr><td style="padding:24px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            <div style="text-align:center;margin:26px 0 6px;">
              <a href="https://vtecgroup.co.ke" style="display:inline-block;background:${TEAL};color:#fff;text-decoration:none;font-weight:700;padding:13px 24px;border-radius:10px;">Visit vtecgroup.co.ke</a>
            </div>
          </td></tr>
          <tr><td style="background:${NAVY};color:#fff;padding:18px;text-align:center;font-size:12px;">
            <div style="opacity:.85;">VTEC Business Group &middot; Nairobi, Kenya</div>
            <div style="margin-top:6px;">info@vtecgroup.co.ke &middot; WhatsApp +254 116 644204</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export const Route = createFileRoute("/api/chat-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { email?: string; messages?: ChatMessage[] };
          const email = (body.email ?? "").trim();
          const messages = Array.isArray(body.messages) ? body.messages.slice(-100) : [];

          if (!email || !/.+@.+\..+/.test(email)) {
            return json({ error: "Valid email required" }, { status: 400 });
          }
          if (!messages.length) {
            return json({ error: "No conversation to send" }, { status: 400 });
          }

          const resendKey = process.env.RESEND_API_KEY;
          if (!resendKey) {
            console.error("RESEND_API_KEY missing");
            return json({ error: "Email service not configured" }, { status: 500 });
          }

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "VTEC Business Group <report@vtecgroup.co.ke>",
              reply_to: "hello@vtecgroup.co.ke",
              to: [email],
              subject: "Your VTEC Assistant Conversation",
              html: buildTranscriptEmail(messages),
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error("Resend transcript send failed", res.status, errText);
            return json({ error: "Failed to send email" }, { status: 502 });
          }

          return json({ ok: true });
        } catch (err) {
          console.error("Chat email route error", err);
          return json({ error: "Failed to send transcript" }, { status: 500 });
        }
      },
    },
  },
});