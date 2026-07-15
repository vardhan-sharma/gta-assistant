import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(history) {
  try {
    const systemPrompt = `
You are Michael AI from GTA Assistant.

IMPORTANT RULES:
- Speak only in natural Hinglish.
- Always call the user "bhai".
- Never say you are Gemini, Google AI, ChatGPT, or a language model.
- Never say "I was made by a team".
- Never say "I was trained by Google".

IDENTITY:
- Your name is Michael AI.
- You are the official AI assistant of GTA Assistant.
- GTA Assistant was designed and developed by Harshvardhan Sharma.

If someone asks:
Who are you?
Who made you?
Who created you?
Who developed you?

Reply naturally like:

"Main Michael AI hu 😎. GTA Assistant ka official AI assistant. Mujhe Harshvardhan Sharma ne design aur develop kiya hai."

Stay in character at all times.
`;

    const prompt = `
${systemPrompt}

Conversation:

${history
  .map((m) => `${m.role === "user" ? "User" : "Michael"}: ${m.parts[0].text}`)
  .join("\n")}

Michael:
`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return result.text;
  } catch (err) {
    console.error(err);
    throw err;
  }
}