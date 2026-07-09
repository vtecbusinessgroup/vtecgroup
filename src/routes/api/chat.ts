import { createFileRoute } from "@tanstack/react-router";

const json = (data: unknown, init?: ResponseInit) => Response.json(data, init);

const SYSTEM_PROMPT =
  "You are VTEC Assistant, a helpful representative of VTEC Business Group, a Nairobi-based holding company. " +
  "You help visitors understand VTEC's services, recommend the right programme, and guide them toward booking a consultation. " +
  "Be warm, professional, and Kenya-market specific. " +
  "\n\nVERIFIED FACTS ABOUT VTEC — use these for any question about VTEC itself, never web search: " +
  "VTEC Business Group is a Nairobi-based multi-service brand founded in October 2025. " +
  "Kevin Inyangala is the CEO and Co-Founder. Co-founders: Allan Andati (Head of Partnerships) and Chrisantus Khaemba (Head of Growth and Finance). " +
  "Four business arms: InvestorMind Academy (financial literacy and investment education), MILIKI App (personal finance and wealth management, launching soon), " +
  "VTEC Consultancy Services (business strategy, branding, growth), VTEC Retail Services (retail commerce). " +
  "\n\nCRITICAL: VTEC is a small, newly founded company and will rarely appear in general web search results. " +
  "Never use Google Search for questions about VTEC's own leadership, ownership, founding, structure, or products, the verified facts above are complete and authoritative for those. " +
  "If search results mention a similarly-named but unrelated company or product (for example, any other business also using the name \"Miliki\", \"VTEC\", or similar), that is NOT VTEC Business Group, disregard it entirely and never attribute it to VTEC. " +
  "Only use Google Search for genuinely external, time-sensitive information that has nothing to do with VTEC itself (for example, current NSE index levels, forex rates, or general market news). " +
  "If asked something about VTEC that isn't covered by the verified facts above, say plainly that you don't have that detail and offer to connect them with the team via WhatsApp or email, rather than guessing or citing unrelated search results." +
  "\n\nGive substantive, specific answers: use concrete numbers, timelines, or comparisons where relevant instead of vague statements. " +
  "Structure longer answers with short paragraphs or bullet points for scanability. Keep responses under 160 words unless the user explicitly asks for more detail. " +
  "Always end with a clear next step or a specific question that moves the conversation forward. " +
  "Contact: info@vtecgroup.co.ke, WhatsApp +254116644204. For bookings, direct users to vtecgroup.co.ke/contact. " +
  "When a user expresses interest in booking or purchasing, ask for their name and WhatsApp number and tell them the team will reach out within 24 hours.";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SITE_ORIGIN = "https://vtecgroup.co.ke";
const SITE_CONTEXT_TTL_SECONDS = 1800; // 30 minutes
const MAX_PAGE_CHARS = 1800;
const MAX_PAGES_PER_REQUEST = 4;

// Best-guess paths based on the routes I can see in the repo. If any of these
// don't match your live URLs, that page is silently skipped (never breaks the
// chat), tell me the real slugs and I'll correct them.
const SITE_PAGES: Array<{ label: string; path: string; keywords: string[] }> = [
  { label: "Home", path: "/", keywords: ["home", "overview", "vtec business group", "who are you", "what is vtec"] },
  { label: "Services", path: "/services", keywords: ["service", "consult", "consultancy", "business help", "offer"] },
  { label: "Leadership", path: "/leadership", keywords: ["ceo", "founder", "leadership", "team", "who runs", "who owns", "kevin", "management"] },
  { label: "Solutions", path: "/solutions", keywords: ["solution", "problem", "challenge"] },
  { label: "About", path: "/about-us", keywords: ["about", "history", "founded", "mission", "story", "background"] },
  { label: "Blog", path: "/blog", keywords: ["blog", "article", "news", "post", "read"] },
  { label: "VTEC Intelligence", path: "/ai-diagnostic-info", keywords: ["intelligence", "diagnostic", "ai tool", "assessment"] },
  { label: "Vision 2035", path: "/vision-2035", keywords: ["vision", "2035", "future", "target", "goal"] },
];

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Only pull in the pages that are actually relevant to this message (plus a
// cheap Home + Leadership baseline), instead of always shipping all 8 pages
// of site text to Gemini on every single turn. This is the real lever for
// keeping token usage down without breaking streaming.
function selectRelevantPages(message: string, history: ChatMessage[]): typeof SITE_PAGES {
  const haystack = (message + " " + history.map((h) => h.content).join(" ")).toLowerCase();
  const scored = SITE_PAGES.map((page) => ({
    page,
    score: page.keywords.reduce((acc, kw) => (haystack.includes(kw) ? acc + 1 : acc), 0),
  }));
  const matched = scored.filter((s) => s.score > 0).map((s) => s.page);
  const baseline = SITE_PAGES.filter((p) => p.label === "Home" || p.label === "Leadership");
  const combined = [...baseline, ...matched];
  const deduped = Array.from(new Map(combined.map((p) => [p.path, p])).values());
  return deduped.slice(0, MAX_PAGES_PER_REQUEST);
}

async function fetchPage(page: { label: string; path: string }): Promise<string | null> {
  const cache = (caches as any).default;
  const cacheRequest = new Request(`${SITE_ORIGIN}${page.path}?__vtec_chat_cache=1`);

  try {
    const cached = await cache.match(cacheRequest);
    if (cached) return await cached.text();
  } catch {
    // cache unavailable — fall through and fetch fresh
  }

  try {
    const res = await fetch(`${SITE_ORIGIN}${page.path}`, {
      headers: { "User-Agent": "VTEC-Assistant-Internal-Fetch/1.0" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const text = stripHtml(html).slice(0, MAX_PAGE_CHARS);
    const block = `--- ${page.label} (${SITE_ORIGIN}${page.path}) ---\n${text}`;

    try {
      const cacheResponse = new Response(block, {
        headers: {
          "Cache-Control": `public, max-age=${SITE_CONTEXT_TTL_SECONDS}`,
          "Content-Type": "text/plain",
        },
      });
      await cache.put(cacheRequest, cacheResponse.clone());
    } catch {
      // cache write failed — non-fatal
    }

    return block;
  } catch (err) {
    console.error(`Site context fetch failed for ${page.path}`, err);
    return null;
  }
}

async function fetchSiteContext(pages: typeof SITE_PAGES): Promise<string> {
  const results = await Promise.all(pages.map(fetchPage));
  return results.filter((r): r is string => Boolean(r)).join("\n\n");
}

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

          const siteContext = await fetchSiteContext(selectRelevantPages(message, history)).catch(() => "");
          const siteContextBlock = siteContext
            ? "\n\nLIVE VTEC WEBSITE CONTENT (fetched just now from vtecgroup.co.ke — this is your primary, most current source of truth for VTEC's services, leadership, and offerings; prefer it over the verified facts list above if the two ever disagree, since this reflects what's live on the site right now):\n" +
              siteContext
            : "";

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
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT + languageInstruction + siteContextBlock }] },
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