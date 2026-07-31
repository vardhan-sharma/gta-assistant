import axios from "axios";
import { auth } from "../firebase/firebase";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/chats"
  : "https://gta-assistant.onrender.com/api/chats";

// Get all chats
export const getChats = async () => {
  const uid = auth.currentUser?.uid;

  console.log("Current User:", auth.currentUser);
  console.log("UID:", uid);

  if (!uid) return [];

  const { data } = await axios.get(BASE_URL, {
    params: { uid },
  });

  return data;
};

// Get single chat
export const getChat = async (id) => {
  const uid = auth.currentUser?.uid;

  const { data } = await axios.get(`${BASE_URL}/${id}`, {
    params: { uid },
  });

  return data;
};

// Create new chat
export const createChat = async (chat) => {
  const uid = auth.currentUser?.uid;

  const { data } = await axios.post(BASE_URL, {
    ...chat,
    uid,
  });

  return data;
};

// Update chat
export const updateChat = async (id, chat) => {
  const uid = auth.currentUser?.uid;

  const { data } = await axios.patch(`${BASE_URL}/${id}`, {
    ...chat,
    uid,
  });

  return data;
};

// Delete chat
export const deleteChat = async (id) => {
  const uid = auth.currentUser?.uid;

  const { data } = await axios.delete(`${BASE_URL}/${id}`, {
    data: { uid },
  });

  return data;
};