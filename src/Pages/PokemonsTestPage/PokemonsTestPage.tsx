import { useEffect, useRef, useState } from "react";
import { HomePokemonCard } from "../../Components/HomePokemonCard";
import type {
  FullPokemonInfo,
  ShortPokemonInfo,
} from "../../Modules/ListPokemons/types";
import "../../index.css";
import axios from "axios";

const LOCAL_POKEMONS_KEY: string = "pokemonsTest";

const PokemonsTestPage = () => {
  const [scrollPosistion, setScrollPosition] = useState(0);
  const [localPokemons, setLocalPokemons] = useState(
    getLocalPokemonCards(LOCAL_POKEMONS_KEY)
  );

  const loadPokemons = async () => {
    const pokemonLinks = await getPokemonLinks(localPokemons.length).then(
      (response) => response.data.results
    );

    const newPokemonList: FullPokemonInfo[] = localPokemons
      .slice()
      .concat(await getPokemonsList(pokemonLinks));

    sessionStorage.setItem(LOCAL_POKEMONS_KEY, JSON.stringify(newPokemonList));
    setLocalPokemons(newPokemonList);
  };

  if (localPokemons.length === 0) {
    loadPokemons();
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadPokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // loadPokemons();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosistion]);

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 p-4 w-fit">
      {localPokemons.map((pokemon, index) => (
        <HomePokemonCard key={index} {...pokemon} />
      ))}
    </div>
  );
};

function getLocalPokemonCards(key: string): FullPokemonInfo[] {
  const rawPokemons: string | null = sessionStorage.getItem(key);
  if (rawPokemons) {
    return JSON.parse(rawPokemons);
  } else {
    return [];
  }
}

//запрашивает покемонов из диапазона
async function getPokemonLinks(localPokemonsCount: number) {
  return await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${localPokemonsCount}&limit=20`
  );
}

async function getPokemonsList(pokemonLinks: ShortPokemonInfo[]) {
  const pokemons: FullPokemonInfo[] = [];

  for (const pokemonInfo of pokemonLinks) {
    try {
      const response = await axios.get<FullPokemonInfo>(pokemonInfo.url);
      const pokemon: FullPokemonInfo = {
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        speed: response.data.stats[0].base_stat,
        abilities: response.data.types.map((types) => types.type.name),
        imageUrl: response.data.sprites.other.dream_world.front_default,
      };
      pokemons.push(pokemon);
    } catch (error) {
      console.warn(`Ошибка при запросе на ${pokemonInfo.name}`, error);
    }
  }
  return pokemons;
}

export { PokemonsTestPage };
