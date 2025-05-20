import { createContext } from "react";
import type { GlobalContext } from "./types";

export const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
  searchText: "",
  setSearchText: () => "",
  allPokemonsNames: [],
  stopCount: 0,
});
