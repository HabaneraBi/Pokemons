import type { FC } from "react";
import { getFullPokemonsInfo } from "./api/getFullPokemons";
import { useState, useEffect } from "react";
import type { FullPokemonInfo } from "./types";
import { CardPokemon } from "./components/CardPokemon";
import { all } from "axios";

const ListAllPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<FullPokemonInfo[]>([]);
  useEffect(() => {
    if (localStorage.getItem("mainInfoForCard")) {
      setAllPokemons(JSON.parse(localStorage.getItem("mainInfoForCard")!));
    } else {
      async function loading() {
        const pokemons = await getFullPokemonsInfo();
        setAllPokemons(pokemons);
        localStorage.setItem("mainInfoForCard", JSON.stringify(pokemons));
      }
      loading();
    }
  }, []);

  return (
    <div className="w-4/5 grid grid-cols-1 my-5 gap-y-6 sm:grid-cols-2 sm:w-9/10 sm:gap-x-4 lg:grid-cols-3 2xl:grid-cols-4">
      {allPokemons.map((pokemon, index) => {
        return <CardPokemon key={index} {...pokemon} />;
      })}
    </div>
  );
};

export { ListAllPokemons };
