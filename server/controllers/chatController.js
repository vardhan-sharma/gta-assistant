import { generateReply } from "../services/aiManager.js";

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

    res.json({
      reply,
    });

  } catch (err) {
    console.error("❌ AI Error:", err);

    res.status(500).json({
      error: "AI service temporarily unavailable.",
    });
  }
};