import { type FC, useEffect, useRef } from "react";
import { Heading } from "../../../Components/heading";
import { Button } from "../../../Components/Button";
import type { Dispatch, SetStateAction } from "react";

interface ModalDetailsPokemonProps {
  setOpenModalDetails: Dispatch<SetStateAction<boolean>>;
  openModalDetails: boolean;
}

const ModalDetailsPokemon: FC<ModalDetailsPokemonProps> = ({
  setOpenModalDetails,
  openModalDetails,
}) => {
  const modalDetails = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModalDetails) {
      modalDetails.current?.showModal();
    }
  }, [openModalDetails]);

  return (
    <dialog
      ref={modalDetails}
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
          <Button onClick={() => setOpenModalDetails(false)}>BACK</Button>
        </div>
      </div>
    </dialog>
  );
};

export { ModalDetailsPokemon };
