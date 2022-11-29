import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Surah from "./pages/Surah";
import checkMode from "./utils/checkDarkMode";

function App() {
  checkMode();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/surah/:nomor" element={<Surah />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
