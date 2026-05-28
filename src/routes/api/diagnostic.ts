import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });

const SYSTEM_PROMPT = `You are a financial diagnostics advisor for InvestorMind Academy by VTEC Business Group. Analyze the user's financial situation based on their inputs and provide a clear, actionable diagnosis with 3-5 tailored recommendations. Keep the tone professional but accessible. End with a call-to-action encouraging them to explore InvestorMind Academy's e-books or courses. Be specific to Kenya's economic context (NSE, SACCOs, M-Pesa, Nairobi market) where relevant. Never be generic.`;

export const Route = createFileRoute("/api/diagnostic")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
    try {
      const body = await request.json();
      const { stage, industry, challenge, revenue, team, goal, name, email, whatsapp } = body ?? {};

      if (!name || !email) {
        return json({ error: "Missing name or email" }, { status: 400 });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      const resendKey = process.env.RESEND_API_KEY;

      if (!geminiKey) {
        console.error("GEMINI_API_KEY missing");
        return json({ error: "AI service not configured" }, { status: 500 });
      }

      const userPrompt = `Generate a diagnostic report for this entrepreneur:

Name: ${name}
Business Stage: ${stage}
Industry: ${industry}
Biggest Challenge: ${challenge}
Monthly Revenue: ${revenue}
Team Size: ${team}
12-Month Goal: ${goal}

Return ONLY a JSON object with exactly these fields:
{
  "healthScore": (number 0-100),
  "profileSummary": (2-3 sentence paragraph),
  "criticalGap": (1 paragraph, specific and honest),
  "actionSteps": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"],
  "roadmap": {
    "month1": "...",
    "month2": "...",
    "month3": "..."
  },
  "vtecRecommendation": {
    "service": "InvestorMind Academy",
    "reason": "1-2 sentences inviting them to explore InvestorMind Academy's e-books or courses, tailored to their situation",
    "ctaText": "Explore InvestorMind Academy"
  }
}`;

      const aiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        },
      );

      if (!aiRes.ok) {
        const errorText = await aiRes.text();
        console.error("Gemini API error", aiRes.status, errorText);
        return json({ error: "AI service error" }, { status: 500 });
      }

      const aiData = await aiRes.json();
      const text = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.error("Empty Gemini response", JSON.stringify(aiData));
        return json({ error: "Invalid AI response" }, { status: 500 });
      }

      let report;
      try {
        report = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse Gemini JSON:", text);
        return json({ error: "Invalid AI response format" }, { status: 500 });
      }

      // Fire-and-forget emails (don't block response if Resend fails)
      if (resendKey) {
        sendEmails({ report, name, email, whatsapp, stage, industry, challenge, revenue, team, goal }, resendKey).catch(
          (err) => console.error("Email send failed:", err),
        );
      } else {
        console.warn("RESEND_API_KEY missing — skipping email send");
      }

      return json({ report });
    } catch (err) {
      console.error("Diagnostic error:", err);
      return json({ error: "Failed to generate report" }, { status: 500 });
    }
      },
    },
  },
});


async function sendEmails(
  payload: {
    report: any;
    name: string;
    email: string;
    whatsapp?: string;
    stage?: string;
    industry?: string;
    challenge?: string;
    revenue?: string;
    team?: string;
    goal?: string;
  },
  resendKey: string,
) {
  const { report, name, email, whatsapp, stage, industry, challenge, revenue, team, goal } = payload;

  const userHtml = buildUserEmail(name, report);
  const adminHtml = buildAdminEmail({ name, email, whatsapp, stage, industry, challenge, revenue, team, goal, report });

  await Promise.all([
    sendEmail(resendKey, {
      from: "InvestorMind Academy <noreply@vtecgroup.co.ke>",
      to: [email],
      subject: "Your Free Financial Diagnosis – InvestorMind Academy",
      html: userHtml,
    }),
    sendEmail(resendKey, {
      from: "VTEC Diagnostic <noreply@vtecgroup.co.ke>",
      to: ["vtecgroup@outlook.com"],
      subject: `New Diagnostic Submission – ${name}`,
      html: adminHtml,
    }),
  ]);
}

async function sendEmail(
  apiKey: string,
  body: { from: string; to: string[]; subject: string; html: string },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error("Resend error", res.status, txt);
  }
}

