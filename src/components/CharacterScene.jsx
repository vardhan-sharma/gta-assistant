import { useState } from "react";
import bg from "../images/backgrounds/character-bg.png";
import { characters } from "../data/characterData";
import CharacterCarousel from "./CharacterCarousel";

function CharacterScene() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Heading */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 text-center">

        <h1 className="text-5xl font-black text-white tracking-[5px]">
          CHOOSE YOUR
        </h1>

        <h2 className="text-6xl font-black text-orange-400 mt-1">
          AI PARTNER
        </h2>

        <p className="text-zinc-400 mt-3 text-base tracking-wide">
          Select your companion before entering Los Santos
        </p>

      </div>

      {/* Characters */}
      <CharacterCarousel
        characters={characters}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}

export default CharacterScene;