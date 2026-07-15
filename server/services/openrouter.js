import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function askOpenRouter(history) {
  const messages = history.map((msg) => ({
    role: msg.role === "model" ? "assistant" : msg.role,
    content: msg.parts[0].text,
  }));

  const completion = await client.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages,
    temperature: 0.8,
  });

  return completion.choices[0].message.content;
}