export type MainPokemonInfo = {
  name: string;
  abilities: string[];
  imageUrl: string;
  height: number;
  weight: number;
  speed: number;
};

export type ModalInfo = {
  experience: number | string;
  attack: number | string;
  moves: string[] | string;
};

export type AllPokemonInfo = MainPokemonInfo & Partial<ModalInfo>;
