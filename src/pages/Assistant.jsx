import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import MessageBubble from "../components/MessageBubble";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import gtaBg from "../images/background.jpg";
import { askBackend } from "../services/api";

function Assistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Yo bhai! Michel AI me welcome. Kya help chahiye?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const history = [
      ...messages.slice(-10).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    setMessage("");
    setLoading(true);

    try {
      const aiReply = await askBackend(history, "michael")

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch {
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

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      <div className="flex-1 relative bg-black text-white overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${gtaBg})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

        {/* Main */}
        <div className="relative z-10 flex flex-col h-full">

          <Header />

          <ChatArea>

            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                msg={msg}
              />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-violet-500/30 px-5 py-3 rounded-2xl flex gap-1">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />

          </ChatArea>

          {/* Bottom Input */}

          <div className="border-t border-violet-500/20 bg-[#09090b]/80 backdrop-blur-2xl px-6 py-5">

  <div className="flex items-center gap-4">

    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") sendMessage();
      }}
      placeholder="Ask Michael anything..."
      className="
        flex-1
        h-16
        bg-zinc-900/80
        border
        border-zinc-700
        rounded-2xl
        px-6
        text-white
        placeholder:text-zinc-500
        outline-none
        focus:border-violet-500
        focus:ring-2
        focus:ring-violet-500/30
        transition-all
      "
    />

    <motion.button
      onClick={sendMessage}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 35px rgba(139,92,246,.9)",
      }}
      whileTap={{
        scale: .95,
      }}
      animate={{
        boxShadow: [
          "0 0 10px rgba(139,92,246,.3)",
          "0 0 28px rgba(139,92,246,.9)",
          "0 0 10px rgba(139,92,246,.3)",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="
        h-16
        px-8
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-fuchsia-600
        text-white
        font-semibold
        flex
        items-center
        gap-2
      "
    >
      <IoSend size={20} />
      <span>Send</span>
    </motion.button>

    <motion.button
      whileHover={{
        scale: 1.08,
        rotate: 8,
      }}
      whileTap={{
        scale: .9,
      }}
      animate={{
        boxShadow: [
          "0 0 10px rgba(139,92,246,.3)",
          "0 0 25px rgba(139,92,246,.8)",
          "0 0 10px rgba(139,92,246,.3)",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="
        h-16
        w-16
        rounded-2xl
        bg-zinc-900
        border
        border-violet-500
        text-violet-400
        flex
        items-center
        justify-center
      "
    >
      <FaMicrophone size={22} />
    </motion.button>

  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default Assistant;