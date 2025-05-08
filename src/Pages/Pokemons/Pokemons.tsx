import type { FC } from "react";
import { Heading } from "../../Components/heading";

const Pokemons: FC = () => {
  return (
    <div className="flex justify-center mt-6">
      <Heading>Lets Catch Pokemon...</Heading>
    </div>
  );
};

export { Pokemons };
