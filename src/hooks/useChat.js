import { auth } from "../firebase/firebase";
import { useEffect, useRef, useState } from "react";

import { askBackend } from "../services/api";

import {
  createChat,
  updateChat,
} from "../services/chatService";

export default function useChat(
  character = "michael",
  currentChat,
  setCurrentChat,
  setRefreshChats
) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Always mirrors the latest currentChat so async callbacks below
  // can tell whether the user has since switched chats.
  const currentChatRef = useRef(currentChat);
  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  // Synchronous lock (refs update immediately, unlike state) so two
  // sendMessage calls fired in the same tick (double Enter, click +
  // voice, etc.) can't both slip through before `loading` state updates.
  const sendingRef = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
  if (!currentChat) {
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    const name = profile?.name || "Friend";
    const gender = profile?.gender || "";

    let greeting = "";

    if (gender === "male") {
      greeting = `🙏 Namaste ${name} Bhai! Main Michael AI hoon. Aaj main aapki kis cheez me madad kar sakta hoon?`;
    } else if (gender === "female") {
      greeting = `🌸 Hello ${name} Ma'am! Main Michael AI hoon. Aaj main aapki kis cheez me madad kar sakta hoon?`;
    } else {
      greeting = `👋 Hello ${name}! Main Michael AI hoon. Aaj main aapki kis cheez me madad kar sakta hoon?`;
    }

    setMessages([
      {
        sender: "ai",
        text: greeting,
      },
    ]);

    return;
  }

  const formatted = currentChat.messages.map((msg) => ({
    sender: msg.role === "user" ? "user" : "ai",
    text: msg.parts?.map((part) => part.text).join("") || "",
  }));

  setMessages(formatted);
}, [currentChat]);

  function toGeminiHistory(uiMessages) {
    return uiMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [
        {
          text: msg.text,
        },
      ],
    }));
  }

  async function sendMessage(customText) {
    // Blocks overlapping sends from a fast double Enter/click, or from
    // voice input firing while a text message is still in flight.
    if (sendingRef.current) return;

        const finalMessage =
      typeof customText === "string"
        ? customText.trim()
        : message.trim();

    if (!finalMessage) return;

    const userMessage = {
      sender: "user",
      text: finalMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setMessage("");

    sendingRef.current = true;
    setLoading(true);

    try {
      const history = toGeminiHistory(updatedMessages);

      let chat = currentChat;

      if (!chat) {
       chat = await createChat({
  uid: auth.currentUser.uid,

  title:
    finalMessage.length > 40
      ? finalMessage.slice(0, 40) + "..."
      : finalMessage,

  character,

  messages: history,
});

        setCurrentChat(chat);

        setRefreshChats((prev) => prev + 1);
      }
      const profile = JSON.parse(
  localStorage.getItem("userProfile")
);
      const result = await askBackend(
  history,
  character,
  profile
);
      console.log("AI Result:", result);

      const aiReply = result.reply;

      if (result.audio) {
        const audio = new Audio(
          `data:audio/mpeg;base64,${result.audio}`
        );

        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }

      const aiMessage = {
        sender: "ai",
        text: aiReply,
      };

      const finalMessages = [
        ...updatedMessages,
        aiMessage,
      ];

      // Only paint the reply on screen if the user is still on the chat
      // this request belongs to. It's always persisted to the DB below
      // regardless, so nothing is lost if they've navigated away.
      const stillOnSameChat =
        !currentChatRef.current ||
        currentChatRef.current._id === chat._id;

      if (stillOnSameChat) {
        setMessages(finalMessages);
      }

      await updateChat(chat._id, {
        title: chat.title,
        character,

        messages: toGeminiHistory(finalMessages),
      });

      setRefreshChats((prev) => prev + 1);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ AI se connect nahi ho paya.",
        },
      ]);
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  }  return {
    message,
    setMessage,

    messages,
    setMessages,

    loading,

    sendMessage,

    chatEndRef,
  };
}