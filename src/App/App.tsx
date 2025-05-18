import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext, useEffect } from "react";
import { Pokemons } from "../Pages/PokemonsPage/PokemonsPage";
import { HomePage } from "../Pages/HomePage/HomePage";
import { getAllPokemonsNames } from "../Modules/ListPokemons/api/getFullPokemons";

const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
  searchText: "",
  setSearchText: () => "",
  allPokemonsNames: [],
});

const PAGES = ["home", "pokemons"] as const;
type pages = (typeof PAGES)[number];

const App: FC = () => {
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("home");
  const [searchText, setSearchText] = useState<string>("");
  const [allPokemonsNames, setAllPokemonsNames] = useState<
    { name: string; url: string }[]
  >([]);
  // console.log("render App");

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
      }}
    >
      <Header />
      {openTab === "pokemons" ? <Pokemons /> : <HomePage />}
    </globalContext.Provider>
  );
};

export { App, globalContext };
