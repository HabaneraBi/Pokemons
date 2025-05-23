import { Header } from "../Modules/Header/Header";
import { useState, useEffect } from "react";
import { Pokemons } from "../Pages/PokemonsPage/PokemonsPage";
import { HomePage } from "../Pages/HomePage/HomePage";
import {
  getAllPokemonsNames,
  getCountAllPokemons,
} from "../Modules/ListPokemons/api/getFullPokemons";
import { globalContext } from "./context";
import type { TabPokemons, PokemonName } from "./types";

enum Pages {
  HOME = "home",
  POKEMONS = "pokemons",
}

const PAGES = Object.values(Pages);

export const App = () => {
  const [openTab, setOpenTab] = useState<TabPokemons>("home");
  const [searchText, setSearchText] = useState("");
  const [allPokemonsNames, setAllPokemonsNames] = useState<PokemonName[]>([]);
  const [stopCount, setStopCount] = useState(0);

  useEffect(() => {
    const sessionPage = sessionStorage.getItem("page");
    if (
      sessionPage &&
      openTab !== sessionPage &&
      PAGES.includes(sessionPage as Pages)
    ) {
      setOpenTab(sessionPage as TabPokemons);
    } else {
      sessionStorage.setItem("page", openTab);
    }

    getAllPokemonsNames().then((data) => setAllPokemonsNames(data));
    getCountAllPokemons().then((count) => setStopCount(count));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", openTab);
  }, [openTab]);

  return (
    <globalContext.Provider
      value={{
        openTab,
        setOpenTab,
        searchText,
        setSearchText,
        allPokemonsNames,
        stopCount,
      }}
    >
      <Header />
      {openTab === "pokemons" ? <Pokemons /> : <HomePage />}
    </globalContext.Provider>
  );
};
