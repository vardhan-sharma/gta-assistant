import OpenAI from "openai";
import dotenv from "dotenv";
import { michaelPrompt } from "../prompts/michaelPrompt.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function askOpenRouter(history, character, profile) {
  try {
    const messages = [
      {
        role: "system",
        content: `
${michaelPrompt}

=========================
CURRENT USER PROFILE
=========================

Name: ${profile.name || "Unknown"}

Gender: ${profile.gender || "Unknown"}

Date Of Birth: ${profile.dob || "Unknown"}

IMPORTANT RULES

- You already know the user's name.
- Always address the user by their name.
- Never say you don't know the user's name.
- Never ask the user's name again.
- Use the user's name naturally.
`,
      },

      ...history.map((msg) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.parts[0].text,
      })),
    ];

    const completion = await client.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages,
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 500,
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("OpenRouter returned an empty response.");
    }

    return reply;
  } catch (error) {
    console.error("❌ OpenRouter Error:");
    console.error(error);
    throw error;
  }
}