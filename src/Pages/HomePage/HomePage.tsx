import { useEffect, type FC } from "react";
import { HomePokemonCard } from "../../Components/HomePokemonCard";
import "../../index.css";
import type { FullPokemonInfo } from "../../UI/types/types";

interface HomeProps {
  keyStorage: string;
}

const HomePage: FC<HomeProps> = (homeProps: HomeProps) => {
  const cards: FullPokemonInfo[] = getStorageCards(homeProps.keyStorage);

  return (
    <ul
      className="p-8 grid grid-cols-1 gap-6
    lg:px-16
    xl:px-20"
    >
      {cards.map((pokemonInfo, index) => (
        <li className="lg: px-28" key={index}>
          <HomePokemonCard {...pokemonInfo} />
        </li>
      ))}
    </ul>
  );
};

function getStorageCards(key: string): FullPokemonInfo[] {
  const cards = localStorage.getItem(key);
  if (cards) {
    return JSON.parse(cards);
  } else {
    return [];
  }
}

export { HomePage };
