import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import checkMode from "../utils/checkDarkMode";

const SearchBar = ({ handleSearch }) => {
  const mode = checkMode();

  return (
    <div className="flex relative  w-[85%] mx-auto rounded-full shadow-lg items-center mt-12 mb-8">
      <AiOutlineSearch className="text-primary text-[33.04px] absolute left-[48px]" />
      <input
        type="text"
        placeholder="Cari Surah..."
        className={`w-full md:py-[22px] py-[16px] px-[90px] rounded-full  h-full ${
          mode === "dark"
            ? "bg-card_dark text-light"
            : "bg-light text-lightdark"
        } text-[22px]  placeholder:text-inherit `}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
