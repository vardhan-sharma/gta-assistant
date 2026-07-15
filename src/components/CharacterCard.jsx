import michelImg from "../images/characters/michel.png";

export default function CharacterCard() {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:border-violet-500 transition-all duration-300">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full border-2 border-violet-500 bg-zinc-900 overflow-hidden">

          <img
            src={michelImg}
            alt="Michael"
            className="w-full h-full object-contain object-top p-1"
          />

        </div>

        <div className="flex-1">

          <h2 className="text-white text-base font-bold leading-none">
            Michael
          </h2>

          <p className="text-violet-400 text-xs mt-1">
            AI Partner
          </p>

          <div className="flex items-center gap-2 mt-2">

            <span className="w-2 h-2 rounded-full bg-green-500"></span>

            <span className="text-[11px] text-green-400 font-medium">
              Online
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}