function esc(s: any): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildUserEmail(name: string, r: any): string {
  const steps = Array.isArray(r?.actionSteps)
    ? r.actionSteps.map((s: string) => `<li style="margin-bottom:8px;">${esc(s)}</li>`).join("")
    : "";
  const rm = r?.roadmap ?? {};
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0A1628;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,40,0.08);">
        <tr><td style="background:#0A1628;color:#fff;padding:28px 32px;">
          <div style="font-size:12px;letter-spacing:2px;color:#00C896;font-weight:700;">INVESTORMIND ACADEMY</div>
          <div style="font-size:24px;font-weight:800;margin-top:6px;">Your Free Financial Diagnosis</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="font-size:16px;margin:0 0 16px;">Hi ${esc(name)},</p>
          <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 20px;">Thank you for using our free Financial Diagnostic Tool. Here is your personalised report.</p>

          <div style="background:#0A1628;color:#fff;padding:18px 22px;border-radius:10px;margin-bottom:22px;">
            <div style="font-size:12px;color:#00C896;letter-spacing:1.5px;font-weight:700;">BUSINESS HEALTH SCORE</div>
            <div style="font-size:42px;font-weight:800;line-height:1;margin-top:6px;">${esc(r?.healthScore ?? "—")}<span style="font-size:18px;color:#94a3b8;">/100</span></div>
          </div>

          <h3 style="font-size:16px;margin:18px 0 8px;color:#0A1628;">Profile Summary</h3>
          <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 18px;">${esc(r?.profileSummary)}</p>

          <h3 style="font-size:16px;margin:18px 0 8px;color:#0A1628;">Critical Gap</h3>
          <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 18px;">${esc(r?.criticalGap)}</p>

          <h3 style="font-size:16px;margin:18px 0 8px;color:#0A1628;">Tailored Recommendations</h3>
          <ol style="font-size:14px;line-height:1.6;color:#374151;padding-left:20px;margin:0 0 18px;">${steps}</ol>

          <h3 style="font-size:16px;margin:18px 0 8px;color:#0A1628;">90-Day Roadmap</h3>
          <ul style="font-size:14px;line-height:1.6;color:#374151;padding-left:20px;margin:0 0 22px;">
            <li><strong>Month 1:</strong> ${esc(rm.month1)}</li>
            <li><strong>Month 2:</strong> ${esc(rm.month2)}</li>
            <li><strong>Month 3:</strong> ${esc(rm.month3)}</li>
          </ul>

          <div style="background:linear-gradient(135deg,#00C896,#27AE60);padding:22px;border-radius:10px;text-align:center;">
            <div style="color:#04221A;font-size:13px;font-weight:700;letter-spacing:1px;">RECOMMENDED NEXT STEP</div>
            <p style="color:#04221A;font-size:15px;line-height:1.5;margin:10px 0 16px;">${esc(r?.vtecRecommendation?.reason)}</p>
            <a href="https://vtecgroup.co.ke" style="display:inline-block;background:#0A1628;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;font-size:14px;">${esc(r?.vtecRecommendation?.ctaText ?? "Explore InvestorMind Academy")}</a>
          </div>
        </td></tr>
        <tr><td style="background:#0A1628;color:#94a3b8;padding:20px 32px;font-size:12px;line-height:1.6;text-align:center;">
          <div style="color:#fff;font-weight:700;letter-spacing:1px;">VTEC BUSINESS GROUP</div>
          <div style="margin-top:6px;">Building Africa's next generation of investors and entrepreneurs.</div>
          <div style="margin-top:8px;"><a href="https://vtecgroup.co.ke" style="color:#00C896;text-decoration:none;">vtecgroup.co.ke</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

function buildAdminEmail(d: any): string {
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0A1628;padding:20px;">
    <h2>New Diagnostic Submission</h2>
    <p><strong>Name:</strong> ${esc(d.name)}<br>
       <strong>Email:</strong> ${esc(d.email)}<br>
       <strong>WhatsApp:</strong> ${esc(d.whatsapp)}</p>
    <h3>Submitted Data</h3>
    <ul>
      <li><strong>Stage:</strong> ${esc(d.stage)}</li>
      <li><strong>Industry:</strong> ${esc(d.industry)}</li>
      <li><strong>Challenge:</strong> ${esc(d.challenge)}</li>
      <li><strong>Monthly Revenue:</strong> ${esc(d.revenue)}</li>
      <li><strong>Team Size:</strong> ${esc(d.team)}</li>
      <li><strong>12-Month Goal:</strong> ${esc(d.goal)}</li>
    </ul>
    <h3>AI Report</h3>
    <pre style="background:#f5f7fb;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:12px;">${esc(JSON.stringify(d.report, null, 2))}</pre>
  </body></html>`;
}
