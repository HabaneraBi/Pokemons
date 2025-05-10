import type { FC } from "react";
import { HomePokemonCard } from "./Components/HomePokemonCard";
import type { FullPokemonInfo } from "../../Modules/ListPokemons/types";

const tester1: FullPokemonInfo = {
  name: "bulbasaur",
  height: 7,
  weight: 69,
  speed: 45,
  abilities: ["grass", "poison"],
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
};

const tester2: FullPokemonInfo = {
  name: "Cow",
  height: 150,
  weight: 200,
  speed: 30,
  abilities: ["muuu"],
  imageUrl:
    "https://i.pinimg.com/originals/dd/93/e3/dd93e3e54b41b02b91a1f2058777b622.gif",
};

const Home: FC = () => {
  return (
    <div>
      <HomePokemonCard {...tester1} />
      <HomePokemonCard {...tester2} />
    </div>
  );
};

export { Home };
