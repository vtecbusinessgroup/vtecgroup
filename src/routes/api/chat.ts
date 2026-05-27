import { json } from '@tanstack/start';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

interface GeminiRequestBody {
  contents: ChatMessage[];
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export default async function handler(request: Request, env: any) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { message, conversationHistory } = (await request.json()) as {
      message: string;
      conversationHistory: Message[];
    };

    const geminiApiKey = env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return json({ error: 'API key not configured' }, { status: 500 });
    }

    // Convert conversation history to Gemini format
    const contents: ChatMessage[] = conversationHistory
      .filter((msg) => msg.text && msg.sender)
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const requestBody: GeminiRequestBody = {
      contents,
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.7,
        topP: 0.9,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Unexpected response format from Gemini API');
    }

    const reply = data.candidates[0].content.parts[0].text;

    return json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
