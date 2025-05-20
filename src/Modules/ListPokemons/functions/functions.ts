import type { MainPokemonInfo } from "../../../UI/types/types";
import type { Dispatch, SetStateAction } from "react";

export const getArrFromStorage = (): MainPokemonInfo[] => {
  try {
    const arrCatchPokemonsStorage = localStorage.getItem("catchPokemonsInfo");

    return arrCatchPokemonsStorage ? JSON.parse(arrCatchPokemonsStorage) : [];
  } catch (e) {
    console.error("Error reading from localStorage:", e);
    return [];
  }
};

export function catchPokemonHandler(
  catched: boolean,
  pokemon: MainPokemonInfo,
  setCatched: Dispatch<SetStateAction<boolean>>
) {
  const arrCatchPokemons = getArrFromStorage();
  if (!catched) {
    if (arrCatchPokemons.length) {
      localStorage.setItem(
        "catchPokemonsInfo",
        JSON.stringify([...arrCatchPokemons, pokemon])
      );
    } else {
      localStorage.setItem("catchPokemonsInfo", JSON.stringify([pokemon]));
    }
    setCatched(true);
  } else {
    if (arrCatchPokemons.length) {
      const newStorage: [] | MainPokemonInfo[] = arrCatchPokemons.filter(
        (pokemonStorage) => pokemonStorage.name !== pokemon.name
      );

      if (newStorage.length) {
        localStorage.setItem("catchPokemonsInfo", JSON.stringify(newStorage));
      } else {
        localStorage.removeItem("catchPokemonsInfo");
      }
    }
    setCatched(false);
  }
}
