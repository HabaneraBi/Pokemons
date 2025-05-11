import { useEffect, type FC } from "react";
import { HomePokemonCard } from "../../Components/HomePokemonCard";
import type { FullPokemonInfo } from "../../Modules/ListPokemons/types";
import "../../index.css";

//   {
//     name: "bulbasaur",
//     height: 7,
//     weight: 69,
//     speed: 45,
//     abilities: ["grass", "poison"],
//     imageUrl:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
//   },
//   {
//     name: "Cow",
//     height: 150,
//     weight: 200,
//     speed: 30,
//     abilities: ["muuu"],
//     imageUrl:
//       "https://i.pinimg.com/originals/dd/93/e3/dd93e3e54b41b02b91a1f2058777b622.gif",
//   },
//   {
//     name: "Dancer dog",
//     height: 30,
//     weight: 20,
//     speed: 35,
//     abilities: ["dance"],
//     imageUrl:
//       "https://i.pinimg.com/originals/01/d9/a4/01d9a44af5aa852624b87f8f280f4942.gif",
//   },
//   {
//     name: "Dancer cat",
//     height: 35,
//     weight: 5,
//     speed: 60,
//     abilities: ["dance"],
//     imageUrl:
//       "https://i.pinimg.com/originals/48/c9/52/48c9522aaa31a27582216bec737e92ce.gif",
//   },
//   {
//     name: "Questioning cat",
//     height: 40,
//     weight: 10,
//     speed: 50,
//     abilities: ["question"],
//     imageUrl:
//       "https://media1.giphy.com/media/wTpkLqAZf3NFcgzQ4J/200w.gif?cid=6c09b952vwge23e9uo88dn678vdx79zmu2mq2z4liab2qtxk&ep=v1_stickers_search&rid=200w.gif&ct=s",
//   },
// ];

interface HomeProps {
  keyStorage: string;
}

const Home: FC<HomeProps> = (homeProps: HomeProps) => {
  const cards: FullPokemonInfo[] = getStorageCards(homeProps.keyStorage);

  return (
    <ul
      className="p-8 grid grid-cols-1 gap-6
    lg:px-16
    xl:px-20"
    >
      {cards.map((pokemonInfo, index) => (
        <li key={index}>
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

export { Home };
