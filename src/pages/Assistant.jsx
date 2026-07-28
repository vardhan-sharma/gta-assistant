import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import MessageBubble from "../components/MessageBubble";
import CallingOverlay from "../components/CallingOverlay";
import ConnectedOverlay from "../components/ConnectedOverlay";

import useChat from "../hooks/useChat";
import useSpeech from "../hooks/useSpeech";

import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

import vapi from "../services/vapiService";

import gtaBg from "../images/background.jpg";

function Assistant() {
  const [currentChat, setCurrentChat] = useState(null);
  const [refreshChats, setRefreshChats] = useState(0);
  const [callState, setCallState] = useState("idle");

  const {
    message,
    setMessage,
    messages,
    loading,
    sendMessage,
    chatEndRef,
  } = useChat(
    "michael",
    currentChat,
    setCurrentChat,
    setRefreshChats
  );

  const {
    listening,
    startListening,
    stopListening,
  } = useSpeech(setMessage, (text) => {
    sendMessage(text);
  });

  const startCall = async () => {
    try {
      setCallState("calling");
      console.log("Public Key:", import.meta.env.VITE_VAPI_PUBLIC_KEY);
      console.log("Assistant ID:", import.meta.env.VITE_VAPI_ASSISTANT_ID);
      await vapi.start(
        import.meta.env.VITE_VAPI_ASSISTANT_ID
      );
    } catch (err) {
      console.error("Vapi start error:", err);
      console.error("Message:", err?.message);
      console.error("Full error:", JSON.stringify(err, null, 2));
      setCallState("idle");
    }
  };

  const endCall = async () => {
    try {
      await vapi.stop();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    const handleCallStart = () => {
      console.log("Call Started");
      setCallState("connected");
    };

    const handleCallEnd = () => {
      console.log("Call Ended");
      setCallState("idle");
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
    };

  }, []);

  return (
        <div className="flex h-screen overflow-hidden">

      <Sidebar
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        refreshChats={refreshChats}
      />

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

          <Header
            callState={callState}
            onCall={startCall}
          />

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
                  if (e.key === "Enter" && !loading) {
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
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <IoSend size={20} />
                <span>Send</span>
              </motion.button>

              {/* Voice Mode */}

              <motion.button
                onClick={listening ? undefined : startListening}
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

      <CallingOverlay
        open={callState === "calling"}
        onCancel={endCall}
      />

      <ConnectedOverlay
        open={callState === "connected"}
        onEnd={endCall}
      />

    </div>
  );
}

export default Assistant;