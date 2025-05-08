import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header/Header";
import { useState, createContext } from "react";
import { Pokemons } from "../Pages/Pokemons/Pokemons";
import { Home } from "../Pages/Home/Home";

const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
});

const App: FC = () => {
  console.log("rerender");
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("home");

  return (
    <globalContext.Provider value={{ openTab, setOpenTab }}>
      <Header />
      {openTab === "pokemons" ? <Pokemons /> : <Home />}
    </globalContext.Provider>
  );
};

export { App, globalContext };
