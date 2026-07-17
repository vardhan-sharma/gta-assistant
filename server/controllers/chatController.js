import { generateReply } from "../services/aiManager.js";
import { generateSpeech } from "../services/elevenlabs.js";

export const chatWithAI = async (req, res) => {
  try {
    const { history, character = "michael" } = req.body;

    const cleanHistory = (history || []).filter(
      (msg) =>
        msg &&
        msg.role &&
        Array.isArray(msg.parts) &&
        msg.parts.length > 0 &&
        typeof msg.parts[0].text === "string" &&
        msg.parts[0].text.trim() !== ""
    );

    const reply = await generateReply(cleanHistory, character);

    const audio = await generateSpeech(reply);

    res.json({
      reply,
      audio,
    });

  } catch (err) {
  console.error("❌ AI Error:", err);

  res.status(500).json({
    error: err.message || "AI service temporarily unavailable.",
  });
}
  }
