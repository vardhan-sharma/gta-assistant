import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import landingBg from "../images/backgrounds/landing-bg.jpg";
import logo from "../images/logo/gta-logo.png";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${landingBg})` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

        {/* Logo Placeholder */}
        <motion.img
           src={logo}
           alt="GTA Assistant Logo"
          className="w-full max-w-[550px]"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Title */}
        <motion.h2
          className="mt-6 text-2xl md:text-3xl tracking-[12px] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          AI ASSISTANT
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="mt-3 text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Your Personal Voice Companion
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={() => navigate("/loading")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 rounded-lg border-2 border-orange-500 px-10 py-4 text-xl font-bold text-orange-500 transition hover:bg-orange-500 hover:text-black"
        >
          LET'S START
        </motion.button>
      </div>
    </div>
  );
}

export default Landing;