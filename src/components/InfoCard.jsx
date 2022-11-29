import React from "react";
import checkMode from "../utils/checkDarkMode";

const InfoCard = () => {
  const mode = checkMode();

  return (
    <div
      className={`w-full md:w-[45%] h-[200px] bg-gradient-to-br ${
        mode == "dark"
          ? "from-[#1D3D4D] to-[#172343]"
          : "from-[#60BFEC] to-[#547CE2]"
      } mx-auto rounded-[20px]  mb-7  px-7 py-7 md:py-[60px] md:px-[60px]  flex items-center`}
    >
      <div className="flex-1">
        <h1 className="text-[26px] md:text-[42px] font-[600] leading-[55px]  text-light">
          Terakhir Baca
        </h1>
        <p className="text-[16px] md:text-[22px] font-normal leading-7 text-light">
          Surah : Al Fatihah &nbsp; Ayat : 10
        </p>
      </div>
      <button
        className={`${
          mode === "light" ? "bg-primary" : "bg-[#356379]"
        } text-light flex justify-center items-center font-normal text-[16px] md:text-[28px] leading-9 rounded-[20px] px-5 py-3`}
      >
        Lihat
      </button>
    </div>
  );
};

export default InfoCard;
