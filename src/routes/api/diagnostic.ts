import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/diagnostic")({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { stage, industry, challenge, revenue, team, goal, name } = body;

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return json({ error: "API key not configured" }, { status: 500 });
      }

      const prompt = `You are a senior business strategist at VTEC Business Group, a Nairobi-based holding company. You specialise in the Kenyan SME market. Write in clear, confident, direct English — no fluff, no jargon. Be specific to Kenya's economic context (NSE, SACCOs, M-Pesa, Nairobi market, etc.). Never be generic.

Generate a business diagnostic report for the following profile:

Business Stage: ${stage}
Industry: ${industry}
Biggest Challenge: ${challenge}
Monthly Revenue: ${revenue}
Team Size: ${team}
12-Month Goal: ${goal}
Name: ${name}

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

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Anthropic API error:", errorText);
        return json({ error: "AI service error" }, { status: 500 });
      }

      const data = await response.json();
      const text = data.content
        .map((item: { type: string; text?: string }) =>
          item.type === "text" ? item.text || "" : ""
        )
        .join("");

      const clean = text.replace(/```json|```/g, "").trim();
      const report = JSON.parse(clean);

      return json(report);
    } catch (err) {
      console.error("Diagnostic error:", err);
      return json({ error: "Failed to generate report" }, { status: 500 });
    }
  },
});
