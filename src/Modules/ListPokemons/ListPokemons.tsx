import type { FC } from "react";
import { getFullPokemonsInfo } from "./api/getFullPokemons";
import { useState, useEffect, useCallback } from "react";
import type { FullPokemonInfo } from "../../UI/types/types";
import { CardPokemon } from "./components/CardPokemon";

const ListPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<FullPokemonInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  useEffect(() => {
    if (loading) {
      getFullPokemonsInfo(offset)
        .then((data) => {
          setStopCount(data[0]);
          const fullPokemonInfo: FullPokemonInfo[] = data.slice(
            1
          ) as FullPokemonInfo[];
          setAllPokemons([...allPokemons, ...fullPokemonInfo]);
          setOffset((prev) => prev + 20);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
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

  // useEffect(() => {
  //   if (localStorage.getItem("mainInfoForCard")) {
  //     setAllPokemons(JSON.parse(localStorage.getItem("mainInfoForCard")!));
  //   } else {
  //     async function loading() {
  //       const info = await getFullPokemonsInfo();
  //       setAllPokemons(info);
  //       localStorage.setItem("mainInfoForCard", JSON.stringify(info));
  //     }
  //     loading();
  //   }
  // }, []);

  return (
    <div className="w-4/5 grid grid-cols-1 my-5 gap-y-6 sm:grid-cols-2 sm:w-9/10 sm:gap-x-4 lg:grid-cols-3 2xl:grid-cols-4">
      {allPokemons.map((pokemon, index) => {
        return <CardPokemon key={index} {...pokemon} />;
      })}
    </div>
  );
};

export { ListPokemons };
