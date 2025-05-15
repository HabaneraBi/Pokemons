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
        <ul className="p-8 w-full grid grid-cols-1 gap-6 lg:justify-items-center">
          {saveCards.map((pokemonInfo, index) => (
            // lg:px-32
            <li className="lg:w-240 xl:w-290 2xl:w-330" key={index}>
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
