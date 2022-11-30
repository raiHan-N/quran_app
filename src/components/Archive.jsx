import React, { useState } from "react";
import { AiFillBook, AiOutlineBook } from "react-icons/ai";

export default function Archive() {
  const [archive, setArchive] = useState(false);
  const handleArchive = () => {
    return setArchive(!archive);
  };
  return (
    <>
      {archive ? (
        <AiFillBook
          className="text-primary text-2xl cursor-pointer"
          onClick={handleArchive}
        />
      ) : (
        <AiOutlineBook
          className="text-primary text-2xl cursor-pointer"
          onClick={handleArchive}
        />
      )}
    </>
  );
}
