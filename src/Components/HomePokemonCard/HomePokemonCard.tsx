import { useEffect, useRef, useState } from "react";
import "../../index.css";
import "./HomePokemonCard.css";

export interface IPokemon {
  name: string;
  type: string[];
  height: number;
  weight: number;
  speed: number;
  picture: string;
}

const PokemonCard = (pokemon: IPokemon) => {
  const [isFirstSide, setSide] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add("flip");
      const timeout = setTimeout(() => {
        cardRef.current?.classList.remove("flip");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isFirstSide]);

  return (
    <div
      ref={cardRef}
      onClick={() => setSide(!isFirstSide)}
      className={`w-45 h-70 p-2 transition-transform duration-500 text-center border-2 border-neutral-500 rounded-2xl from-yellow-100 to-yellow-200 bg-gradient-to-b`}
    >
      <div
        className={`${
          isFirstSide ? "block" : "hidden"
        } mx-auto p-2 w-35 h-35 border-2 border-neutral-500  bg-yellow-50`}
      >
        <img
          className="w-full h-full"
          src={pokemon.picture}
          alt={pokemon.name}
        />
        <p className="mt-4">{pokemon.name}</p>
      </div>
      <div className={`${!isFirstSide ? "block" : "hidden"}`}>
        <div className="mt-2">
          <p>weight: {pokemon.weight}</p>
          <p>height: {pokemon.height}</p>
          <p>speed: {pokemon.speed}</p>
        </div>
      </div>
    </div>
  );
};

export { PokemonCard };
