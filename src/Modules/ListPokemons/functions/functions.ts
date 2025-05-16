import type { MainPokemonInfo } from "../../../UI/types/types";

const getArrFromStorage = () => {
  const arrCatchPokemonsStorage: null | string =
    localStorage.getItem("catchPokemonsInfo");
  if (arrCatchPokemonsStorage) {
    return JSON.parse(arrCatchPokemonsStorage) as MainPokemonInfo[];
  }
};

function catchPokemonHandler(
  catched: boolean,
  pokemon: MainPokemonInfo,
  setCatched: (catched: boolean) => void
) {
  const arrCatchPokemons = getArrFromStorage();
  if (!catched) {
    if (arrCatchPokemons) {
      localStorage.setItem(
        "catchPokemonsInfo",
        JSON.stringify([...arrCatchPokemons, pokemon])
      );
    } else {
      localStorage.setItem("catchPokemonsInfo", JSON.stringify([pokemon]));
    }
    setCatched(true);
  } else {
    if (arrCatchPokemons) {
      const newStorage: [] | MainPokemonInfo[] = arrCatchPokemons.filter(
        (pokemonStorage) => {
          if (pokemonStorage.name !== pokemon.name) {
            return pokemonStorage;
          }
        }
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

export { getArrFromStorage, catchPokemonHandler };
