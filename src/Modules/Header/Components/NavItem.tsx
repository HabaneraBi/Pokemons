import type { FC, PropsWithChildren } from "react";
import { globalContext } from "../../../App/App";
import { useContext } from "react";

interface NavItemProps {
  isActive: boolean;
}

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  isActive,
  children,
}) => {
  const context = useContext(globalContext);

  const clickHandler = () => {
    const scrollPosition = JSON.stringify(document.documentElement.scrollTop);
    if (context.openTab === "home") {
      sessionStorage.setItem("homeScrollPosition", scrollPosition);
      context.setOpenTab("pokemons");
    } else {
      sessionStorage.setItem("pokemonsScrollPosition", scrollPosition);
      context.setOpenTab("home");
    }
  };

  return (
    <li
      onClick={clickHandler}
      className={`text-xl ${
        isActive && "text-[#3478ff]"
      } cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#5B91FD] xl:text-[22px]`}
    >
      <span
        className={`group relative ${
          isActive && "after:scale-x-100"
        } after:scale-x-0 after:transition-transform after:duration-150 after:ease-linear after:absolute
          after:w-full after:h-[2px] after:top-6 after:left-0 after:bg-[#3478ff] xl:after:top-7`}
      >
        {children}
      </span>
    </li>
  );
};

export { NavItem };
