interface FullPokemonInfo {
  name: string;
  abilities: string[];
  imageUrl: string;
  height: number;
  weight: number;
  speed: number;
}

interface ShortPokemonInfo {
  name: string;
  url: string;
}

export type { FullPokemonInfo, ShortPokemonInfo };
