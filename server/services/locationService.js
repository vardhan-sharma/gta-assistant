import axios from "axios";

export async function getLocationName(lat, lon) {
  const { data } = await axios.get(
    "https://nominatim.openstreetmap.org/reverse",
    {
      params: {
        lat,
        lon,
        format: "json",
        zoom: 18,
        addressdetails: 1,
      },
      headers: {
        "User-Agent": "GTA-Assistant/1.0",
      },
    }
  );

  const address = data.address;

  return (
    address.suburb ||
    address.neighbourhood ||
    address.city_district ||
    address.village ||
    address.town ||
    address.city ||
    "Unknown Location"
  );
}