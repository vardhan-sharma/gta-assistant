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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Heading */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 text-center">
        <h1 className="text-4xl font-black text-white tracking-widest">
          CHOOSE YOUR
        </h1>

        <h2 className="text-5xl font-black text-orange-400 mt-2">
          AI PARTNER
        </h2>

        <p className="text-zinc-300 mt-2 text-lg">
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