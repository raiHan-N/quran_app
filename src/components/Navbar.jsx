import React, { useState } from "react";

const Navbar = () => {
  const [darkmode, setDarkmode] = useState(false);

  const hanleDarkmode = () => {
    setDarkmode(!darkmode);
  };

  return (
    <nav>
      <h1 className="text-light font-serif md:text-[45px] text-3xl font-semibold select-none">
        Quran App
      </h1>
      <button
        className="w-[50px] h-[32px] md:w-[80px] md:h-[43px] border-solid border-[3px] border-light rounded-[30px] relative flex items-center "
        onClick={hanleDarkmode}
      >
        {darkmode ? (
          <div className="w-[18px] h-[18px] md:w-[32px] md:h-[32px] bg-light rounded-full absolute right-[3px] flex items-center justify-center ">
            <img src="/assets/light_mode.svg" alt="light mode icons" />
          </div>
        ) : (
          <div className="w-[18px] h-[18px] md:w-[32px] md:h-[32px] bg-light rounded-full absolute left-[3px] flex items-center justify-center">
            <img src="/assets/light_mode.svg" alt="light mode icons" />
          </div>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
