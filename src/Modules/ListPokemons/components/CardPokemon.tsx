import type { FC } from "react";
import type { FullPokemonInfo } from "../../../UI/types/types";
import { Heading } from "../../../Components/heading";
import { Paragraph } from "../../../Components/Paragraph";
import { Button } from "../../../Components/Button";

const CardPokemon: FC<FullPokemonInfo> = (pokemon) => {
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
      <div className="flex justify-between w-9/10">
        <Button padding="p-1" width="w-9/20">
          CATCH POKEMON
        </Button>
        <Button padding="p-1" width="w-9/20">
          MORE DETAILS
        </Button>
      </div>
    </div>
  );
};

export { CardPokemon };
