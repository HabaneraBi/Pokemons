import { useContext, useEffect, type FC } from "react";
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

  let saveCards: MainPokemonInfo[] = filterPokemons(
    getStorageCards(),
    context.searchText
  );

  useEffect(() => {
    saveCards = filterPokemons(getStorageCards(), context.searchText);
  }, [context.searchText]);

  return (
    <>
      {saveCards.length ? (
        <ul className="p-8 grid grid-cols-1 gap-6">
          {saveCards.map((pokemonInfo, index) => (
            <li className="lg:px-32" key={index}>
              <HomePokemonCard {...pokemonInfo} />
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
