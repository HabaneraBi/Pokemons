import { type FC, useState } from "react";
import { useContext, useEffect } from "react";
import { HomePokemonCard } from "./components/HomePokemonCard";
import "../../index.css";
import type { MainPokemonInfo } from "../../UI/types/types";
import { filterPokemons } from "../ListPokemons/ListPokemons";
import { globalContext } from "../../App/App";

const Home: FC = () => {
  const context = useContext(globalContext);
  function getStorageCards(): MainPokemonInfo[] {
    const cards = localStorage.getItem("catchPokemonsInfo");
    return cards ? JSON.parse(cards) : [];
  }
  const [saveCards, setSaveCards] = useState<MainPokemonInfo[]>(() => {
    const cards = localStorage.getItem("catchPokemonsInfo");
    return cards ? JSON.parse(cards) : [];
  });

  // let saveCards: MainPokemonInfo[] = filterPokemons(
  //   getStorageCards(),
  //   context.searchText
  // );

  // useEffect(() => {
  //   saveCards = filterPokemons(getStorageCards(), context.searchText);
  // }, [context.searchText]);

  return (
    <>
      {saveCards.length ? (
        <ul className="p-8 w-full grid grid-cols-1 gap-6 lg:justify-items-center">
          {saveCards.map((pokemonInfo, index) => (
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
