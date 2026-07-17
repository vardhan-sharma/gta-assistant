import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(history, character) {
  const messages = history.map((msg) => ({
    role: msg.role === "model" ? "assistant" : msg.role,
    content: msg.parts[0].text,
  }));

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.8,
  });

  return completion.choices[0].message.content;
}