import React, { useState } from "react";
import { AiFillBook, AiOutlineBook } from "react-icons/ai";
import checkMode from "../utils/checkDarkMode";

export default function Archive() {
  const [archive, setArchive] = useState(false);
  const mode = checkMode();

  const handleArchive = () => {
    return setArchive(!archive);
  };
  return (
    <>
      {archive ? (
        <AiFillBook
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-2xl cursor-pointer`}
          onClick={handleArchive}
        />
      ) : (
        <AiOutlineBook
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-2xl cursor-pointer`}
          onClick={handleArchive}
        />
      )}
    </>
  );
}
