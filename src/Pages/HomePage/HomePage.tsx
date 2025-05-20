import type { FC } from "react";
import { Heading } from "../../Components/Heading";
import { Home } from "../../Modules/Home/Home";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <Heading className="mt-6 text-2xl xl:text-3xl">My Pokemons</Heading>
      <Home />
    </div>
  );
};
