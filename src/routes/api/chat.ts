import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);

const SYSTEM_PROMPT =
  "You are VTEC Assistant, a helpful representative of VTEC Business Group, a Nairobi-based holding company. " +
  "You help visitors understand VTEC's services, recommend the right programme, and guide them toward booking a consultation. " +
  "Be warm, professional, and Kenya-market specific. Keep responses concise (under 120 words). " +
  "VTEC's services: InvestorMind Academy (financial literacy, NSE, SACCOs, MMFs), VTEC Consultancy Services (business strategy, branding, growth), MILIKI App (coming soon - wealth tracking). " +
  "Contact: info@vtecgroup.co.ke, WhatsApp +254116644204. For bookings, direct users to vtecgroup.co.ke/contact. " +
  "When a user expresses interest in booking or purchasing, ask for their name and WhatsApp number and tell them the team will reach out within 24 hours.";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            message?: string;
            history?: ChatMessage[];
            lang?: "en" | "sw";
          };
          const message = (body.message ?? "").toString().slice(0, 2000);
          const history = Array.isArray(body.history) ? body.history.slice(-20) : [];
          const lang = body.lang === "sw" ? "sw" : "en";

          if (!message.trim()) {
            return json({ error: "Empty message" }, { status: 400 });
          }

          const geminiKey = process.env.GEMINI_API_KEY;
          if (!geminiKey) {
            console.error("GEMINI_API_KEY missing");
            return json({ error: "AI key not configured" }, { status: 500 });
          }

          const languageInstruction =
            lang === "sw"
              ? " Respond in Swahili (Kiswahili), naturally and fluently, unless the user writes in English, in which case you may reply in English for that message."
              : " Respond in English.";

          const contents = [
            ...history.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: String(m.content ?? "").slice(0, 4000) }],
            })),
            { role: "user", parts: [{ text: message }] },
          ];

          const aiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT + languageInstruction }] },
                contents,
                generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
              }),
            },
          );

          if (!aiRes.ok) {
            const errText = await aiRes.text();
            console.error("Gemini chat error", aiRes.status, errText);
            return json({ error: "AI service error" }, { status: 502 });
          }

          const aiData = await aiRes.json();
          const reply: string =
            aiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
            aiData?.candidates?.[0]?.content?.parts
              ?.map((p: { text?: string }) => p.text ?? "")
              .join("") ??
            "";

          if (!reply) {
            console.error("Empty Gemini chat response", JSON.stringify(aiData).slice(0, 600));
            return json({ error: "Empty AI response" }, { status: 502 });
          }

          return json({ reply });
        } catch (err) {
          console.error("Chat route error", err);
          return json({ error: "Failed to generate reply" }, { status: 500 });
        }
      },
    },
  },
});