// src/routes/api/partnership.ts
// Receives the partnership onboarding form (multipart) and emails it to
// partnerships@vtecgroup.co.ke through Resend, with the passport photo attached.
//
// Needs the RESEND_API_KEY secret (the same one your ChatBot email route uses).
// Optional: RESEND_FROM, e.g. "VTEC Partnerships <partnerships@vtecgroup.co.ke>"
// (the sender domain must be verified in Resend, as it already is for the chatbot).

import { createFileRoute } from "@tanstack/react-router";

const TO = "partnerships@vtecgroup.co.ke";
const DEFAULT_FROM = "VTEC Partnerships <partnerships@vtecgroup.co.ke>";
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Payload = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  age: string;
  status: string;
  organisation: string;
  industry: string;
  experience: string;
  link: string;
  tracks: string[];
  arms: string[];
  contribution: string;
  vision: string;
  hours: string;
  heardFrom: string;
  website?: string; // honeypot
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[c];
  });

const clean = (s: unknown, max = 2000) => String(s ?? "").trim().slice(0, max);

function ageBand(age: number) {
  if (age <= 24) return "18–24";
  if (age <= 30) return "25–30";
  if (age <= 35) return "31–35";
  return "36+";
}

function makeRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "VTEC-P-" + Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

function toBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function readEnv(name: string): Promise<string | undefined> {
  const fromProcess = (globalThis as any).process?.env?.[name];
  if (fromProcess) return fromProcess;
  try {
    // @ts-ignore - only resolvable inside the Cloudflare Workers runtime
    const mod = await import("cloudflare:workers");
    return (mod as any).env?.[name];
  } catch {
    return undefined;
  }
}

function normPhone(p: string) {
  const d = p.replace(/\D/g, "");
  if (d.startsWith("0")) return "254" + d.slice(1);
  return d.length === 9 ? "254" + d : d;
}

// Duplicate guard. Needs a Workers KV namespace bound as PARTNERS_KV (see wrangler.jsonc).
async function readKV(): Promise<any | null> {
  try {
    // @ts-ignore - only resolvable inside the Cloudflare Workers runtime
    const mod = await import("cloudflare:workers");
    return (mod as any).env?.PARTNERS_KV ?? null;
  } catch {
    return null;
  }
}

function validate(d: Payload): string | null {
  if (clean(d.fullName).length < 3) return "Full name is required.";
  if (!/^\+?[0-9\s-]{9,16}$/.test(clean(d.phone))) return "Phone number looks invalid.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean(d.email))) return "Email address looks invalid.";
  if (clean(d.location).length < 2) return "Location is required.";
  const age = Number(d.age);
  if (!Number.isFinite(age) || age < 18 || age > 80) return "Applicants must be 18 or older.";
  if (!Array.isArray(d.tracks) || d.tracks.length === 0) return "Choose at least one partnership type.";
  if (!Array.isArray(d.arms) || d.arms.length === 0) return "Choose at least one VTEC arm.";
  if (clean(d.contribution).length < 20 || clean(d.vision).length < 20) return "Please complete the written answers.";
  return null;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #e6ecf5;color:#4a5568;font-size:13px;width:34%;vertical-align:top">${esc(label)}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #e6ecf5;color:#0D2149;font-size:14px;font-weight:600;vertical-align:top;white-space:pre-wrap">${value || "—"}</td>
  </tr>`;
}

function buildHtml(d: Payload, ref: string, band: string) {
  const list = (a: string[]) => esc(a.join(", "));
  return `<!doctype html><html><body style="margin:0;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
    <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #dbe3f0">
      <tr><td style="background:#0D2149;padding:26px 28px">
        <div style="color:#27ae60;font-size:12px;letter-spacing:2px">VTEC BUSINESS GROUP</div>
        <div style="color:#fff;font-size:22px;font-weight:700;margin-top:6px">New partnership application</div>
        <div style="color:#f0d580;font-size:13px;margin-top:6px">Reference ${esc(ref)}</div>
      </td></tr>
      <tr><td style="padding:8px 14px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Full name", esc(d.fullName))}
          ${row("Phone", esc(d.phone))}
          ${row("Email", esc(d.email))}
          ${row("Location", esc(d.location))}
          ${row("Age", `${esc(d.age)} (${band})`)}
          ${row("Current status", esc(d.status))}
          ${row("Organisation", esc(d.organisation))}
          ${row("Industry", esc(d.industry))}
          ${row("Experience", esc(d.experience))}
          ${row("Link", esc(d.link))}
          ${row("Partnership types", list(d.tracks))}
          ${row("VTEC arms of interest", list(d.arms))}
          ${row("Weekly availability", esc(d.hours))}
          ${row("Heard about VTEC via", esc(d.heardFrom))}
          ${row("What they bring", esc(d.contribution))}
          ${row("Why VTEC and their vision", esc(d.vision))}
        </table>
      </td></tr>
      <tr><td style="padding:18px 28px 26px;color:#4a5568;font-size:12px;line-height:1.6">
        Passport photo is attached. Reply to this email to reach the applicant directly.
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

