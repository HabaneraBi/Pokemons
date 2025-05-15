import { type FC, useEffect, useState } from "react";
import { HomePokemonCard } from "./components/HomePokemonCard";
import "../../index.css";
import type { MainPokemonInfo } from "../../UI/types/types";

const Home: FC = () => {
  const [saveCards, setSaveCards] = useState<MainPokemonInfo[]>([]);
  useEffect(() => {
    const cards = localStorage.getItem("catchPokemonsInfo");
    setSaveCards(cards ? JSON.parse(cards) : []);
  }, []);

  return (
    <>
      {saveCards.length ? (
        <ul
          className="p-8 grid grid-cols-1 gap-6
    lg:px-16
    xl:px-20"
        >
          {saveCards.map((pokemonInfo, index) => (
            <li key={index}>
              <HomePokemonCard
                saveCards={saveCards}
                setSaveCards={setSaveCards}
                pokemon={pokemonInfo}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 w-4/5 mx-auto flex justify-center items-center flex-col">
          <img
            className="size-auto rounded-2xl shadow-xl min-[480px]:size-100"
            src="src/UI/icons/pikachu.jpg"
          />
          <p className="mt-4 text-2xl text-center">Empty...</p>
        </div>
      )}
    </>
  );
};

export { Home };
