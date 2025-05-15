import "../../../../index.css";

const SearchBox = () => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-2xl py-1.5 px-2">
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
        className=" focus:outline-none"
      />
    </div>
  );
};

export { SearchBox };
