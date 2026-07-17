import { askGemini } from "./gemini.js";
import { askGroq } from "./groq.js";
import { askOpenRouter } from "./openrouter.js";

const providers = [
  { name: "Gemini", icon: "🟢", fn: askGemini },
  { name: "Groq", icon: "🔵", fn: askGroq },
  { name: "OpenRouter", icon: "🟠", fn: askOpenRouter },
];

function shouldFallback(err) {
  const status =
    err?.status ||
    err?.code ||
    err?.response?.status;

  const message = (err?.message || "").toLowerCase();

  return (
    [429, 500, 502, 503, 504].includes(status) ||
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("unavailable") ||
    message.includes("resource_exhausted") ||
    message.includes("quota")
  );
}

export async function generateReply(history, character) {
  let lastError;

  for (const provider of providers) {
    const start = Date.now();

    try {
      console.log(`${provider.icon} Using ${provider.name}`);

      const reply = await provider.fn(history, character);

      console.log(
        `⚡ ${provider.name} responded in ${Date.now() - start} ms`
      );

      return reply;

    } catch (err) {

      lastError = err;

      console.error(
        `${provider.icon} ${provider.name} Failed (${Date.now() - start} ms)`
      );

      console.error(err.message);

      if (!shouldFallback(err)) {
        throw err;
      }

      console.log("➡ Trying next provider...\n");
    }
  }

  throw lastError || new Error("All AI providers are unavailable.");
}