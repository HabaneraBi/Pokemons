import { useEffect, useState, memo, type FC } from "react";
import type { MainPokemonInfo } from "../../../UI/types/types";
import { Heading } from "../../../Components/Heading";
import { Paragraph } from "../../../Components/Paragraph";
import { Button } from "../../../Components/Button";
import { createPortal } from "react-dom";
import { ModalDetailsPokemon } from "./ModalDetailsPokemon";
import { getArrFromStorage, catchPokemonHandler } from "../functions/functions";

const CardPokemon: FC<MainPokemonInfo> = memo((pokemon) => {
  const [catched, setCatched] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);

  useEffect(() => {
    const arrCatchPokemons = getArrFromStorage();
    if (arrCatchPokemons) {
      setCatched(
        arrCatchPokemons.some(
          (pokemonStorage) => pokemonStorage.name === pokemon.name
        )
      );
    }
  }, []);

  function openModalHandler() {
    setOpenModalDetails(true);
  }

  return (
    <>
      <div className="flex flex-col w-full py-3 h-100 justify-around scale-100 transition-transform duration-75 ease-in items-center bg-[#E6E6E6] rounded-2xl hover:scale-102">
        <img
          className={`${
            pokemon.imageUrl === "src/UI/icons/pikachu.jpg"
              ? "w-30 h-3/10 rounded-2xl shadow-md"
              : "w-40 h-2/5"
          }`}
          src={pokemon.imageUrl}
          alt={`image - ${pokemon.name}`}
        />
        {pokemon.imageUrl === "src/UI/icons/pikachu.jpg" ? (
          <p className="text-xl">No picture :{`(`}</p>
        ) : null}

        <Heading className="text-2xl text-center">{pokemon.name}</Heading>
        <Paragraph className="w-3/4">{pokemon.abilities?.join(", ")}</Paragraph>
        <div className="flex justify-around w-9/10">
          <p className="text-center">Height: {pokemon.height}</p>
          <p className="text-center">Weight: {pokemon.weight}</p>
          <p className="text-center">Speed: {pokemon.speed}</p>
        </div>
        <div className="flex justify-between w-9/10">
          <Button
            onClick={() => catchPokemonHandler(catched, pokemon, setCatched)}
            className="p-1 w-9/20 min-h-15"
          >
            {catched ? "REMOVE POKEMON" : "CATCH POKEMON"}
          </Button>
          <Button onClick={openModalHandler} className="p-1 w-9/20 min-h-15">
            MORE DETAILS
          </Button>
        </div>
      </div>

      {openModalDetails
        ? createPortal(
            <ModalDetailsPokemon
              pokemonInfo={pokemon}
              setOpenModalDetails={setOpenModalDetails}
              openModalDetails={openModalDetails}
              catched={catched}
              setCatched={setCatched}
            />,
            document.body
          )
        : null}
    </>
  );
});

export { CardPokemon };
