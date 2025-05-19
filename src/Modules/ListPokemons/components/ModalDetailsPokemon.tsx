import { type FC, useEffect, useState, useRef } from "react";
import { Heading } from "../../../Components/Heading";
import { Button } from "../../../Components/Button";
import type { Dispatch, SetStateAction } from "react";
import { getModalInfo } from "../api/getFullPokemons";
import type { AllPokemonInfo, MainPokemonInfo } from "../../../UI/types/types";
import { catchPokemonHandler } from "../functions/functions";

interface ModalDetailsPokemonProps {
  setOpenModalDetails: Dispatch<SetStateAction<boolean>>;
  openModalDetails: boolean;
  pokemonInfo: MainPokemonInfo;
  catched: boolean;
  setCatched: (catched: boolean) => void;
}

const ModalDetailsPokemon: FC<ModalDetailsPokemonProps> = ({
  setOpenModalDetails,
  openModalDetails,
  pokemonInfo,
  catched,
  setCatched,
}) => {
  const [modalInfo, setModalInfo] = useState<AllPokemonInfo>(pokemonInfo);

  useEffect(() => {
    if (openModalDetails) {
      getModalInfo(pokemonInfo.name).then((info) =>
        setModalInfo({ ...pokemonInfo, ...info })
      );
    }
  }, [openModalDetails]);

  const modalDetails = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModalDetails) {
      modalDetails.current?.showModal();
    }
  }, [openModalDetails]);

  const onKeyHandler: React.KeyboardEventHandler = (e) => {
    if (e.key === "Escape") {
      setOpenModalDetails(false);
    }
  };

  return (
    <dialog
      onKeyDown={onKeyHandler}
      ref={modalDetails}
      className={`w-17/20 p-5 h-8/10 mx-auto top-30 fixed rounded-2xl flex justify-center 2xl:w-4/5`}
    >
      <div className="size-full flex flex-col justify-between items-center gap-2 xl:flex-row xl:gap-10">
        <img
          className={`w-50 h-75 self-center sm:size-70 xl:size-74 ${
            pokemonInfo.imageUrl === "/src/UI/icons/pikachu.jpg"
              ? "rounded-2xl shadow-md"
              : ""
          }`}
          src={modalInfo.imageUrl}
        />
        <div className="flex flex-col items-center justify-evenly w-full xl:h-full">
          <Heading className="mt-2 text-2xl xl:text-4xl">
            {modalInfo.name}
          </Heading>
          <div className="mt-4 grid grid-cols-1 w-full gap-1 justify-items-center md:grid-cols-3 md:grid-rows-2 md:w-3/4">
            <p className="text-base md:text-lg">Height: {modalInfo.height}</p>
            <p className="text-base md:text-lg">Weight: {modalInfo.weight}</p>
            <p className="text-base md:text-lg">Speed: {modalInfo.speed}</p>
            <p className="text-base md:text-lg">
              Experience: {modalInfo.experience}
            </p>
            <p className="text-base md:text-lg">Attack: {modalInfo.attack}</p>
            <p className="text-base md:text-lg">
              Abilities: {modalInfo.abilities.join(", ")}
            </p>
          </div>
          <p className="text-lg mt-4 w-full text-center">
            Moves: {modalInfo.moves?.join(", ")}
          </p>

          <div className="flex w-full justify-around mt-4 mb-4 md:mt-8">
            <Button
              onClick={() =>
                catchPokemonHandler(catched, pokemonInfo, setCatched)
              }
              className="min-h-12 w-23 sm:w-35"
            >
              {catched ? "REMOVE POKEMON" : "CATCH POKEMON"}
            </Button>
            <Button
              className="min-h-12 w-23 sm:w-35"
              onClick={() => setOpenModalDetails(false)}
            >
              BACK
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export { ModalDetailsPokemon };
