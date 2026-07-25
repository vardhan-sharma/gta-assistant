import axios from "axios";

const API_URL = "http://localhost:5000/api/weather";

export async function getWeather(lat, lon) {
  const { data } = await axios.get(API_URL, {
    params: {
      lat,
      lon,
    },
  });

  return data.data;
}