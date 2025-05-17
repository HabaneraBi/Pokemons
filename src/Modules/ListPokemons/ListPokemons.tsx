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

  const context = useContext(globalContext);

  console.log("render");

  const localPokemons: MainPokemonInfo[] =
    getStorageCards<MainPokemonInfo>("mainInfoForCard");

  useEffect(() => {
    getCountAllPokemons().then((count) => setStopCount(count));
    setLoading(true);
  }, []);

  useEffect(() => {
    setAllPokemons(filterPokemons(localPokemons, context.searchText));
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
    } else {
      document.addEventListener("scroll", checkLoad);
      return () => document.removeEventListener("scroll", checkLoad);
    }
  }, [loading, context.searchText]);

  //запускает загрузку контента, если размер контейера карточек от видимого верха до низа документа меньше размера окна пользователя
  const checkLoad = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (
      !loading &&
      stopCount != localPokemons.length &&
      scrollTop + clientHeight >= scrollHeight * 0.7
    ) {
      setLoading(true);
    }
  };

  return (
    <>
      {allPokemons.length ? (
        <div className="w-4/5 grid grid-cols-1 my-5 gap-y-6 sm:grid-cols-2 sm:w-9/10 sm:gap-x-4 lg:grid-cols-3 2xl:grid-cols-4">
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
