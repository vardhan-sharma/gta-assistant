import { WiCloud } from "react-icons/wi";
import useWeather from "../hooks/useWeather";

export default function WeatherCard() {
 const { weather, loading, error } = useWeather();

  if (loading) {
    if (error) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
}
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
        <p className="text-zinc-400 text-sm">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:border-violet-500 transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[11px] tracking-[3px] uppercase text-zinc-500">
            {weather.city}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <img
              src={weather.icon}
              alt={weather.condition}
              className="w-12 h-12"
            />

            <div>
              <h2 className="text-white text-xl font-bold leading-none">
                {weather.temperature}°C
              </h2>

              <p className="text-[11px] text-zinc-500 mt-1">
                {weather.condition}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}