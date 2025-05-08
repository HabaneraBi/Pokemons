import type { FC } from "react";
import type { GlobalContext } from "./types";
import { Header } from "../Modules/Header";
import { useState, createContext } from "react";

const globalContext = createContext<GlobalContext>({
  openTab: "home",
  setOpenTab: () => "",
});

const App: FC = () => {
  const [openTab, setOpenTab] = useState<"home" | "pokemons">("home");

  return (
    <globalContext.Provider value={{ openTab, setOpenTab }}>
      <Header />
    </globalContext.Provider>
  );
};

export { App, globalContext };
