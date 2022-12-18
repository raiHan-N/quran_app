import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { DataConsumer } from "../utils/DataProvider";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useContext(DataConsumer);
  const [inputText, setInputText] = useState("");

  const handleCard = (nomor) => {
    nomor = nomor.current.textContent;
    navigate(`/surah/${nomor}`);
  };

  const handleSearch = (e) => {
    let lowerCase = e.target.value
      .replace(" ", "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = data.filter((e) => {
    if (inputText === "") {
      return e;
    } else {
      return e.name
        .replace(" ", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .match(inputText);
    }
  });

  return (
    <>
      <Navbar />
      <main className="App px-3 py-16">
        <InfoCard />
        <SearchBar handleSearch={handleSearch} />
        <div className="px-3 flex flex-wrap justify-center gap-[30px]">
          {filteredData
            ? filteredData.map((item) => {
                return (
                  <Card
                    title={item.name}
                    nomor={item.number}
                    arti={item.translation}
                    key={item.number}
                    handleCard={handleCard}
                  />
                );
              })
            : data.map((item) => {
                return (
                  <Card
                    title={item.name}
                    nomor={item.number}
                    arti={item.translation}
                    key={item.number}
                    handleCard={handleCard}
                  />
                );
              })}
        </div>
      </main>
    </>
  );
};

export default Home;
