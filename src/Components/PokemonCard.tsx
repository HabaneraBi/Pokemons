import "../index.css";

export interface IPokemon {
  name: string;
  type: string[];
  height: number;
  weight: number;
  speed: number;
  picture: string;
}

const PokemonCard = (pokemon: IPokemon) => {
  return (
    <div className="w-45 h-70 p-2 text-center border-black border-2 ">
      <div className="mx-auto p-2 w-35 h-35 border-2 border-black">
        <img
          className="w-full h-full"
          src={pokemon.picture}
          alt={pokemon.name}
        />
      </div>
      <div className="mt-2">
        <p>{pokemon.name}</p>
        <p>weight: {pokemon.weight}</p>
        <p>height: {pokemon.height}</p>
        <p>speed: {pokemon.speed}</p>
      </div>
    </div>
  );
};

export { PokemonCard };
