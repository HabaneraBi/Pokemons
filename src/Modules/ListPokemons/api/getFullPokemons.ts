import axios from "axios";
import type { MainPokemonInfo, ModalInfo } from "../../../UI/types/types";

interface InfoFromRequestGroupCards {
  name: string;
  url: string;
  count: number;
}

interface TypeRequestForMainInfo {
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      home: { front_default: string };
    };
  };
  height: number;
  weight: number;
  stats: { base_stat: number }[];
}

interface TypeRequestForModal {
  base_experience: number;
  stats: { base_stat: number }[];
  moves: { move: { name: string } }[];
}

export async function getCountAllPokemons(): Promise<number> {
  const responseCount = await axios.get("https://pokeapi.co/api/v2/pokemon/");
  return responseCount.data.count as number;
}

async function getShortPokemonsInfo(
  offset: number
): Promise<InfoFromRequestGroupCards[]> {
  const requestShort = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
  return requestShort.data.results;
}

export async function getFullPokemonsInfo(
  offset: number
): Promise<MainPokemonInfo[]> {
  const shortPokemonsInfo = await getShortPokemonsInfo(offset);

  const fullPokemonsInfo: MainPokemonInfo[] = await Promise.all(
    shortPokemonsInfo.map(async (pokemon) => {
      const requsetForFullInfo = await axios.get(pokemon.url);
      const fullInfo: TypeRequestForMainInfo = requsetForFullInfo.data;

      const imageUrl =
        fullInfo.sprites.other.dream_world.front_default ??
        fullInfo.sprites.front_default ??
        fullInfo.sprites.other.home.front_default ??
        "No picture :(";

      return {
        name: pokemon.name,
        abilities: fullInfo.types.map((type) => type.type.name),
        imageUrl: imageUrl,
        height: fullInfo.height,
        weight: fullInfo.weight,
        speed: fullInfo.stats[5].base_stat,
      };
    })
  );
  return fullPokemonsInfo;
}

export async function getModalInfo(name: string): Promise<ModalInfo> {
  const requestModalInfo = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const pokemon: TypeRequestForModal = requestModalInfo.data;
  return {
    experience: pokemon.base_experience,
    attack: pokemon.stats[1].base_stat,
    moves: pokemon.moves.map((move) => move.move.name),
  };
}
