import { askGemini } from "./gemini.js";
import { askGroq } from "./groq.js";
import { askOpenRouter } from "./openrouter.js";

const providers = [
  { name: "Gemini", icon: "🟢", fn: askGemini },
  { name: "Groq", icon: "🔵", fn: askGroq },
  { name: "OpenRouter", icon: "🟠", fn: askOpenRouter },
];

function shouldFallback(err) {
  console.dir(err, { depth: null });

  const status =
    Number(err?.status) ||
    Number(err?.code) ||
    Number(err?.response?.status) ||
    Number(err?.error?.code);

  const message = JSON.stringify(err).toLowerCase();

  console.log("Status:", status);
  console.log("Fallback:", [429, 500, 502, 503, 504].includes(status));

  return (
    [429, 500, 502, 503, 504].includes(status) ||
    message.includes("resource_exhausted") ||
    message.includes("quota") ||
    message.includes("unavailable") ||
    message.includes("timeout") ||
    message.includes("network")
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