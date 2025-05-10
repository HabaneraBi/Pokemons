import type { FC } from "react";
import { getFullPokemonsInfo } from "./api/getFullPokemons";
import { useState, useEffect } from "react";
import type { FullPokemonInfo } from "./types";
import { CardPokemon } from "./components/CardPokemon";

const ListAllPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<FullPokemonInfo[]>([]);
  useEffect(() => {
    if (localStorage.getItem("mainInfoForCard")) {
      setAllPokemons(JSON.parse(localStorage.getItem("mainInfoForCard")!));
    } else {
      async function loading() {
        setAllPokemons(await getFullPokemonsInfo());
        localStorage.setItem("mainInfoForCard", JSON.stringify(allPokemons));
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
