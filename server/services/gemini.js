import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { michaelPrompt } from "../prompts/michaelPrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askGemini(history, character) {
  try {
    const conversation = history
      .map(
        (m) =>
          `${m.role === "user" ? "User" : "Michael"}: ${m.parts[0].text}`
      )
      .join("\n");

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      contents: `
Conversation:

${conversation}

Michael:
`,

      config: {
        systemInstruction: michaelPrompt,
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    const reply = result.text?.trim();

    if (!reply) {
      throw new Error("Gemini returned an empty response.");
    }

    return reply;
  } catch (error) {
    console.error("❌ Gemini Error:");
    console.error(error);
    throw error;
  }
}