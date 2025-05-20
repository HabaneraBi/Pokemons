import type { MainPokemonInfo } from "../../../UI/types/types";
import type { Dispatch, SetStateAction } from "react";

export type ModalDetailsPokemonProps = {
  setOpenModalDetails: Dispatch<SetStateAction<boolean>>;
  openModalDetails: boolean;
  pokemonInfo: MainPokemonInfo;
  catched: boolean;
  setCatched: Dispatch<SetStateAction<boolean>>;
};
