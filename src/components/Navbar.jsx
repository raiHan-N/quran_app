import React, { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    setDarkmode(localStorage.getItem("mode") === "dark" ? true : false);
  }, []);

  const hanleDarkmode = () => {
    setDarkmode(!darkmode);
    if (darkmode) {
      document.body.classList.remove("dark");
      localStorage.setItem("mode", "light");
      window.location.reload();
      return;
    }
    document.body.classList.add("dark");
    localStorage.setItem("mode", "dark");
    window.location.reload();
  };

  return (
    <nav className={`${darkmode ? "bg-[#356379]" : "bg-primary"}`}>
      <h1 className="text-light font-serif md:text-[45px] text-3xl font-semibold select-none">
        Quran App
      </h1>
      <button
        className="w-[50px] h-[32px] md:w-[80px] md:h-[43px] border-solid border-[3px] border-light rounded-[30px] relative flex items-center"
        onClick={hanleDarkmode}
      >
        {darkmode ? (
          <div className="w-[18px] h-[18px] md:w-[32px] md:h-[32px] bg-light rounded-full absolute right-[3px] flex items-center justify-center ">
            <MdDarkMode className="w-full text-card_dark" />
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
