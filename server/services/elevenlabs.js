import axios from "axios";

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

export async function generateSpeech(text) {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: "eleven_multilingual_v2",
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    return Buffer.from(response.data).toString("base64");
  } catch (err) {
    console.error(
  "❌ ElevenLabs Error:",
  err.response?.data
    ? Buffer.from(err.response.data).toString()
    : err.message
);
    return null;
  }
}