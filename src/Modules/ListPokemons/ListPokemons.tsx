import type { FC } from "react";
import {
  getFullPokemonsInfo,
  getCountAllPokemons,
} from "./api/getFullPokemons";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import type { MainPokemonInfo } from "../../UI/types/types";
import { CardPokemon } from "./components/CardPokemon";
import { globalContext } from "../../App/App";

const ListPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<MainPokemonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [stopCount, setStopCount] = useState(0);

  const pokemonsContainerRef = useRef<HTMLDivElement>(null);

  const context = useContext(globalContext);

  const localPokemons: MainPokemonInfo[] =
    getStorageCards<MainPokemonInfo>("mainInfoForCard");

  useEffect(() => {
    getCountAllPokemons().then((count) => setStopCount(count));
    if (sessionStorage.getItem("mainInfoForCard")) {
      const localPokemons: MainPokemonInfo[] = JSON.parse(
        sessionStorage.getItem("mainInfoForCard")!
      );
      setAllPokemons(filterPokemons(localPokemons, context.searchText));
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    setAllPokemons(filterPokemons(localPokemons, context.searchText));
    // checkLoad();
    setLoading(true);
  }, [context.searchText]);

  useEffect(() => {
    checkLoad();
    if (loading) {
      getFullPokemonsInfo(localPokemons.length)
        .then((info) => {
          setAllPokemons(
            filterPokemons([...allPokemons, ...info], context.searchText)
          );

          sessionStorage.setItem(
            "mainInfoForCard",
            JSON.stringify([...localPokemons, ...info])
          );
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  //запускает загрузку контента, если размер окна пользователя больше контейнера с карточками
  const checkLoad = () => {
    if (
      !loading &&
      pokemonsContainerRef.current &&
      document.documentElement.clientHeight >=
        pokemonsContainerRef.current.scrollHeight
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  });

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        300 &&
      allPokemons.length < stopCount &&
      !loading
    ) {
      setLoading(true);
    }
  };

  return (
    <>
      {allPokemons.length ? (
        <div
          ref={pokemonsContainerRef}
          className="w-4/5 grid grid-cols-1 my-5 gap-y-6 sm:grid-cols-2 sm:w-9/10 sm:gap-x-4 lg:grid-cols-3 2xl:grid-cols-4"
        >
          {allPokemons.map((pokemon, index) => {
            return <CardPokemon key={index} {...pokemon} />;
          })}
        </div>
      ) : (
        <div className="relative top-50 text-2xl">Loading...</div>
      )}
    </>
  );
};

function getStorageCards<T>(key: string): T[] {
  const storage = JSON.parse(sessionStorage.getItem(key)!);

  if (storage) {
    return storage as T[];
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

export { ListPokemons, filterPokemons };
