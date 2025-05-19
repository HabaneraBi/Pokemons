import type { FC } from "react";
import { NavItem } from "./Components/NavItem";
import { useContext } from "react";
import { globalContext } from "../../App/App";
import { SearchBox } from "./Components/SearchBox";
import logo from "/src/UI/icons/logoPokemon.svg";

const Header: FC = () => {
  const context = useContext(globalContext);

  return (
    <header className="bg-[#e1fcfc] top-0 sticky z-2 py-2 gap-4 flex flex-col justify-around px-2 items-center sm:flex-row sm:justify-between sm:px-10">
      <img src={logo} className="w-1/3 h-1/2 sm:w-1/5 lg:w-45" />
      <SearchBox />
      <ul className="flex w-3/4 justify-between sm:w-60 xl:mr-25 2xl:mr-40">
        <NavItem isActive={context.openTab === "home"}>HOME</NavItem>
        <NavItem isActive={context.openTab === "pokemons"}>POKEMONS</NavItem>
      </ul>
    </header>
  );
};

export { Header };
