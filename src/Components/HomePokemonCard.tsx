import { Button } from "./Button";
import { Paragraph } from "./Paragraph";
import { Heading } from "./heading";
import type { FullPokemonInfo } from "../Modules/ListPokemons/types";
import "../index.css";

const HomePokemonCard = (pokemon: FullPokemonInfo) => {
  return (
    <div
      className="flex flex-col w-full py-3 h-100 justify-around scale-100 transition-transform duration-75 ease-in items-center bg-[#E6E6E6] rounded-2xl hover:scale-102
    sm:grid grid-cols-[1fr_2fr_0.9fr_0.1fr] sm:justify-between sm:p-6 sm:h-auto"
    >
      <div
        className="w-40
      sm:w-35"
      >
        <img
          className="w-auto h-auto"
          src={pokemon.imageUrl}
          alt={`image - ${pokemon.name}`}
        />
      </div>

      <div
        className="flex flex-col items-center
      sm:gap-2 sm:justify-center"
      >
        <Heading size="text-2xl">{pokemon.name}</Heading>
        <Paragraph width="w-auto px-6">
          {pokemon.abilities?.join(", ")}
        </Paragraph>
      </div>

      <div
        className="flex justify-around w-9/10
      sm:flex-col sm:w-auto"
      >
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Speed: {pokemon.speed}</p>
      </div>
      <div
        className="flex w-full px-10 justify-center
      sm:px-0 sm:w-auto"
      >
        <Button padding="p-2" width="w-60 sm:w-30">
          Remove
        </Button>
      </div>
    </div>
  );
};

export { HomePokemonCard };
