import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginCard from "../components/LoginCard";
import loginVideo from "../assets/videos/login.mp4";

export default function Login() {
  const videoRef = useRef(null);

  const [entered, setEntered] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!entered) return;

    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [entered]);

  const handleEnter = async () => {
    setEntered(true);

    if (!videoRef.current) return;

    try {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      await videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        preload="auto"
        loop
      >
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Enter Screen */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={handleEnter}
            className="absolute inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold tracking-[0.25em] text-white"
            >
              GTA ASSISTANT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                duration: 1,
              }}
              className="mt-8 animate-pulse text-lg tracking-widest text-gray-300"
            >
              Click Anywhere To Enter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.88,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-30 flex h-full items-center justify-center"
          >
            <LoginCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}