import type { FC } from "react";
import {
  getFullPokemonsInfo,
  getCountAllPokemons,
} from "./api/getFullPokemons";
import { useState, useEffect, useCallback, useContext } from "react";
import type { MainPokemonInfo } from "../../UI/types/types";
import { CardPokemon } from "./components/CardPokemon";
import { all } from "axios";
import { globalContext } from "../../App/App";

const ListPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<MainPokemonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); //можно попробовать заменить на ref
  const [stopCount, setStopCount] = useState(0);

  const context = useContext(globalContext);

  useEffect(() => {
    getCountAllPokemons().then((count) => setStopCount(count));
    if (sessionStorage.getItem("mainInfoForCard")) {
      const localPokemons: MainPokemonInfo[] = JSON.parse(
        sessionStorage.getItem("mainInfoForCard")!
      );
      setAllPokemons(filterPokemons(localPokemons, context.searchText));

      setOffset(JSON.parse(sessionStorage.getItem("offset")!));
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    setAllPokemons(filterPokemons(getStorageInfo(), context.searchText));
  }, [context.searchText]);

  useEffect(() => {
    if (loading) {
      getFullPokemonsInfo(offset)
        .then((info) => {
          setAllPokemons(
            filterPokemons([...allPokemons, ...info], context.searchText)
          );

          setOffset((prev) => {
            sessionStorage.setItem("offset", JSON.stringify(prev + 20));
            return prev + 20;
          });

          sessionStorage.setItem(
            "mainInfoForCard",
            JSON.stringify([...getStorageInfo(), ...info])
          );
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  });

  const scrollHandler = useCallback(() => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        300 &&
      allPokemons.length < stopCount &&
      !loading
    ) {
      setLoading(true);
    }
  }, [allPokemons, stopCount, loading]);

  return (
    <div className="w-4/5 grid grid-cols-1 my-5 gap-y-6 sm:grid-cols-2 sm:w-9/10 sm:gap-x-4 lg:grid-cols-3 2xl:grid-cols-4">
      {allPokemons.map((pokemon, index) => {
        return <CardPokemon key={index} {...pokemon} />;
      })}
    </div>
  );
};

function getStorageInfo(): MainPokemonInfo[] {
  const storage = JSON.parse(sessionStorage.getItem("mainInfoForCard")!);

  if (storage) {
    return storage as MainPokemonInfo[];
  } else {
    return [];
  }
}

function filterPokemons(
  pokemons: MainPokemonInfo[],
  filter: string | null
): MainPokemonInfo[] {
  if (filter) {
    return pokemons.filter((pokemon) => pokemon.name.includes(filter));
  } else {
    return pokemons;
  }
}

export { ListPokemons };
