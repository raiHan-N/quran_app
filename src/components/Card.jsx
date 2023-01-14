import React, { useRef } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import checkMode from "../utils/checkDarkMode";

const Card = ({ title, nomor, arti, handleCard, likedData, like }) => {
  const mode = checkMode();

  const nomorRef = useRef(null);

  const handleLike = () => {
    likedData(nomor);
    return;
  };

  return (
    <div
      className={`w-[400px] h-[250px] rounded-[20px] ${
        mode === "dark" ? "bg-card_dark" : "bg-light"
      } shadow-[0_9px_25px_0_rgba(59,55,55,0.13)] px-[40px] py-[36px] flex flex-col justify-between`}
    >
      <div className="w-full flex justify-between items-center">
        <p
          className={`w-[40px] h-[40px] ${
            mode === "light" ? "bg-primary" : "bg-primary_dark"
          } text-light flex justify-center items-center rounded-full text-[22px] font-[400]`}
          ref={nomorRef}
        >
          {nomor}
        </p>
        {like.includes(nomor) ? (
          <AiFillHeart
            className={`w-[35px] h-[35px] ${
              mode === "dark" ? "text-primary_dark" : "text-primary"
            } cursor-pointer`}
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart
            className={`w-[35px] h-[35px] ${
              mode === "dark" ? "text-primary_dark" : "text-primary"
            } cursor-pointer`}
            onClick={handleLike}
          />
        )}
      </div>
      <div className="flex justify-between">
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
    </div>
  );
};

export default Card;
