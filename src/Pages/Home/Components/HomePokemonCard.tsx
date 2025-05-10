import { Button } from "../../../Components/Button";
import { Paragraph } from "../../../Components/Paragraph";
import { Heading } from "../../../Components/heading";
import type { FullPokemonInfo } from "../../../Modules/ListPokemons/types";
import "../../../index.css";

const HomePokemonCard = (pokemon: FullPokemonInfo) => {
  return (
    <div className="flex flex-col w-full py-3 h-100 justify-around scale-100 transition-transform duration-75 ease-in items-center bg-[#E6E6E6] rounded-2xl hover:scale-102">
      <img
        className="w-40 h-2/5"
        src={pokemon.imageUrl}
        alt={`image - ${pokemon.name}`}
      />
      <Heading size="text-2xl">{pokemon.name}</Heading>
      <Paragraph width="w-3/4">{pokemon.abilities?.join(", ")}</Paragraph>
      <div className="flex justify-around w-9/10">
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Speed: {pokemon.speed}</p>
      </div>
      <div className="flex justify-center">
        <Button padding="p-2" width="w-full">
          Remove
        </Button>
      </div>
    </div>
  );
};

export { HomePokemonCard };
