interface GlobalContext {
  openTab: "home" | "pokemons";
  setOpenTab: React.Dispatch<React.SetStateAction<"home" | "pokemons">>;
}

export type { GlobalContext };
