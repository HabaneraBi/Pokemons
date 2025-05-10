import type { FC } from "react";
import { Heading } from "../../Components/heading";
import { ListAllPokemons } from "../../Modules/ListPokemons/ListPokemons";

const Pokemons: FC = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <Heading size="text-xl">Lets Catch Pokemon...</Heading>
      <ListAllPokemons />
    </div>
  );
};

export { Pokemons };
