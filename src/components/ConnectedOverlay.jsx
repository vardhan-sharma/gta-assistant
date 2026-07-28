import { AnimatePresence, motion } from "framer-motion";
import { PhoneOff } from "lucide-react";
import { useEffect, useState } from "react";
import michelImg from "../images/characters/michel.png";

export default function ConnectedOverlay({
  open,
  onEnd,
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!open) {
      setSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-xl flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: .9 }}
            animate={{ scale: 1 }}
            exit={{ scale: .9 }}
            className="flex flex-col items-center"
          >

            <h1 className="text-5xl font-black text-white">
              Michael
            </h1>

            <p className="text-green-400 mt-3 uppercase tracking-[4px]">
              Connected
            </p>

            <motion.div
              animate={{
                scale:[1,1.05,1]
              }}
              transition={{
                repeat:Infinity,
                duration:2
              }}
              className="mt-12 w-44 h-44 rounded-full border-4 border-violet-500 overflow-hidden bg-zinc-900 shadow-[0_0_70px_rgba(139,92,246,.8)]"
            >
              <img
                src={michelImg}
                className="w-full h-full object-contain object-top p-2"
              />
            </motion.div>

            {/* Voice Wave */}

            <div className="flex items-end gap-2 h-20 mt-12">

              {[20,45,30,60,35,55,25,50,22].map((h,i)=>(
                <motion.div
                  key={i}
                  animate={{
                    height:[h,h+20,h]
                  }}
                  transition={{
                    repeat:Infinity,
                    duration:.8,
                    delay:i*.08
                  }}
                  className="w-2 rounded-full bg-violet-500"
                />
              ))}

            </div>

            <p className="mt-8 text-2xl font-bold text-white">
              {minutes}:{secs}
            </p>

            <motion.button
              whileHover={{ scale:1.08 }}
              whileTap={{ scale:.95 }}
              onClick={onEnd}
              className="mt-10 w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_35px_rgba(220,38,38,.8)]"
            >
              <PhoneOff size={30} className="text-white"/>
            </motion.button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}