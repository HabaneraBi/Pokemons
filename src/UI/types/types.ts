interface MainPokemonInfo {
  name: string;
  abilities: string[];
  imageUrl: string;
  height: number;
  weight: number;
  speed: number;
}

interface ModalInfo {
  experience: number;
  attack: number;
  moves: string[];
}

type AllPokemonInfo = MainPokemonInfo & Partial<ModalInfo>;

export type { MainPokemonInfo, AllPokemonInfo, ModalInfo };
