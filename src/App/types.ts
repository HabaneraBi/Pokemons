interface GlobalContext {
  openTab: "home" | "pokemons";
  setOpenTab: (tab: "home" | "pokemons") => void;
}

export type { GlobalContext };
