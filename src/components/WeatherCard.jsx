import { WiCloud } from "react-icons/wi";

export default function WeatherCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:border-violet-500 transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] tracking-[3px] uppercase text-zinc-500">
            Los Santos
          </p>

          <div className="flex items-center gap-2 mt-1">

            <WiCloud className="text-4xl text-violet-400" />

            <div>
              <h2 className="text-white text-xl font-bold leading-none">
                28°C
              </h2>

              <p className="text-[11px] text-zinc-500 mt-1">
                Haze
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}