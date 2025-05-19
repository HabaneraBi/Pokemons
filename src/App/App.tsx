import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext, useEffect } from "react";
import { Pokemons } from "../Pages/PokemonsPage/PokemonsPage";
import { HomePage } from "../Pages/HomePage/HomePage";
import {
  getAllPokemonsNames,
  getCountAllPokemons,
} from "../Modules/ListPokemons/api/getFullPokemons";

const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
  searchText: "",
  setSearchText: () => "",
  allPokemonsNames: [],
  stopCount: 0,
});

const PAGES = ["home", "pokemons"] as const;
type pages = (typeof PAGES)[number];

const App: FC = () => {
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("home");
  const [searchText, setSearchText] = useState<string>("");
  const [allPokemonsNames, setAllPokemonsNames] = useState<
    { name: string; url: string }[]
  >([]);
  const [stopCount, setStopCount] = useState<number>(0);

  useEffect(() => {
    const sessionPage = sessionStorage.getItem("page");
    if (
      sessionPage &&
      openTab !== sessionPage &&
      PAGES.includes(sessionPage as pages)
    ) {
      setOpenTab(sessionPage as pages);
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

export { App, globalContext };
