import React from "react";
import { AiFillBook, AiOutlineBook } from "react-icons/ai";
import checkMode from "../utils/checkDarkMode";

export default function Archive({ no, handleArchive, archive, ayahs, nomor }) {
  const mode = checkMode();

  return (
    <>
      {ayahs.includes(archive.inQuran) && archive.inSurah == nomor ? (
        <AiFillBook
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-2xl cursor-pointer`}
          onClick={() => {
            handleArchive(no);
          }}
        />
      ) : (
        <AiOutlineBook
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-2xl cursor-pointer`}
          onClick={() => {
            handleArchive(no);
          }}
        />
      )}
    </>
  );
}
