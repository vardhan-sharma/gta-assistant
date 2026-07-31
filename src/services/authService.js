const API = "http://localhost:5000/api/auth";

export const getProfile = async (uid) => {
  const res = await fetch(`${API}/profile/${uid}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await res.json();
};

export const createProfile = async (data) => {
  const res = await fetch(`${API}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create profile");
  }

  return await res.json();
};