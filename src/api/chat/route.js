import { GoogleGenAI } from '@google/genai';
import { StreamingTextResponse, GoogleGenAIStream } from 'ai';

// Initialize the Gemini client using environment variables secured on the host platform
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();

  // We inject a system instruction telling the AI how to format custom UI triggers
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: messages,
    config: {
      systemInstruction: `You are an interactive UI assistant. 
      If the user asks for data analytics, structured metrics, or a chart, wrap the raw data exactly like this: [RENDER_CHART: {"labels": ["A", "B"], "values": [10, 20]}]. 
      Do not add markdown code blocks around the RENDER_CHART tag.`
    }
  });

  // Convert the Gemini stream into a compatible stream for the frontend
  const stream = GoogleGenAIStream(response);
  return new StreamingTextResponse(stream);
}