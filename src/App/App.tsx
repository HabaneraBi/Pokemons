import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext, useEffect } from "react";
import { Pokemons } from "../Pages/PokemonsPage/PokemonsPage";
import { HomePage } from "../Pages/HomePage/HomePage";

const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
});

const PAGES = ["home", "pokemons"] as const;
type pages = (typeof PAGES)[number];

const App: FC = () => {
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("home");

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
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", openTab);
  }, [openTab]);

  return (
    <globalContext.Provider value={{ openTab, setOpenTab }}>
      <Header />
      {openTab === "pokemons" ? (
        <Pokemons />
      ) : (
        <HomePage keyStorage="catchPokemonsInfo" />
      )}
    </globalContext.Provider>
  );
};

export { App, globalContext };
