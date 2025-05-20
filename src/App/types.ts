import type { Dispatch, SetStateAction } from "react";

export type TabPokemons = "home" | "pokemons";

export type PokemonName = {
  name: string;
  url: string;
};

export type GlobalContext = {
  openTab: TabPokemons;
  setOpenTab: Dispatch<SetStateAction<TabPokemons>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  allPokemonsNames: PokemonName[];
  stopCount: number;
};
