import { useEffect, useRef, useState, type FC } from "react";
import type { FullPokemonInfo } from "../../../UI/types/types";
import { Heading } from "../../../Components/heading";
import { Paragraph } from "../../../Components/Paragraph";
import { Button } from "../../../Components/Button";
import { createPortal } from "react-dom";
import { ModalDetailsPokemon } from "./ModalDetailsPokemon";
import { getModalInfo } from "../api/getFullPokemons";

const CardPokemon: FC<FullPokemonInfo> = (pokemon) => {
  const [catched, setCatched] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const modalDetails = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (openModalDetails) {
      getModalInfo(pokemon.name).then((data) => console.log(data));
    }
  }, [openModalDetails]);

  const getArrFromStorage = () => {
    const arrCatchPokemonsStorage: null | string =
      localStorage.getItem("catchPokemonsInfo");
    if (arrCatchPokemonsStorage) {
      return JSON.parse(arrCatchPokemonsStorage) as FullPokemonInfo[];
    }
  };
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
    modalDetails.current?.showModal();
    setOpenModalDetails(true);
  }

  function catchPokemonHandler() {
    const arrCatchPokemons = getArrFromStorage();
    if (!catched) {
      if (arrCatchPokemons) {
        localStorage.setItem(
          "catchPokemonsInfo",
          JSON.stringify([...arrCatchPokemons, pokemon])
        );
      } else {
        localStorage.setItem("catchPokemonsInfo", JSON.stringify([pokemon]));
      }
      setCatched(true);
    } else {
      if (arrCatchPokemons) {
        const newStorage: [] | FullPokemonInfo[] = arrCatchPokemons.filter(
          (pokemonStorage) => {
            if (pokemonStorage.name !== pokemon.name) {
              return pokemonStorage;
            }
          }
        );

        if (newStorage.length) {
          localStorage.setItem("catchPokemonsInfo", JSON.stringify(newStorage));
        } else {
          localStorage.removeItem("catchPokemonsInfo");
        }
      }
      setCatched(false);
    }
  }
  return (
    <>
      <div className="flex flex-col w-full py-3 h-100 justify-around scale-100 transition-transform duration-75 ease-in items-center bg-[#E6E6E6] rounded-2xl hover:scale-102">
        {pokemon.imageUrl === "No picture :(" ? (
          <p className="text-xl">No picture :{`(`}</p>
        ) : (
          <img
            className="w-40 h-2/5"
            src={pokemon.imageUrl}
            alt={`image - ${pokemon.name}`}
          />
        )}
        <Heading className="text-2xl text-center">{pokemon.name}</Heading>
        <Paragraph className="w-3/4">{pokemon.abilities?.join(", ")}</Paragraph>
        <div className="flex justify-around w-9/10">
          <p className="text-center">Height: {pokemon.height}</p>
          <p className="text-center">Weight: {pokemon.weight}</p>
          <p className="text-center">Speed: {pokemon.speed}</p>
        </div>
        <div className="flex justify-between w-9/10">
          <Button onClick={catchPokemonHandler} className="p-1 w-9/20 min-h-15">
            {catched ? "REMOVE POKEMON" : "CATCH POKEMON"}
          </Button>
          <Button onClick={openModalHandler} className="p-1 w-9/20 min-h-15">
            MORE DETAILS
          </Button>
        </div>
      </div>

      {openModalDetails &&
        createPortal(<ModalDetailsPokemon ref={modalDetails} />, document.body)}
    </>
  );
};

export { CardPokemon };
