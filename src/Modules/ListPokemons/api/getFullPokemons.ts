import axios from "axios";
import type { MainPokemonInfo, ModalInfo } from "../../../UI/types/types";
import type { PokemonName } from "../../../App/types";
import pikachu from "/src/UI/assets/icons/pikachu.jpg";

type TypeRequestForMainInfo = {
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
};

type TypeRequestForModal = {
  base_experience: number;
  stats: { base_stat: number }[];
  moves: { move: { name: string } }[];
};

export async function getCountAllPokemons(): Promise<number> {
  try {
    const responseCount = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    return responseCount.data.count as number;
  } catch (e) {
    console.error("Error get count pokemons from api:", e);
    return 1302;
  }
}

export async function getAllPokemonsNames(): Promise<PokemonName[]> {
  try {
    const count = await getCountAllPokemons();
    const responseAllNames = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${count}`
    );
    return responseAllNames.data.results;
  } catch (e) {
    console.error("Error get all pokemons name and url:", e);
    return [];
  }
}

async function getShortPokemonsInfo(offset: number): Promise<PokemonName[]> {
  try {
    const requestShort = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    return requestShort.data.results;
  } catch (e) {
    console.error("Error get all pokemons name and url:", e);
    return [];
  }
}

export async function getFullForFilterInfo(shortPokemonsInfo: PokemonName[]) {
  return getFullPokemonsInfo(shortPokemonsInfo);
}

async function getFullPokemonsInfo(arr: PokemonName[]) {
  try {
    const fullPokemonsInfo: MainPokemonInfo[] = await Promise.all(
      arr.map(async (pokemon) => {
        const requsetForFullInfo = await axios.get(pokemon.url);
        const fullInfo: TypeRequestForMainInfo = requsetForFullInfo.data;

        const imageUrl =
          fullInfo.sprites.other.dream_world.front_default ??
          fullInfo.sprites.front_default ??
          fullInfo.sprites.other.home.front_default ??
          pikachu;

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
  } catch (e) {
    console.error("Error loading cards:", e);
    return [];
  }
}

export async function getFullPackageInfo(
  offset: number
): Promise<MainPokemonInfo[]> {
  try {
    const shortPokemonsInfo = await getShortPokemonsInfo(offset);
    return getFullPokemonsInfo(shortPokemonsInfo);
  } catch (e) {
    console.error("Error loading package cards:", e);
    return [];
  }
}

export async function getModalInfo(name: string): Promise<ModalInfo> {
  try {
    const requestModalInfo = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon: TypeRequestForModal = requestModalInfo.data;
    return {
      experience: pokemon.base_experience,
      attack: pokemon.stats[1].base_stat,
      moves: pokemon.moves.map((move) => move.move.name),
    };
  } catch (e) {
    console.error("Error loading modal info:", e);
    return {
      experience: "is unknown :(",
      attack: "is unknown :(",
      moves: "is unknown :(",
    };
  }
}
