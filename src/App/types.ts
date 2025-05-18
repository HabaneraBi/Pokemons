import type React from "react";

interface GlobalContext {
  openTab: "home" | "pokemons";
  setOpenTab: React.Dispatch<React.SetStateAction<"home" | "pokemons">>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  allPokemonsNames: { name: string; url: string }[];
}

export type { GlobalContext };
