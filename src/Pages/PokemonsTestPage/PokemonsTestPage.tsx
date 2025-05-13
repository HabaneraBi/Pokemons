import { useEffect, useRef, useState } from "react";
import { HomePokemonCard } from "../../Components/HomePokemonCard";
import type {
  FullPokemonInfo,
  ShortPokemonInfo,
} from "../../Modules/ListPokemons/types";
import "../../index.css";
import axios from "axios";

const LOCAL_POKEMONS_KEY: string = "pokemonsTest";

// const testers: FullPokemonInfo[] = [
//   {
//     name: "bulbasaur",
//     height: 7,
//     weight: 69,
//     speed: 45,
//     abilities: ["grass", "poison"],
//     imageUrl:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
//   },
//   {
//     name: "Cow",
//     height: 150,
//     weight: 200,
//     speed: 30,
//     abilities: ["muuu"],
//     imageUrl:
//       "https://i.pinimg.com/originals/dd/93/e3/dd93e3e54b41b02b91a1f2058777b622.gif",
//   },
//   {
//     name: "Dancer dog",
//     height: 30,
//     weight: 20,
//     speed: 35,
//     abilities: ["dance"],
//     imageUrl:
//       "https://i.pinimg.com/originals/01/d9/a4/01d9a44af5aa852624b87f8f280f4942.gif",
//   },
//   {
//     name: "Dancer cat",
//     height: 35,
//     weight: 5,
//     speed: 60,
//     abilities: ["dance"],
//     imageUrl:
//       "https://i.pinimg.com/originals/48/c9/52/48c9522aaa31a27582216bec737e92ce.gif",
//   },
//   {
//     name: "Questioning cat",
//     height: 40,
//     weight: 10,
//     speed: 50,
//     abilities: ["question"],
//     imageUrl:
//       "https://media1.giphy.com/media/wTpkLqAZf3NFcgzQ4J/200w.gif?cid=6c09b952vwge23e9uo88dn678vdx79zmu2mq2z4liab2qtxk&ep=v1_stickers_search&rid=200w.gif&ct=s",
//   },
// ];

// localStorage.setItem(LOCAL_POKEMONS_KEY, JSON.stringify(testers));

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
        document.body.offsetHeight - 100
      ) {
        loadPokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);
    // loadPokemons();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  // .then((response) => response.data.results)
  // .catch(() => new Error("get pokemons error"));
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
      // pokemons.push(response.data);
      pokemons.push(pokemon);
    } catch (error) {
      console.warn(`Ошибка при запросе на ${pokemonInfo.name}`, error);
    }
  }
  return pokemons;
}

export { PokemonsTestPage };
