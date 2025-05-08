import { PokemonCard, type IPokemon } from "./PokemonCard";
import "../index.css";

const testers: IPokemon[] = [
  {
    name: "bulbasaur",
    type: ["grass", "poison"],
    height: 7,
    weight: 69,
    speed: 45,
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
  },
  {
    name: "skiploom",
    type: ["grass", "flying"],
    height: 6,
    weight: 10,
    speed: 80,
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/188.svg",
  },
  {
    name: "dragonair",
    type: ["dragon"],
    height: 40,
    weight: 165,
    speed: 70,
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/148.svg",
  },
];

const PokemonCardContainer = () => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 size-fit mx-auto">
      <PokemonCard {...testers[0]} />
      <PokemonCard {...testers[1]} />
      <PokemonCard {...testers[2]} />
    </div>
  );
};

export { PokemonCardContainer };
