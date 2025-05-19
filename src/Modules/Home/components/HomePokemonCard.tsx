import { Button } from "../../../Components/Button";
import { Paragraph } from "../../../Components/Paragraph";
import { Heading } from "../../../Components/Heading";
import type { MainPokemonInfo } from "../../../UI/types/types";
import type { FC } from "react";

interface HomePokemonCardProps {
  pokemon: MainPokemonInfo;
  saveCards: MainPokemonInfo[];
  setSaveCards: (arr: MainPokemonInfo[]) => void;
}

const HomePokemonCard: FC<HomePokemonCardProps> = ({
  pokemon,
  saveCards,
  setSaveCards,
}) => {
  const filterForDeleting = (cards: MainPokemonInfo[]) => {
    return cards.filter((saveCard) => {
      if (saveCard.name !== pokemon.name) {
        return saveCard;
      }
    });
  };

  const deleteCardHandler = () => {
    const newSaveCards = filterForDeleting(saveCards);
    setSaveCards(newSaveCards);

    const storageSaveCards = JSON.parse(
      localStorage.getItem("catchPokemonsInfo")!
    ) as MainPokemonInfo[];
    const newStorageSaveCards = filterForDeleting(storageSaveCards);

    if (newStorageSaveCards.length) {
      localStorage.setItem(
        "catchPokemonsInfo",
        JSON.stringify(newStorageSaveCards)
      );
    } else {
      localStorage.removeItem("catchPokemonsInfo");
    }
  };

  return (
    <div
      className="flex flex-col gap-4 w-full p-3 justify-around scale-100 
      transition-transform duration-75 ease-in items-center bg-[#E6E6E6] 
      rounded-2xl hover:scale-102
    sm:grid sm:gap-0 sm:grid-cols-[0.5fr_2fr_0.5fr] sm:justify-between 
    sm:px-6 sm:h-auto
    lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr]"
    >
      <img
        className={`w-40 h-40 max-w-full ${
          pokemon.imageUrl === "src/UI/icons/pikachu.jpg"
            ? "rounded-2xl shadow-md"
            : ""
        }`}
        src={pokemon.imageUrl}
        alt={`image - ${pokemon.name}`}
      />

      <div
        className="flex flex-col items-center gap-4 w-full
      sm:gap-6 sm:justify-center lg:hidden"
      >
        <Heading className="text-2xl">{pokemon.name}</Heading>
        <Paragraph className="w-3/4 px-6">
          {pokemon.abilities?.join(", ")}
        </Paragraph>
        <div
          className="flex justify-around w-full text-center
        sm:justify-evenly"
        >
          <p className="mx-1">Height: {pokemon.height}</p>
          <p className="mx-1">Weight: {pokemon.weight}</p>
          <p className="mx-1">Speed: {pokemon.speed}</p>
        </div>
      </div>

      <div
        className="hidden lg:flex lg:flex-row lg:items-center lg:w-full
      lg:gap-2 lg:justify-normal lg:px-10"
      >
        <Heading className="text-2xl xl:text-3xl 2xl:text-3xl">
          {pokemon.name}
        </Heading>
      </div>

      <div className="hidden lg:flex lg:flex-row lg:justify-center">
        <Paragraph
          className="w-3/4 px-6 lg:text-xl xl:text-2xl
        2xl:text-2xl"
        >
          {pokemon.abilities?.join(", ")}
        </Paragraph>
      </div>

      <div
        className="hidden lg:text-lg lg:flex lg:flex-col lg:w-full lg:p-0 lg:gap-2
        xl:text-xl xl:gap-4
        2xl:text-2xl 2xl:gap-5"
      >
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Speed: {pokemon.speed}</p>
      </div>

      <div
        className="flex w-full px-10 justify-center
      sm:px-0 sm:w-auto lg:justify-end"
      >
        <Button
          className="w-60 p-2 sm:w-30 lg:w-2/3 xl:text-xl 2xl:text-2xl"
          onClick={deleteCardHandler}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export { HomePokemonCard };
