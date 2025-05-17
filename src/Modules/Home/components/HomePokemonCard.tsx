import { Button } from "../../../Components/Button";
import { Paragraph } from "../../../Components/Paragraph";
import { Heading } from "../../../Components/Heading";
import type { MainPokemonInfo } from "../../../UI/types/types";
import { type FC } from "react";

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
  const deleteCardHandler = () => {
    const newSaveCards = saveCards.filter((saveCard) => {
      if (saveCard.name !== pokemon.name) {
        return saveCard;
      }
    });
    if (newSaveCards.length) {
      localStorage.setItem("catchPokemonsInfo", JSON.stringify(newSaveCards));
    } else {
      localStorage.removeItem("catchPokemonsInfo");
    }
    setSaveCards(newSaveCards);
  };

  return (
    <div
      className="flex flex-col gap-4 w-full h-100 p-3 justify-around scale-100 
      transition-transform duration-75 ease-in items-center bg-[#E6E6E6] 
      rounded-2xl hover:scale-102
    sm:grid sm:gap-0 sm:grid-cols-[0.7fr_1.6fr_0.7fr] sm:justify-between 
    sm:px-6 sm:h-60
    "
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
      sm:gap-2 sm:justify-around sm:h-full lg:flex-row lg:gap-12"
      >
        <Heading className="text-2xl xl:w-60">{pokemon.name}</Heading>
        <Paragraph className="w-3/4 px-6 lg:w-60 2xl:text-xl 2xl:w-70">
          {pokemon.abilities?.join(", ")}
        </Paragraph>
        <div
          className="flex justify-around w-full
        sm:justify-evenly gap-1 lg:flex-col lg:h-full lg:w-1/2"
        >
          <p className="text-center text-[15px] sm:text-lg lg:whitespace-nowrap">
            Height: {pokemon.height}
          </p>
          <p className="text-center text-[15px] sm:text-lg lg:whitespace-nowrap">
            Weight: {pokemon.weight}
          </p>
          <p className="text-center text-[15px] sm:text-lg lg:whitespace-nowrap">
            Speed: {pokemon.speed}
          </p>
        </div>
      </div>
      <div
        className="flex w-full px-10 justify-center
      sm:px-0 sm:w-auto lg:justify-end"
      >
        <Button
          onClick={deleteCardHandler}
          className="w-60 p-2 sm:w-30 lg:w-2/3 xl:text-xl"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export { HomePokemonCard };
