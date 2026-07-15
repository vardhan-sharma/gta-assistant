import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/character-select");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold tracking-wider"
      >
        GTA Assistant
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400"
      >
        Initializing Michael AI...
      </motion.p>

      <div className="mt-10 flex gap-3">
        <span className="w-4 h-4 rounded-full bg-violet-500 animate-bounce"></span>
        <span
          className="w-4 h-4 rounded-full bg-violet-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="w-4 h-4 rounded-full bg-violet-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>

    </div>
  );
}

export default Loading;