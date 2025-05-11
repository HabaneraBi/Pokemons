import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext, useEffect } from "react";
import { Pokemons } from "../Pages/Pokemons/Pokemons";
import { Home } from "../Pages/HomePage/Home";

const globalContext = createContext<GlobalContext>({
  openTab: "pokemons",
  setOpenTab: () => "",
});

const PAGES = ["home", "pokemons"] as const;
type pages = (typeof PAGES)[number];

const App: FC = () => {
  const [openTab, setOpenTab] = useState<pages>("pokemons");

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
      {openTab === "pokemons" ? <Pokemons /> : <Home keyStorage="homeCards" />}
    </globalContext.Provider>
  );
};

export { App, globalContext };
