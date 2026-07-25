import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api/chats"
  : "https://gta-assistant.onrender.com/api/chats";

export const getChats = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const getChat = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};

export const createChat = async (chat) => {
  const { data } = await axios.post(BASE_URL, chat);
  return data;
};

export const updateChat = async (id, chat) => {
  const { data } = await axios.patch(`${BASE_URL}/${id}`, chat);
  return data;
};

export const deleteChat = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};