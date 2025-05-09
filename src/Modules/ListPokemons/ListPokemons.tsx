import type { FC } from "react";
import { getFullPokemonsInfo } from "./api/getFullPokemons";
import { useState, useEffect } from "react";
import type { FullPokemonInfo } from "./types";
import { CardPokemon } from "./components/CardPokemon";

const ListAllPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<FullPokemonInfo[]>([]);
  useEffect(() => {
    async function loading() {
      setAllPokemons(await getFullPokemonsInfo());
    }

    loading();
  }, []);

  return (
    <div>
      {allPokemons.map((pokemon, index) => {
        return <CardPokemon key={index} {...pokemon} />;
      })}
    </div>
  );
};

export { ListAllPokemons };
