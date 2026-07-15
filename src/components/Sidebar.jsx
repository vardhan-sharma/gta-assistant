import { FaPlus } from "react-icons/fa";
import CharacterCard from "./CharacterCard";
import WeatherCard from "./WeatherCard";

export default function Sidebar() {
  const chats = [
    "Who are you?",
    "Best cars in San Andreas",
    "Money making tips",
    "GTA SA cheats",
    "How to get rich in GTA V",
    "Hidden locations",
  ];

  return (
    <div className="w-72 h-screen bg-[#09090b] border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-800 flex-shrink-0">

        <h1 className="text-4xl font-black leading-none text-white">
          GTA
        </h1>

        <h2 className="text-3xl italic font-black text-violet-500 -mt-1">
          Assistant
        </h2>

        <p className="text-[11px] tracking-[5px] text-zinc-500 mt-2">
          LOS SANTOS
        </p>

      </div>

      {/* New Chat */}

      <div className="p-4 flex-shrink-0">

        <button
          className="
          w-full
          h-12
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-purple-700
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          shadow-lg
          shadow-violet-700/20
          hover:scale-[1.02]
          transition-all
          duration-300
          "
        >
          <FaPlus size={12} />
          New Chat
        </button>

      </div>

      {/* Chats */}

      <div className="flex-1 overflow-y-auto px-4">

        <p className="text-[11px] uppercase tracking-[3px] text-zinc-500 mb-3">
          Chats
        </p>

        {chats.map((chat, i) => (
          <div
            key={i}
            className={`
              rounded-xl
              p-3
              mb-2
              cursor-pointer
              transition-all
              duration-300
              ${
                i === 0
                  ? "bg-violet-600/20 border border-violet-500"
                  : "bg-zinc-900 border border-zinc-800 hover:border-violet-500 hover:bg-zinc-800"
              }
            `}
          >
            <p className="text-sm text-white font-medium truncate">
              {chat}
            </p>

            <p className="text-[10px] text-zinc-500 mt-1">
              {i === 0
                ? "Now"
                : i === 1
                ? "10:41 PM"
                : "Yesterday"}
            </p>
          </div>
        ))}

      </div>

      {/* Bottom */}

      <div className="border-t border-zinc-800 p-3 space-y-3 bg-[#09090b] flex-shrink-0">

        <CharacterCard />

        <WeatherCard />

      </div>

    </div>
  );
}