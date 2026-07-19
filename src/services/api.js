const API_URL = "https://gta-assistant.onrender.com";

export async function askBackend(history, character = "michael") {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      history,
      character,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Server Error");
  }

  return data;
}