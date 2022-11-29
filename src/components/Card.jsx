import React, { useRef } from "react";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import checkMode from "../utils/checkDarkMode";

const Card = ({ title, nomor, arti, handleCard }) => {
  const [like, setLike] = useState(true);

  const mode = checkMode();

  const nomorRef = useRef(null);

  const handleLike = (e) => {
    setLike(!like);
  };

  return (
    <div
      className={`w-[400px] h-[250px] rounded-[20px] ${
        mode === "dark" ? "bg-[#172343]" : "bg-light"
      } shadow-[0_9px_25px_0_rgba(59,55,55,0.13)] px-[40px] py-[36px] flex flex-col justify-between`}
    >
      <div className="w-full flex justify-between items-center">
        <p
          className={`w-[40px] h-[40px] ${
            mode === "light" ? "bg-primary" : "bg-[#356379]"
          } text-light flex justify-center items-center rounded-full text-[22px] font-[400]`}
          ref={nomorRef}
        >
          {nomor}
        </p>
        {like ? (
          <AiOutlineHeart
            className={`w-[35px] h-[35px] ${
              mode === "dark" ? "text-[#356379]" : "text-primary"
            } cursor-pointer`}
            onClick={handleLike}
          />
        ) : (
          <AiFillHeart
            className={`w-[35px] h-[35px] ${
              mode === "dark" ? "text-[#356379]" : "text-primary"
            } cursor-pointer`}
            onClick={handleLike}
          />
        )}
      </div>
      <div className="flex flex-col">
        <h1
          className={`text-[36px] font-medium leading-[47px] ${
            mode === "light" ? "text-primary" : "text-light"
          } cursor-pointer hover:text-[#227f94]`}
          onClick={() => handleCard(nomorRef)}
        >
          {title}
        </h1>
        <p className="text-[20px] font-[400] leading-[32px] text-lightdark">
          {arti}
        </p>
      </div>
    </div>
  );
};

export default Card;
