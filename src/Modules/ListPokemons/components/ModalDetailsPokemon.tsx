import { type FC } from "react";
import { Heading } from "../../../Components/heading";
import { Button } from "../../../Components/Button";
interface ModalDetailsPokemonProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

const ModalDetailsPokemon: FC<ModalDetailsPokemonProps> = ({ ref }) => {
  return (
    <dialog
      ref={ref}
      className={`w-125 h-8/10 mx-auto top-20 fixed border rounded-2xl`}
    >
      <div>
        <Heading>Имя</Heading>
        <div>
          <p>Height:</p>
          <p>Weight:</p>
          <p>Speed:</p>
          <p>Experience:</p>
          <p>Attack:</p>
          <p>Abilities:</p>
        </div>
        <p>Moves:</p>
        <div>
          <Button>CATCH POKEMON</Button>
          <Button>BACK</Button>
        </div>
      </div>
    </dialog>
  );
};

export { ModalDetailsPokemon };
