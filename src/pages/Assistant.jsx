import { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import MessageBubble from "../components/MessageBubble";

import useChat from "../hooks/useChat";
import useSpeech from "../hooks/useSpeech";

import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

import gtaBg from "../images/background.jpg";

function Assistant() {

  

  const {
    message,
    setMessage,
    messages,
    loading,
    sendMessage,
    chatEndRef,
  } = useChat("michael");

  const {
    listening,
    startListening,
    stopListening,
  } = useSpeech(setMessage, (text) => {
    sendMessage(text);
  });
  
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

        {/* Overlay */}
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
                  if (e.key === "Enter") {
                    sendMessage();
                  }
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

              {/* Send Button */}

              <motion.button
                onClick={() => sendMessage()}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  h-16
                  px-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-purple-700
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

              {/* Voice Mode */}

              <motion.button
  onClick={startListening}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`
    h-16
    w-16
    rounded-2xl
    border
    flex
    items-center
    justify-center
    ${
      listening
        ? "bg-red-600 border-red-500 text-white"
        : "bg-zinc-900 border-violet-500 text-violet-400"
    }
  `}
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