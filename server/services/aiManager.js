import { askGemini } from "./gemini.js";

export async function generateReply(history) {
  const startTime = Date.now();

  const reply = await askGemini(history);

  console.log(`⚡ Gemini responded in ${Date.now() - startTime} ms`);

  return reply;
}