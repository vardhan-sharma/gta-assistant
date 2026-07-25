import axios from "axios";
import dotenv from "dotenv";
import { getLocationName } from "./locationService.js";

dotenv.config();

const BASE_URL = "http://api.weatherapi.com/v1/current.json";

export async function getCurrentWeather(lat, lon) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: `${lat},${lon}`,
        aqi: "no",
      },
    });
    const locationName = await getLocationName(lat, lon);
   return {
  city: locationName,
  region: data.location.region,
  country: data.location.country,

  temperature: data.current.temp_c,
  feelsLike: data.current.feelslike_c,

  condition: data.current.condition.text,
  icon: `https:${data.current.condition.icon}`,

  humidity: data.current.humidity,
  wind: data.current.wind_kph,
  windDirection: data.current.wind_dir,

  cloud: data.current.cloud,
  isDay: data.current.is_day,

  localTime: data.location.localtime,
};
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Unable to fetch weather.");
  }
}