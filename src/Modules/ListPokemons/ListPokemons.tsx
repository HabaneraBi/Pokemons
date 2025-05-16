import type { FC } from "react";
import {
  getFullPokemonsInfo,
  getCountAllPokemons,
} from "./api/getFullPokemons";
import { useState, useEffect } from "react";
import type { MainPokemonInfo } from "../../UI/types/types";
import { CardPokemon } from "./components/CardPokemon";

const ListPokemons: FC = () => {
  const [allPokemons, setAllPokemons] = useState<MainPokemonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  useEffect(() => {
    getCountAllPokemons().then((count) => setStopCount(count));
    if (sessionStorage.getItem("mainInfoForCard")) {
      setAllPokemons(JSON.parse(sessionStorage.getItem("mainInfoForCard")!));
      setOffset(JSON.parse(sessionStorage.getItem("offset")!));
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      getFullPokemonsInfo(offset)
        .then((info) => {
          setAllPokemons([...allPokemons, ...info]);

          setOffset((prev) => {
            sessionStorage.setItem("offset", JSON.stringify(prev + 20));
            return prev + 20;
          });

          sessionStorage.setItem(
            "mainInfoForCard",
            JSON.stringify([...allPokemons, ...info])
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

export { ListPokemons };
