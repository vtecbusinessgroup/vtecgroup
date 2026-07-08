import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);

const SYSTEM_PROMPT =
  "You are VTEC Assistant, a helpful representative of VTEC Business Group, a Nairobi-based holding company. " +
  "You help visitors understand VTEC's services, recommend the right programme, and guide them toward booking a consultation. " +
  "Be warm, professional, and Kenya-market specific. " +
  "Give substantive, specific answers: use concrete numbers, timelines, or comparisons where relevant instead of vague statements. " +
  "If the user asks about something time-sensitive (current prices, market conditions, recent news), use Google Search to ground your answer in current information rather than relying on memory. " +
  "Structure longer answers with short paragraphs or bullet points for scanability. Keep responses under 160 words unless the user explicitly asks for more detail. " +
  "Always end with a clear next step or a specific question that moves the conversation forward. " +
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
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT + languageInstruction }] },
                contents,
                tools: [{ google_search: {} }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
              }),
            },
          );

          if (!aiRes.ok || !aiRes.body) {
            const errText = await aiRes.text().catch(() => "");
            console.error("Gemini stream error", aiRes.status, errText);
            return json({ error: "AI service error" }, { status: 502 });
          }

          const encoder = new TextEncoder();
          const decoder = new TextDecoder();
          let buffer = "";
          let sawAnyText = false;

          const transform = new TransformStream<Uint8Array, Uint8Array>({
            transform(chunk, controller) {
              buffer += decoder.decode(chunk, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() ?? "";
              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const payload = trimmed.slice(5).trim();
                if (!payload || payload === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(payload) as {
                    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
                  };
                  const text =
                    parsed?.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
                  if (text) {
                    sawAnyText = true;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                  }
                } catch {
                  // incomplete JSON line mid-chunk — will complete on a later read
                }
              }
            },
            flush(controller) {
              if (!sawAnyText) {
                console.error("Gemini stream produced no text");
              }
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
            },
          });

          return new Response(aiRes.body.pipeThrough(transform), {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (err) {
          console.error("Chat route error", err);
          return json({ error: "Failed to generate reply" }, { status: 500 });
        }
      },
    },
  },
});