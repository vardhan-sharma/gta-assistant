import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import michelImg from "../images/characters/michel.png";

export default function Header({
  callState,
  onCall,
}) {
  return (
    <header className="flex items-center justify-between px-8 py-3 bg-[#09090b]/80 backdrop-blur-xl border-b border-violet-500/20">

      {/* Left */}
      <div>
        <div className="leading-none">
          <h1 className="text-3xl font-black text-white">
            GTA
          </h1>

          <h2 className="text-2xl italic font-black text-violet-500 -mt-1">
            Assistant
          </h2>
        </div>

        <div className="flex items-center gap-4 mt-2">

          <p className="text-[11px] tracking-[4px] uppercase text-zinc-500">
            LOS SANTOS
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>

            <p className="text-xs text-green-400 font-medium">
              Online
            </p>
          </div>

        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Call Button */}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (callState === "idle") {
              onCall();
            }
          }}
          disabled={callState !== "idle"}
          className={`relative w-12 h-12 flex items-center justify-center transition-opacity ${
            callState !== "idle"
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
        >
          {/* Rotating Ring */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-violet-400/60"
          />

          {/* Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-violet-500/20 blur-md"
          />

          {/* Button */}

          <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,.7)]">
            <Phone size={18} className="text-white" />
          </div>

        </motion.button>

        {/* Michael Avatar */}

        <div className="relative">

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="w-14 h-14 rounded-full border-2 border-violet-500 bg-zinc-900 overflow-hidden shadow-[0_0_15px_rgba(139,92,246,.5)]"
          >
            <img
              src={michelImg}
              alt="Michael"
              className="w-full h-full object-contain object-top p-1"
            />
          </motion.div>

          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[#09090b]" />

        </div>

      </div>

    </header>
  );
}