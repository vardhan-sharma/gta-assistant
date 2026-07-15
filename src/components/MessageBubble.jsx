import { motion } from "framer-motion";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegCopy,
} from "react-icons/fa";

import michelImg from "../images/characters/michel.png";

export default function MessageBubble({ msg }) {

  const isUser = msg.sender === "user";

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .25 }}
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

            <button className="hover:text-violet-400 transition">
              <FaThumbsUp />
            </button>

            <button className="hover:text-red-400 transition">
              <FaThumbsDown />
            </button>

            <button className="hover:text-green-400 transition">
              <FaRegCopy />
            </button>

          </div>

        )}

      </div>

    </motion.div>

  );
}