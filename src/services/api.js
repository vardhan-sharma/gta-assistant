const API_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://gta-assistant.onrender.com";

export async function askBackend(
  history,
  character = "michael",
  profile = {}
) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      history,
      character,
      profile,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Server Error");
  }

  return data;
}