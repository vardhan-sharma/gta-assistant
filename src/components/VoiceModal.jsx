import { motion } from "framer-motion";
import { FaMicrophone, FaTimes } from "react-icons/fa";

export default function VoiceModal({
  listening,
  startListening,
  stopListening,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-red-500 transition"
      >
        <FaTimes size={28} />
      </button>

      {/* Glow */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-violet-600/20 blur-[120px]" />

      {/* Title */}
      <h1 className="text-6xl font-black text-white z-10">
        Michael
      </h1>

      <p className="text-zinc-400 mt-4 text-lg z-10">
        {listening
          ? "🎤 Listening..."
          : "Tap the mic to start talking"}
      </p>

      {/* Mic */}
      <motion.button
        onClick={() => {
  console.log("MIC BUTTON CLICKED");

  if (listening) {
    stopListening();
  } else {
    startListening();
  }
}}
        animate={{
          scale: listening ? [1, 1.15, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className={`
          mt-14
          w-36
          h-36
          rounded-full
          flex
          items-center
          justify-center
          text-white
          shadow-[0_0_60px_rgba(139,92,246,.7)]
          ${
            listening
              ? "bg-red-600"
              : "bg-gradient-to-r from-violet-600 to-purple-700"
          }
        `}
      >
        <FaMicrophone size={48} />
      </motion.button>

    </div>
  );
}