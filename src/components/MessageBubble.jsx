import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegCopy,
} from "react-icons/fa";

import michelImg from "../images/characters/michel.png";

export default function MessageBubble({ msg }) {
  const isUser = msg.sender === "user";

  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleFeedback = (type) => {
    setFeedback((prev) => (prev === type ? null : type));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-11 h-11 rounded-full border-2 border-violet-500 bg-zinc-900 overflow-hidden mr-3 mt-1 shadow-[0_0_15px_rgba(139,92,246,.6)]">
          <img
            src={michelImg}
            alt="Michael"
            className="w-full h-full object-contain object-top p-1"
          />
        </div>
      )}

      <div className="max-w-[75%]">
        {!isUser && (
          <p className="text-violet-400 text-sm font-semibold mb-2 ml-1">
            Michael
          </p>
        )}

        <div
          className={`px-5 py-4 rounded-2xl whitespace-pre-wrap shadow-xl ${
            isUser
              ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-br-md"
              : "bg-zinc-900/80 backdrop-blur-xl border border-violet-500/20 text-white rounded-bl-md"
          }`}
        >
          {msg.text}
        </div>

        {!isUser && (
          <div className="flex items-center gap-4 mt-3 ml-2 text-zinc-400">
            {/* Like */}
            <button
              onClick={() => handleFeedback("like")}
              className={`transition duration-200 ${
                feedback === "like"
                  ? "text-violet-500"
                  : "hover:text-violet-400"
              }`}
              title="Like"
            >
              <FaThumbsUp />
            </button>

            {/* Dislike */}
            <button
              onClick={() => handleFeedback("dislike")}
              className={`transition duration-200 ${
                feedback === "dislike"
                  ? "text-red-500"
                  : "hover:text-red-400"
              }`}
              title="Dislike"
            >
              <FaThumbsDown />
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 hover:text-green-400 transition duration-200"
              title="Copy"
            >
              <FaRegCopy />

              {copied && (
                <span className="text-xs text-green-400 font-medium">
                  Copied!
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}