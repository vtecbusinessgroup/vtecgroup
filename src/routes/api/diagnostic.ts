import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/diagnostic")({
  GET: async () => {
    return json({ message: "Diagnostic API is ready" }, { status: 200 });
  },
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { stage, industry, challenge, revenue, team, goal, name } = body;

      // API Key embedded directly
      const apiKey = "AIzaSyDHi8kY5ywip8n6O-HQrjMR5uO9IjzqpUI";

      if (!apiKey) {
        console.error("ERROR: API key is missing");
        return json({ error: "API key not configured" }, { status: 500 });
      }

      const prompt = `You are a senior business strategist at VTEC Business Group, a Nairobi-based holding company. You specialise in the Kenyan SME market. Write in clear, confident, direct English.

Generate a business diagnostic report for the following profile:

Business Stage: ${stage}
Industry: ${industry}
Biggest Challenge: ${challenge}
Monthly Revenue: ${revenue}
Team Size: ${team}
12-Month Goal: ${goal}
Name: ${name}

Return ONLY a valid JSON object with exactly these fields (no markdown, no code blocks, just pure JSON):
{
  "healthScore": (number 0-100),
  "profileSummary": (2-3 sentence paragraph),
  "criticalGap": (1 paragraph, specific and honest),
  "actionSteps": ["step 1", "step 2", "step 3"],
  "roadmap": {
    "month1": "specific milestone",
    "month2": "specific milestone",
    "month3": "specific milestone"
  },
  "vtecRecommendation": {
    "service": "InvestorMind Academy | VTEC Consultancy | Both",
    "reason": "1-2 sentences why this fits them specifically",
    "ctaText": "compelling CTA button text"
  }
}`;

      console.log("Calling Gemini API with embedded key...");

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Gemini API error (Status ${response.status}):`,
          errorText
        );
        return json(
          { error: "AI service error", details: errorText },
          { status: 500 }
        );
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error("Gemini returned empty response");
        return json(
          { error: "Invalid AI response - no text returned" },
          { status: 500 }
        );
      }

      console.log("Raw text from Gemini:", text);

      const report = JSON.parse(text);
      console.log("Parsed report:", report);

      return json(report);
    } catch (err) {
      console.error("API Error:", err);
      return json(
        {
          error: "Failed to generate report",
          details: err instanceof Error ? err.message : String(err),
        },
        { status: 500 }
      );
    }
  },
});
