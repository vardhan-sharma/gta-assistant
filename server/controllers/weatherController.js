import { getCurrentWeather } from "../services/weatherService.js";

export async function fetchWeather(req, res) {
  try {
   const { lat, lon } = req.query;

if (!lat || !lon) {
  return res.status(400).json({
    success: false,
    message: "Latitude and Longitude are required.",
  });
}

const weather = await getCurrentWeather(lat, lon);

    return res.status(200).json({
      success: true,
      data: weather,
    });
  } catch (error) {
    console.error("❌ Weather Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch weather.",
    });
  }
}