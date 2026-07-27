import axios from "axios";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/weather"
  : "https://gta-assistant.onrender.com/api/weather";

export async function getWeather(lat, lon) {
  const { data } = await axios.get(API_URL, {
    params: {
      lat,
      lon,
    },
  });

  return data.data;
}