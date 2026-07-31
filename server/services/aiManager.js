import { askGemini } from "./gemini.js";
import { askGroq } from "./groq.js";
import { askOpenRouter } from "./openrouter.js";

const providers = [
  {
    name: "Gemini",
    fn: askGemini,
  },
  {
    name: "Groq",
    fn: askGroq,
  },
  {
    name: "OpenRouter",
    fn: askOpenRouter,
  },
];

function shouldFallback(error) {
  const status =
    error?.status ||
    error?.response?.status ||
    error?.error?.code ||
    error?.code;

  const message = (
    error?.message ||
    JSON.stringify(error) ||
    ""
  ).toLowerCase();

  console.log("Status:", status);
  console.log("Message:", message);

  // HTTP status based fallback
  if ([400, 401, 403, 408, 409, 425, 429, 500, 502, 503, 504].includes(Number(status))) {
    return true;
  }

  // Message based fallback
  const fallbackMessages = [
    "api key",
    "api_key_invalid",
    "invalid api key",
    "quota",
    "resource_exhausted",
    "rate limit",
    "429",
    "network",
    "timeout",
    "temporarily unavailable",
    "service unavailable",
    "internal server error",
    "connection",
    "fetch failed",
    "econnreset",
    "socket hang up",
  ];

  return fallbackMessages.some((text) => message.includes(text));
}

export async function generateReply(
  history,
  character,
  profile
) {
  let lastError;

  for (const provider of providers) {
    console.log("\n==============================");
    console.log(`🚀 Trying ${provider.name}`);

    try {
      const start = Date.now();

      const reply = await provider.fn(
  history,
  character,
  profile
);

      console.log(
        `✅ ${provider.name} Success (${Date.now() - start} ms)`
      );

      return {
        reply,
        provider: provider.name,
      };
    } catch (error) {
      lastError = error;

      console.error(`❌ ${provider.name} Failed`);
      console.dir(error, { depth: null });

      if (shouldFallback(error)) {
        console.log(`➡ Falling back from ${provider.name}...`);
        continue;
      }

      console.log(`⛔ Non-fallback error from ${provider.name}`);
      throw error;
    }
  }

  console.log("❌ All AI providers failed");

  throw lastError || new Error("All AI providers are unavailable.");
}