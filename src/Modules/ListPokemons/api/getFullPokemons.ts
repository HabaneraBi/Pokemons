import axios from "axios";
import type { FullPokemonInfo } from "../../../UI/types/types";

interface TypeForFullInfo {
  types: { type: { name: string } }[];
  sprites: { other: { dream_world: { front_default: string } } };
  height: number;
  weight: number;
  stats: { base_stat: number }[];
}

interface ShortPokemonInfo {
  name: string;
  url: string;
}

async function getShortPokemonsInfo(): Promise<ShortPokemonInfo[]> {
  const requestShort = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return requestShort.data.results;
}

export async function getFullPokemonsInfo(): Promise<FullPokemonInfo[]> {
  const shortPokemonsInfo = await getShortPokemonsInfo();

  const fullPokemonsInfo: FullPokemonInfo[] = await Promise.all(
    shortPokemonsInfo.map(async (pokemon) => {
      const requsetForFullInfo = await axios.get(pokemon.url);
      const fullInfo: TypeForFullInfo = requsetForFullInfo.data;

      return {
        name: pokemon.name,
        abilities: fullInfo.types.map((type) => type.type.name),
        imageUrl: fullInfo.sprites.other.dream_world.front_default,
        height: fullInfo.height,
        weight: fullInfo.weight,
        speed: fullInfo.stats[5].base_stat,
      };
    })
  );
  return fullPokemonsInfo;
}

// export async function getAllPokemons() {
//   try {
//     let pokemonsInfo: PokemonInfo[] = [];

//     const requestCommon = await axios.get("https://pokeapi.co/api/v2/pokemon");
//     const commonDataPokemons: PokemonInfo[] = requestCommon.data.results;

//     const allDataPokemons: PokemonInfo[] = await Promise.all(
//       commonDataPokemons.map(async (pokemon) => {
//         try {
//           const requestOther = await axios.get(pokemon.url);
//           const otherData = requestOther.data;
//           const forMap: string[] = otherData.types.map((type: typeAbil) => {
//             return type.type.name;
//           });

//           const otherDataProps: {
//             abilities: string[];
//             imageUrl: string;
//             height: number;
//             weight: number;
//             speed: number;
//           } = {
//             abilities: forMap,
//             imageUrl: otherData.sprites.other.dream_world.front_default,
//             height: otherData.height,
//             weight: otherData.weight,
//             speed: otherData.stats[5].base_stat,
//           };

//           return {
//             ...pokemon,
//             ...otherDataProps,
//           };
//         } catch (e) {
//           console.log(`Error with - ${pokemon.name} - ${e}`);
//           return Promise.reject();
//         }
//       })
//     );
//     pokemonsInfo = [...allDataPokemons];
//     return pokemonsInfo;
//   } catch (e) {
//     console.log(e);

//   }
// }
