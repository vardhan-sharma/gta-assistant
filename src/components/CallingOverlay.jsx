import { motion, AnimatePresence } from "framer-motion";
import { PhoneOff } from "lucide-react";
import michelImg from "../images/characters/michel.png";

export default function CallingOverlay({
  open,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/65 backdrop-blur-xl flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Title */}

            <h1 className="text-4xl font-black text-white">
              Calling Michael...
            </h1>

            <p className="mt-3 text-violet-300 uppercase tracking-[4px] text-sm">
              Securing Voice Channel...
            </p>

            {/* Avatar */}

            <div className="relative flex items-center justify-center mt-16">

              {/* Ring 1 */}

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute w-56 h-56 rounded-full border border-violet-500/30"
              />

              {/* Ring 2 */}

              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.05, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                  repeat: Infinity,
                }}
                className="absolute w-64 h-64 rounded-full border border-violet-500/20"
              />

              {/* Ring 3 */}

              <motion.div
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.2, 0.02, 0.2],
                }}
                transition={{
                  duration: 2,
                  delay: 0.8,
                  repeat: Infinity,
                }}
                className="absolute w-72 h-72 rounded-full border border-violet-500/10"
              />

              {/* Avatar */}

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  relative
                  w-44
                  h-44
                  rounded-full
                  border-4
                  border-violet-500
                  bg-zinc-900
                  overflow-hidden
                  shadow-[0_0_70px_rgba(139,92,246,.8)]
                "
              >
                <img
                  src={michelImg}
                  alt="Michael"
                  className="w-full h-full object-contain object-top p-2"
                />
              </motion.div>
            </div>

            {/* Animated Dots */}

            <div className="flex gap-3 mt-10">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="w-3 h-3 rounded-full bg-violet-400"
                />
              ))}
            </div>

            {/* End Call */}

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className="
                mt-14
                w-20
                h-20
                rounded-full
                bg-red-600
                hover:bg-red-500
                flex
                items-center
                justify-center
                shadow-[0_0_35px_rgba(220,38,38,.8)]
              "
            >
              <PhoneOff size={28} className="text-white" />
            </motion.button>

            <p className="text-zinc-500 text-sm mt-4">
              End Call
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}