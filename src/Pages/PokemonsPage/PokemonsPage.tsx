import { ListPokemons } from "../../Modules/ListPokemons/ListPokemons";
import { Heading } from "../../Components/Heading";

export const Pokemons = () => {
  return (
    <div className="flex flex-col items-center mt-6">
      <Heading className="text-2xl">Lets Catch Pokemon...</Heading>
      <ListPokemons />
    </div>
  );
};
