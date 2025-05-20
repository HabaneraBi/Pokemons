import {
  getFullPackageInfo,
  getFullForFilterInfo,
} from "./api/getFullPokemons";
import { useState, useEffect, useContext } from "react";
import type { MainPokemonInfo } from "../../UI/types/types";
import { CardPokemon } from "./components/CardPokemon";
import { globalContext } from "../../App/context";

const getStorageCards = (): MainPokemonInfo[] => {
  try {
    const cards = sessionStorage.getItem("mainInfoForCard");
    return cards ? JSON.parse(cards) : [];
  } catch (e) {
    console.log("Error reading from sessionStorage:", e);
    return [];
  }
};

export const ListPokemons = () => {
  const [allPokemons, setAllPokemons] = useState<MainPokemonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [allowSaveScroll, setAllowSaveScroll] = useState(true);
  const [emtyResults, setEmptyResults] = useState("Loading...");
  const context = useContext(globalContext);

  function filterPokemons() {
    const searchInfo = context.allPokemonsNames.filter((pokemon) =>
      pokemon.name.startsWith(context.searchText)
    );
    getFullForFilterInfo(searchInfo).then((info) => {
      setAllPokemons(info);
      setEmptyResults("not found :(");
    });
  }

  useEffect(() => {
    if (context.searchText) {
      filterPokemons();
      setLoading(false);
    } else {
      setAllPokemons(getStorageCards());
    }
  }, [context.searchText]);

  useEffect(() => {
    if (sessionStorage.getItem("pokemonsScrollPosition")) {
      if (allPokemons.length > 0 && allowSaveScroll) {
        const scrollPosition: number = JSON.parse(
          sessionStorage.getItem("pokemonsScrollPosition")!
        );
        window.scrollTo(0, scrollPosition);
        setAllowSaveScroll(false);
      }
    } else {
      setAllowSaveScroll(false);
    }
  }, [allPokemons]);

  useEffect(() => {
    if (getStorageCards().length) {
      setAllPokemons(getStorageCards());
    } else {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      getFullPackageInfo(getStorageCards().length)
        .then((info) => {
          setAllPokemons([...getStorageCards(), ...info]);
          sessionStorage.setItem(
            "mainInfoForCard",
            JSON.stringify([...getStorageCards(), ...info])
          );
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    document.addEventListener("scroll", checkLoad);

    return () => document.removeEventListener("scroll", checkLoad);
  });

  const checkLoad = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (
      !loading &&
      context.stopCount != getStorageCards().length &&
      scrollTop + clientHeight >= scrollHeight * 0.7 &&
      context.searchText === "" &&
      !allowSaveScroll
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
        <div className="relative top-50 text-2xl">{emtyResults}</div>
      )}
    </>
  );
};
