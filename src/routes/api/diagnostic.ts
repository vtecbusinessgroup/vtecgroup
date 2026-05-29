import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);


type Report = {
  healthScore: number;
  profileSummary: string;
  criticalGap: string;
  actionSteps: string[];
  roadmap: { month1: string; month2: string; month3: string };
  vtecRecommendation: { service: string; reason: string; ctaText: string };
};

const SYSTEM_INSTRUCTION =
  "You are a financial diagnostics advisor for InvestorMind Academy by VTEC Business Group. " +
  "Analyze the user's financial and business situation based on their inputs and provide a clear, " +
  "actionable diagnosis with 3 to 5 tailored recommendations. Keep the tone professional but " +
  "accessible. Be specific to Kenya's economic context (NSE, SACCOs, M-Pesa, Nairobi market). " +
  "End with a call to action encouraging the user to explore InvestorMind Academy's e-books or courses.";
export const Route = createFileRoute("/api/diagnostic")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, string>;
          const {
            stage = "",
            industry = "",
            challenge = "",
            revenue = "",
            team = "",
            goal = "",
            name = "",
            email = "",
            whatsapp = "",
          } = body;

          const geminiKey = process.env.GEMINI_API_KEY;
          if (!geminiKey) {
            console.error("GEMINI_API_KEY missing");
            return json({ error: "AI key not configured" }, { status: 500 });
          }

          const userPrompt = `Generate a personalised diagnostic report for the following Kenyan founder:

Name: ${name}
Business Stage: ${stage}
Industry: ${industry}
Biggest Challenge: ${challenge}
Monthly Revenue: ${revenue}
Team Size: ${team}
12 month Goal: ${goal}

Return ONLY a JSON object with exactly this shape:
{
  "healthScore": number 0-100,
  "profileSummary": "2-3 sentence paragraph",
  "criticalGap": "1 paragraph, specific and honest",
  "actionSteps": ["step 1", "step 2", "step 3"],
  "roadmap": { "month1": "...", "month2": "...", "month3": "..." },
  "vtecRecommendation": {
    "service": "InvestorMind Academy | VTEC Consultancy | Both",
    "reason": "1-2 sentences explaining why this fits them",
    "ctaText": "compelling CTA button text"
  }
}`;

          const aiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                contents: [{ role: "user", parts: [{ text: userPrompt }] }],
                generationConfig: { responseMimeType: "application/json" },
              }),
            },
          );

          if (!aiRes.ok) {
            const errText = await aiRes.text();
            console.error("Gemini error", aiRes.status, errText);
            return json({ error: "AI service error" }, { status: 502 });
          }

          const aiData = await aiRes.json();
          const text =
            aiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
            aiData?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ??
            "";
          if (!text) {
            console.error("Empty Gemini response", JSON.stringify(aiData).slice(0, 600));
            return json({ error: "Empty AI response" }, { status: 502 });
          }

          let report: Report;
          try {
            report = JSON.parse(text);
          } catch (e) {
            console.error("Failed to parse Gemini JSON", text.slice(0, 600));
            return json({ error: "Invalid AI response format" }, { status: 502 });
          }

          sendEmails({
            report,
            name,
            email,
            whatsapp,
            stage,
            industry,
            challenge,
            revenue,
            team,
            goal,
          }).catch((err) => console.error("Email send failed", err));

          return json({ report });
        } catch (err) {
          console.error("Diagnostic route error", err);
          return json({ error: "Failed to generate report" }, { status: 500 });
        }
      },
    },
  },
});


/* ---------------- Email ---------------- */

const TEAL = "#00C896";
const NAVY = "#0A1628";

async function sendEmails(input: {
  report: Report;
  name: string;
  email: string;
  whatsapp: string;
  stage: string;
  industry: string;
  challenge: string;
  revenue: string;
  team: string;
  goal: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY missing — skipping email delivery");
    return;
  }

  const tasks: Promise<unknown>[] = [];

  if (input.email && /.+@.+\..+/.test(input.email)) {
    tasks.push(
      resendSend(resendKey, {
        from: "InvestorMind Academy <noreply@vtecgroup.co.ke>",
        to: [input.email],
        subject: "Your Free Financial Diagnosis – InvestorMind Academy",
        html: buildReportEmail(input.name, input.report),
      }),
    );
  }

  tasks.push(
    resendSend(resendKey, {
      from: "VTEC Diagnostic <noreply@vtecgroup.co.ke>",
      to: ["vtecgroup@outlook.com"],
      subject: `New diagnostic lead – ${input.name || "Unknown"}`,
      html: buildLeadEmail(input),
    }),
  );

  await Promise.allSettled(tasks);
}

