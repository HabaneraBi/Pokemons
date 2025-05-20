import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { globalContext } from "../../../App/context";
import loupe from "/src/UI/assets/icons/loupe.svg";

export const SearchBox = () => {
  const context = useContext(globalContext);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      context.setSearchText(inputVal);
    }, 750);

    return () => clearTimeout(timeout);
  }, [inputVal]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value.toLowerCase());
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl py-1.5 px-2 w-60 lg:w-1/3">
      <span className="w-5 h-auto inline-block">
        <img className="w-auto h-auto object-contain" src={loupe} alt="" />
      </span>
      <input
        type="text"
        placeholder="Search pokemon..."
        className="w-full focus:outline-none"
        onChange={handleInputChange}
      />
    </div>
  );
};
