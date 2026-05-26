import { createFileRoute } from "@tanstack/react-router";

type Answers = {
  stage: string;
  industry: string;
  challenge: string;
  revenue: string;
  team: string;
  goal: string;
  name: string;
  email: string;
  whatsapp: string;
};

type Report = {
  healthScore: number;
  profileSummary: string;
  criticalGap: string;
  actionSteps: string[];
  roadmap: { month1: string; month2: string; month3: string };
  vtecRecommendation: { service: string; reason: string; ctaText: string };
};

const SYSTEM_PROMPT = `You are a senior business strategist at VTEC Business Group, a Nairobi based holding company. You specialise in the Kenyan SME market. Write in clear, confident, direct English. No fluff, no jargon. Be specific to Kenya's economic context (NSE, SACCOs, M Pesa, Nairobi market, county economies, KRA, etc.). Never be generic.`;

function buildUserPrompt(a: Answers) {
  return `Generate a business diagnostic report for the following profile:

Business Stage: ${a.stage}
Industry: ${a.industry}
Biggest Challenge: ${a.challenge}
Monthly Revenue: ${a.revenue}
Team Size: ${a.team}
12 Month Goal: ${a.goal}
Name: ${a.name}

Return a JSON object with exactly these fields:
{
  "healthScore": (number 0-100),
  "profileSummary": (2-3 sentence paragraph),
  "criticalGap": (1 paragraph, specific and honest),
  "actionSteps": ["step 1", "step 2", "step 3"],
  "roadmap": {
    "month1": "...",
    "month2": "...",
    "month3": "..."
  },
  "vtecRecommendation": {
    "service": "InvestorMind Academy | VTEC Consultancy | Both",
    "reason": "1-2 sentences why this fits them specifically",
    "ctaText": "compelling CTA button text"
  }
}

Return ONLY the JSON. No preamble, no markdown backticks.`;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const NAVY = "#0A1628";
const TEAL = "#00C896";
const GREEN = "#1B5E20";
const LOGO_URL = "https://vtecgroup.lovable.app/vtec-logo.png";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildReportEmailHTML(name: string, report: Report): string {
  const firstName = name.split(/\s+/)[0] || name;
  const steps = report.actionSteps
    .map((s) => `<li style="margin:0 0 10px;line-height:1.55;color:#1f2937;">${esc(s)}</li>`)
    .join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,40,0.08);">
        <tr><td style="background:${NAVY};padding:28px 24px;text-align:center;">
          <img src="${LOGO_URL}" alt="VTEC Business Group" width="120" style="display:inline-block;max-width:120px;height:auto;background:#ffffff;padding:8px 12px;border-radius:8px;">
          <div style="color:${TEAL};font-size:12px;letter-spacing:2px;margin-top:14px;font-weight:700;">YOUR BUSINESS DIAGNOSTIC REPORT</div>
        </td></tr>
        <tr><td style="padding:32px 28px 8px;">
          <h1 style="margin:0 0 8px;font-size:24px;color:${NAVY};">Hi ${esc(firstName)}, your business diagnosis is ready.</h1>
          <p style="margin:0 0 24px;color:#4b5563;line-height:1.55;font-size:15px;">${esc(report.profileSummary)}</p>

          <div style="text-align:center;margin:8px 0 28px;">
            <div style="display:inline-block;background:${TEAL};color:${NAVY};padding:18px 28px;border-radius:14px;font-weight:800;">
              <div style="font-size:12px;letter-spacing:2px;opacity:0.85;">HEALTH SCORE</div>
              <div style="font-size:42px;line-height:1;margin-top:6px;">${Number(report.healthScore) || 0}<span style="font-size:18px;opacity:0.8;">/100</span></div>
            </div>
          </div>

          <h2 style="margin:24px 0 10px;color:${NAVY};font-size:18px;border-left:4px solid ${TEAL};padding-left:10px;">Your Critical Gap</h2>
          <p style="margin:0 0 24px;color:#374151;line-height:1.6;font-size:15px;">${esc(report.criticalGap)}</p>

          <h2 style="margin:24px 0 10px;color:${NAVY};font-size:18px;border-left:4px solid ${TEAL};padding-left:10px;">Your 3 Action Steps</h2>
          <ol style="padding-left:22px;margin:0 0 24px;">${steps}</ol>

          <h2 style="margin:24px 0 12px;color:${NAVY};font-size:18px;border-left:4px solid ${TEAL};padding-left:10px;">Your 90 Day Roadmap</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
            <tr><td style="background:#f0fdf6;border:1px solid ${TEAL};border-radius:10px;padding:14px 16px;margin-bottom:8px;">
              <div style="color:${GREEN};font-weight:800;font-size:13px;letter-spacing:1px;">MONTH 1</div>
              <div style="color:#1f2937;margin-top:4px;line-height:1.5;">${esc(report.roadmap.month1)}</div>
            </td></tr>
            <tr><td style="height:8px;"></td></tr>
            <tr><td style="background:#f0fdf6;border:1px solid ${TEAL};border-radius:10px;padding:14px 16px;">
              <div style="color:${GREEN};font-weight:800;font-size:13px;letter-spacing:1px;">MONTH 2</div>
              <div style="color:#1f2937;margin-top:4px;line-height:1.5;">${esc(report.roadmap.month2)}</div>
            </td></tr>
            <tr><td style="height:8px;"></td></tr>
            <tr><td style="background:#f0fdf6;border:1px solid ${TEAL};border-radius:10px;padding:14px 16px;">
              <div style="color:${GREEN};font-weight:800;font-size:13px;letter-spacing:1px;">MONTH 3</div>
              <div style="color:#1f2937;margin-top:4px;line-height:1.5;">${esc(report.roadmap.month3)}</div>
            </td></tr>
          </table>

          <div style="background:${NAVY};color:#ffffff;border-radius:12px;padding:22px;margin:8px 0 4px;">
            <div style="color:${TEAL};font-size:12px;letter-spacing:2px;font-weight:700;">VTEC RECOMMENDATION</div>
            <div style="font-size:18px;font-weight:700;margin:6px 0 8px;">${esc(report.vtecRecommendation.service)}</div>
            <p style="margin:0 0 18px;color:#cbd5e1;line-height:1.55;font-size:14px;">${esc(report.vtecRecommendation.reason)}</p>
            <a href="https://vtecgroup.co.ke/contact" style="display:inline-block;background:${TEAL};color:${NAVY};text-decoration:none;font-weight:800;padding:14px 24px;border-radius:10px;">${esc(report.vtecRecommendation.ctaText)} →</a>
          </div>
        </td></tr>
        <tr><td style="padding:24px;text-align:center;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb;">
          VTEC Business Group &nbsp;|&nbsp; Nairobi, Kenya &nbsp;|&nbsp; <a href="https://vtecgroup.co.ke" style="color:#6b7280;text-decoration:none;">vtecgroup.co.ke</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildLeadEmailHTML(a: Answers, report: Report): string {
  return `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:24px;color:#1f2937;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <tr><td style="background:${NAVY};color:#ffffff;padding:18px 22px;">
      <div style="color:${TEAL};font-size:11px;letter-spacing:2px;font-weight:700;">NEW DIAGNOSTIC LEAD</div>
      <div style="font-size:18px;font-weight:700;margin-top:4px;">${esc(a.name)}</div>
    </td></tr>
    <tr><td style="padding:20px 22px;">
      <table role="presentation" width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
        <tr><td style="color:#6b7280;width:140px;">Email</td><td><a href="mailto:${esc(a.email)}" style="color:${NAVY};">${esc(a.email)}</a></td></tr>
        <tr><td style="color:#6b7280;">WhatsApp</td><td>${esc(a.whatsapp || "(not provided)")}</td></tr>
        <tr><td style="color:#6b7280;">Business Stage</td><td>${esc(a.stage)}</td></tr>
        <tr><td style="color:#6b7280;">Industry</td><td>${esc(a.industry)}</td></tr>
        <tr><td style="color:#6b7280;">Challenge</td><td>${esc(a.challenge)}</td></tr>
        <tr><td style="color:#6b7280;">Revenue</td><td>${esc(a.revenue)}</td></tr>
        <tr><td style="color:#6b7280;">Team</td><td>${esc(a.team)}</td></tr>
        <tr><td style="color:#6b7280;">12 Month Goal</td><td>${esc(a.goal || "(not provided)")}</td></tr>
        <tr><td style="color:#6b7280;">Health Score</td><td><strong>${Number(report.healthScore) || 0}/100</strong></td></tr>
        <tr><td style="color:#6b7280;vertical-align:top;">Recommended</td><td>${esc(report.vtecRecommendation.service)}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendResendEmail(args: {
  apiKey: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      from: "VTEC Business Group <info@vtecgroup.co.ke>",
      to: [args.to],
      subject: args.subject,
      html: args.html,
      reply_to: args.replyTo,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error", res.status, text);
  }
}

export const Route = createFileRoute("/api/diagnostic")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Partial<Answers>;
          const required: (keyof Answers)[] = [
            "stage",
            "industry",
            "challenge",
            "revenue",
            "team",
            "name",
            "email",
          ];
          for (const k of required) {
            if (!body[k] || typeof body[k] !== "string") {
              return new Response(
                JSON.stringify({ error: `Missing field: ${k}` }),
                { status: 400, headers: { "Content-Type": "application/json", ...CORS } },
              );
            }
          }
          const answers: Answers = {
            stage: body.stage!,
            industry: body.industry!,
            challenge: body.challenge!,
            revenue: body.revenue!,
            team: body.team!,
            goal: (body.goal ?? "").toString().slice(0, 600),
            name: body.name!.toString().slice(0, 120),
            email: body.email!.toString().slice(0, 200),
            whatsapp: (body.whatsapp ?? "").toString().slice(0, 60),
          };

          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(
              JSON.stringify({ error: "AI service not configured" }),
              { status: 500, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": key,
              "X-Lovable-AIG-SDK": "raw-fetch",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: buildUserPrompt(answers) },
              ],
              response_format: { type: "json_object" },
            }),
          });

          if (!aiRes.ok) {
            const text = await aiRes.text();
            console.error("AI gateway error", aiRes.status, text);
            const status = aiRes.status === 429 ? 429 : aiRes.status === 402 ? 402 : 502;
            return new Response(
              JSON.stringify({
                error:
                  status === 429
                    ? "Too many requests. Please try again shortly."
                    : status === 402
                      ? "AI credits exhausted. Please contact VTEC."
                      : "AI service unavailable",
              }),
              { status, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          const data = (await aiRes.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const raw = data.choices?.[0]?.message?.content ?? "";
          const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

          let parsed: Report;
          try {
            parsed = JSON.parse(cleaned) as Report;
          } catch {
            console.error("Failed to parse AI JSON:", cleaned);
            return new Response(
              JSON.stringify({ error: "Could not parse AI response" }),
              { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
            );
          }

          // Fire and forget emails (do not block report delivery if email fails)
          const resendKey = process.env.RESEND_API_KEY;
          if (resendKey) {
            const firstName = answers.name.split(/\s+/)[0] || answers.name;
            try {
              await Promise.allSettled([
                sendResendEmail({
                  apiKey: resendKey,
                  to: answers.email,
                  subject: `Your VTEC Business Diagnostic Report is Ready — ${firstName}`,
                  html: buildReportEmailHTML(answers.name, parsed),
                  replyTo: "info@vtecgroup.co.ke",
                }),
                sendResendEmail({
                  apiKey: resendKey,
                  to: "info@vtecgroup.co.ke",
                  subject: `New Diagnostic Lead: ${answers.name} (${answers.industry})`,
                  html: buildLeadEmailHTML(answers, parsed),
                  replyTo: answers.email,
                }),
              ]);
            } catch (e) {
              console.error("Email send error", e);
            }
          } else {
            console.warn("RESEND_API_KEY not configured; skipping emails");
          }

          return new Response(JSON.stringify({ report: parsed }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        } catch (err) {
          console.error("Diagnostic route failure", err);
          return new Response(
            JSON.stringify({ error: "Internal error" }),
            { status: 500, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }
      },
    },
  },
});
