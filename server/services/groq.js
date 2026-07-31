import Groq from "groq-sdk";
import dotenv from "dotenv";
import { michaelPrompt } from "../prompts/michaelPrompt.js";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(history, character, profile) {
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

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 500,
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Groq returned an empty response.");
    }

    return reply;
  } catch (error) {
    console.error("❌ Groq Error:");
    console.error(error);
    throw error;
  }
}