import { useContext, type ChangeEvent } from "react";
import { globalContext } from "../../../App/App";

const SearchBox = () => {
  const context = useContext(globalContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      context.setSearchText(event.target.value);
    }, 750);
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl py-1.5 px-2 w-60 lg:w-1/3">
      <span className="w-5 h-auto inline-block">
        <img
          className="w-auto h-auto object-contain"
          src="src\UI\icons\loupe.svg"
          alt=""
        />
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

export { SearchBox };