function buildText(d: Payload, ref: string, band: string) {
  return [
    `New partnership application — ${ref}`,
    "",
    `Full name: ${d.fullName}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Location: ${d.location}`,
    `Age: ${d.age} (${band})`,
    `Status: ${d.status}`,
    `Organisation: ${d.organisation || "—"}`,
    `Industry: ${d.industry}`,
    `Experience: ${d.experience}`,
    `Link: ${d.link || "—"}`,
    `Partnership types: ${d.tracks.join(", ")}`,
    `VTEC arms: ${d.arms.join(", ")}`,
    `Availability: ${d.hours}`,
    `Heard via: ${d.heardFrom || "—"}`,
    "",
    `What they bring:\n${d.contribution}`,
    "",
    `Why VTEC / vision:\n${d.vision}`,
  ].join("\n");
}

export const Route = createFileRoute("/api/partnership")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const raw = form.get("payload");
          if (typeof raw !== "string") return json({ ok: false, error: "Missing form data." }, 400);

          let parsed: Payload;
          try {
            parsed = JSON.parse(raw);
          } catch {
            return json({ ok: false, error: "Form data could not be read." }, 400);
          }

          // Honeypot: bots fill hidden fields. Pretend success, send nothing.
          if (parsed.website) return json({ ok: true, ref: "VTEC-P-000000" });

          const d: Payload = {
            fullName: clean(parsed.fullName, 120),
            phone: clean(parsed.phone, 30),
            email: clean(parsed.email, 160),
            location: clean(parsed.location, 120),
            age: clean(parsed.age, 3),
            status: clean(parsed.status, 80),
            organisation: clean(parsed.organisation, 160),
            industry: clean(parsed.industry, 80),
            experience: clean(parsed.experience, 40),
            link: clean(parsed.link, 240),
            tracks: (Array.isArray(parsed.tracks) ? parsed.tracks : []).slice(0, 10).map((x) => clean(x, 80)),
            arms: (Array.isArray(parsed.arms) ? parsed.arms : []).slice(0, 10).map((x) => clean(x, 80)),
            contribution: clean(parsed.contribution, 1500),
            vision: clean(parsed.vision, 1500),
            hours: clean(parsed.hours, 40),
            heardFrom: clean(parsed.heardFrom, 60),
          };

          const problem = validate(d);
          if (problem) return json({ ok: false, error: problem }, 422);

          const photo = form.get("photo");
          if (!(photo instanceof File) || photo.size === 0) {
            return json({ ok: false, error: "A passport photo is required." }, 422);
          }
          if (!PHOTO_TYPES.includes(photo.type)) {
            return json({ ok: false, error: "Photo must be a JPG, PNG or WebP image." }, 422);
          }
          if (photo.size > MAX_PHOTO_BYTES) {
            return json({ ok: false, error: "Photo is too large. Use an image under 4 MB." }, 422);
          }

          const apiKey = await readEnv("RESEND_API_KEY");
          if (!apiKey) {
            console.error("[partnership] RESEND_API_KEY is not configured");
            return json({ ok: false, error: "Email service is not configured." }, 500);
          }
          const from = (await readEnv("RESEND_FROM")) || DEFAULT_FROM;

          const kv = await readKV();
          const emailKey = `email:${d.email.toLowerCase()}`;
          const phoneKey = `phone:${normPhone(d.phone)}`;
          if (kv) {
            const [a, b] = await Promise.all([kv.get(emailKey), kv.get(phoneKey)]);
            if (a || b) {
              return json({ ok: false, error: "An application with this email address or phone number has already been received. Our team will be in touch." }, 409);
            }
          } else {
            console.warn("[partnership] PARTNERS_KV is not bound; duplicate check skipped");
          }

          const ref = makeRef();
          const band = ageBand(Number(d.age));
          const slug = d.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "applicant";
          const ext = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: [TO],
              reply_to: d.email,
              subject: `New partnership application: ${d.fullName} (${ref})`,
              html: buildHtml(d, ref, band),
              text: buildText(d, ref, band),
              attachments: [{ filename: `${slug}-passport.${ext}`, content: toBase64(await photo.arrayBuffer()) }],
            }),
          });

          if (!res.ok) {
            console.error("[partnership] Resend error", res.status, await res.text());
            return json({ ok: false, error: "We couldn't deliver your application. Please try again." }, 502);
          }

          if (kv) {
            const rec = JSON.stringify({ ref, at: new Date().toISOString() });
            await Promise.all([kv.put(emailKey, rec), kv.put(phoneKey, rec)]);
          }

          return json({ ok: true, ref });
        } catch (err) {
          console.error("[partnership] unexpected error", err);
          return json({ ok: false, error: "Something went wrong on our side. Please try again." }, 500);
        }
      },
    },
  },
});
