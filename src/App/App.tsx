import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext } from "react";
import { Pokemons } from "../Pages/Pokemons/Pokemons";
import { Home } from "../Pages/Home/Home";

const globalContext = createContext<GlobalContext>({
  openTab: "pokemons",
  setOpenTab: () => "",
});

const App: FC = () => {
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("pokemons");

  return (
    <globalContext.Provider value={{ openTab, setOpenTab }}>
      <Header />
      {openTab === "pokemons" ? <Pokemons /> : <Home />}
    </globalContext.Provider>
  );
};

export { App, globalContext };