async function resendSend(
  apiKey: string,
  payload: { from: string; to: string[]; subject: string; html: string },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    console.error("Resend send failed", res.status, t);
  }
}

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildReportEmail(name: string, r: Report): string {
  const steps = r.actionSteps.map((s, i) => `<li style="margin:8px 0;">${esc(s)}</li>`).join("");
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif;color:#0A1628;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:24px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,40,0.08);">
        <tr><td style="background:${NAVY};padding:28px;text-align:center;color:#fff;">
          <div style="font-size:13px;letter-spacing:2px;color:${TEAL};font-weight:700;">INVESTORMIND ACADEMY</div>
          <h1 style="margin:8px 0 0;font-size:24px;">Your Free Financial Diagnosis</h1>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 14px;font-size:16px;">Hi ${esc(name) || "there"},</p>
          <p style="margin:0 0 22px;color:#4B5563;line-height:1.55;">Below is your personalised diagnosis from our advisor at InvestorMind Academy by VTEC Business Group.</p>

          <div style="background:${NAVY};color:#fff;padding:18px 22px;border-radius:12px;text-align:center;margin-bottom:22px;">
            <div style="font-size:12px;letter-spacing:1.5px;color:${TEAL};font-weight:700;">BUSINESS HEALTH SCORE</div>
            <div style="font-size:42px;font-weight:800;margin-top:4px;">${r.healthScore}<span style="font-size:18px;opacity:.75;"> / 100</span></div>
          </div>

          <h2 style="font-size:17px;margin:18px 0 8px;">Profile Summary</h2>
          <p style="margin:0 0 18px;color:#374151;line-height:1.6;">${esc(r.profileSummary)}</p>

          <h2 style="font-size:17px;margin:18px 0 8px;">Critical Gap</h2>
          <p style="margin:0 0 18px;color:#374151;line-height:1.6;">${esc(r.criticalGap)}</p>

          <h2 style="font-size:17px;margin:18px 0 8px;">3 Immediate Action Steps</h2>
          <ol style="margin:0 0 18px;padding-left:20px;color:#374151;line-height:1.55;">${steps}</ol>

          <h2 style="font-size:17px;margin:18px 0 8px;">90 Day Roadmap</h2>
          <div style="margin-bottom:18px;">
            <p style="margin:6px 0;color:#374151;"><strong style="color:${TEAL};">Month 1:</strong> ${esc(r.roadmap.month1)}</p>
            <p style="margin:6px 0;color:#374151;"><strong style="color:${TEAL};">Month 2:</strong> ${esc(r.roadmap.month2)}</p>
            <p style="margin:6px 0;color:#374151;"><strong style="color:${TEAL};">Month 3:</strong> ${esc(r.roadmap.month3)}</p>
          </div>

          <h2 style="font-size:17px;margin:18px 0 8px;">Our Recommendation</h2>
          <p style="margin:0 0 6px;color:${NAVY};font-weight:700;">${esc(r.vtecRecommendation.service)}</p>
          <p style="margin:0 0 22px;color:#374151;line-height:1.6;">${esc(r.vtecRecommendation.reason)}</p>

          <div style="text-align:center;margin:28px 0 8px;">
            <a href="https://vtecgroup.co.ke" style="display:inline-block;background:${TEAL};color:#04221A;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:10px;">Explore InvestorMind Academy →</a>
          </div>
        </td></tr>
        <tr><td style="background:#0A1628;color:#fff;padding:20px;text-align:center;font-size:12px;">
          <div style="opacity:.85;">VTEC Business Group · Nairobi, Kenya</div>
          <div style="margin-top:6px;"><a href="https://vtecgroup.co.ke" style="color:${TEAL};text-decoration:none;">vtecgroup.co.ke</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function buildLeadEmail(i: {
  report: Report;
  name: string;
  email: string;
  whatsapp: string;
  stage: string;
  industry: string;
  challenge: string;
  revenue: string;
  team: string;
  goal: string;
}): string {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0A1628;padding:20px;">
    <h2 style="margin:0 0 12px;">New Diagnostic Lead</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${esc(i.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(i.email)}</td></tr>
      <tr><td><strong>WhatsApp</strong></td><td>${esc(i.whatsapp)}</td></tr>
      <tr><td><strong>Stage</strong></td><td>${esc(i.stage)}</td></tr>
      <tr><td><strong>Industry</strong></td><td>${esc(i.industry)}</td></tr>
      <tr><td><strong>Challenge</strong></td><td>${esc(i.challenge)}</td></tr>
      <tr><td><strong>Revenue</strong></td><td>${esc(i.revenue)}</td></tr>
      <tr><td><strong>Team</strong></td><td>${esc(i.team)}</td></tr>
      <tr><td><strong>12-month Goal</strong></td><td>${esc(i.goal)}</td></tr>
      <tr><td><strong>Health Score</strong></td><td>${i.report.healthScore} / 100</td></tr>
    </table>
    <p style="margin-top:18px;font-size:13px;color:#4B5563;">Follow up via WhatsApp or email above.</p>
  </body></html>`;
}
