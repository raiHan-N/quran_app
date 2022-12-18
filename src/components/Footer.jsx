import React from "react";
import checkMode from "../utils/checkDarkMode";

const Footer = () => {
  const mode = checkMode();

  return (
    <footer
      className={`w-full p-9 flex ${
        mode === "dark" ? " bg-primary_dark" : " bg-primary"
      } text-light justify-center items-center`}
    >
      <p className="text-xl font-medium">
        Develop by{" "}
        <a href="https://github.com/raiHan-N" className="underline">
          Raihan
        </a>
        {"  "}&{"  "}
        <a href="https://github.com/diarjr198" className="underline">
          Diar
        </a>
      </p>
    </footer>
  );
};

export default Footer;
