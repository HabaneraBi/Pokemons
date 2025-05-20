import { useState, useContext, useEffect } from "react";
import { HomePokemonCard } from "./components/HomePokemonCard";
import type { MainPokemonInfo } from "../../UI/types/types";
import { globalContext } from "../../App/context";
import pikachu from "/src/UI/assets/icons/pikachu.jpg";

const getStorageCards = (): MainPokemonInfo[] => {
  try {
    const cards = localStorage.getItem("catchPokemonsInfo");
    return cards ? JSON.parse(cards) : [];
  } catch (e) {
    console.error("Error reading from localStorage:", e);
    return [];
  }
};

export const Home = () => {
  const context = useContext(globalContext);

  const [saveCards, setSaveCards] = useState<MainPokemonInfo[]>(
    getStorageCards()
  );

  useEffect(() => {
    try {
      const scrollStorage = sessionStorage.getItem("homeScrollPosition");
      window.scrollTo(0, scrollStorage ? JSON.parse(scrollStorage) : 0);
    } catch (e) {
      console.error("Error reading from sessionStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (context.searchText) {
      setSaveCards(
        saveCards.filter((pokemon) =>
          pokemon.name.startsWith(context.searchText)
        )
      );
    } else {
      setSaveCards(getStorageCards());
    }
  }, [context.searchText]);

  return (
    <>
      {saveCards.length ? (
        <ul className="p-8 w-full grid grid-cols-1 gap-6 lg:justify-items-center">
          {saveCards.map((pokemonInfo) => (
            <li className="lg:w-240 xl:w-290 2xl:w-330" key={pokemonInfo.name}>
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
            src={pikachu}
          />
          <p className="mt-4 text-2xl text-center">Empty...</p>
        </div>
      )}
    </>
  );
};
