import { createFileRoute } from "@tanstack/react-router";

type Answers = {
  stage: string;
  industry: string;
  challenge: string;
  revenue: string;
  team: string;
  goal: string;
  name: string;
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

          let parsed: unknown;
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            console.error("Failed to parse AI JSON:", cleaned);
            return new Response(
              JSON.stringify({ error: "Could not parse AI response" }),
              { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
            );
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
