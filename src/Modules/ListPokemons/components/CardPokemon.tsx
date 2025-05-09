import type { FC } from "react";
import type { FullPokemonInfo } from "../types";
import { Heading } from "../../../Components/Heading";
import { Paragraph } from "../../../Components/Paragraph";
import { Button } from "../../../Components/Button";

const CardPokemon: FC<FullPokemonInfo> = (pokemon) => {
  return (
    <div className="flex flex-col w-25">
      <img src={pokemon.imageUrl} alt={`image - ${pokemon.name}`} />
      <Heading size="text-xl">{pokemon.name}</Heading>
      <Paragraph width="w-20">{pokemon.abilities?.join(", ")}</Paragraph>
      <div className="flex justify-between">
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Speed: {pokemon.speed}</p>
      </div>
      <div className="flex justify-between">
        <Button width="w-10">CATCH POKEMON</Button>
        <Button width="w-10">MORE DETAILS</Button>
      </div>
    </div>
  );
};

export { CardPokemon };
