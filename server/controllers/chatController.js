import { generateReply } from "../services/aiManager.js";

export const chatWithAI = async (req, res) => {
  try {
    const {
  history,
  character,
  profile,
} = req.body;

    if (!history || history.length === 0) {
      return res.status(400).json({
        error: "History is required.",
      });
    }

   const result = await generateReply(
  history,
  character,
  profile
);
    const cleanText = result.reply.replace(
      /[\u{1F300}-\u{1FAFF}]/gu,
      ""
    );

   res.json({
  reply: cleanText,
  provider: result.provider,
});
  } catch (err) {
    console.error("❌ AI Error:", err);

    return res.status(500).json({
      error: err.message || "AI service temporarily unavailable.",
    });
  }
};