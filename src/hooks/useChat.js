import { useEffect, useRef, useState } from "react";
import { askBackend } from "../services/api";

export default function useChat(character = "michael") {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Yo bhai! Michael AI me welcome. Kya help chahiye?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(customText) {
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

    setLoading(true);

    try {
      const history = updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [
          {
            text: m.text,
          },
        ],
      }));

      const aiReply = await askBackend(history, character);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ AI se connect nahi ho paya.",
        },
      ]);
    }

    setLoading(false);
  }

  return {
    message,
    setMessage,
    messages,
    loading,
    sendMessage,
    chatEndRef,
  };
}