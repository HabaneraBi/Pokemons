import type { FC } from "react";
import { Heading } from "../../Components/Heading";
import { ListPokemons } from "../../Modules/ListPokemons/ListPokemons";

const Pokemons: FC = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <Heading className="text-2xl">Lets Catch Pokemon...</Heading>
      <ListPokemons />
    </div>
  );
};

export { Pokemons };
