import { useNavigate } from "react-router-dom";
function CharacterCarousel({ characters, selected, setSelected }) {
    const navigate = useNavigate();
  return (
    <div className="absolute inset-0">

      {/* Trevor */}
      <div className="absolute left-24 bottom-16 flex flex-col items-center z-10">
        <img
          src={characters[1].image}
          alt={characters[1].name}
          onClick={() => setSelected(1)}
          className="
            max-h-[60vh]
            object-contain
            opacity-60
            hover:opacity-100
            hover:scale-105
            transition-all
            duration-500
            cursor-pointer
          "
        />

        <h2 className="mt-2 text-3xl font-bold text-white">
          Trevor
        </h2>

        <p className="text-zinc-400">
          Coming Soon
        </p>
      </div>

      {/* Michael */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center z-20">
        <img
          src={characters[0].image}
          alt={characters[0].name}
          onClick={() => {
  setSelected(0);
  navigate("/assistant");
}}
          className="
            max-h-[72vh]
            object-contain
            drop-shadow-[0_0_80px_rgba(255,160,0,.6)]
            hover:scale-105
            transition-all
            duration-500
            cursor-pointer
          "
        />

        <h2 className="mt-2 text-4xl font-black text-white">
          Michael
        </h2>

        <p className="text-orange-400 font-semibold text-lg">
          AI Partner
        </p>
      </div>

      {/* Franklin */}
      <div className="absolute right-24 bottom-16 flex flex-col items-center z-10">
        <img
          src={characters[2].image}
          alt={characters[2].name}
          onClick={() => setSelected(2)}
          className="
            max-h-[60vh]
            object-contain
            opacity-60
            hover:opacity-100
            hover:scale-105
            transition-all
            duration-500
            cursor-pointer
          "
        />

        <h2 className="mt-4 text-3xl font-bold text-white">
          Franklin
        </h2>

        <p className="text-zinc-400">
          Coming Soon
        </p>
      </div>

    </div>
  );
}

export default CharacterCarousel;