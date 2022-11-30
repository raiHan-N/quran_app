import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://quran-api-id.vercel.app/surahs")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCard = (nomor) => {
    nomor = nomor.current.textContent;
    navigate(`/surah/${nomor}`);
  };

  return (
    <>
      <Navbar />
      <main className="App px-3 py-16">
        <InfoCard />

        <div className="px-3 flex flex-wrap justify-center gap-[30px]">
          {data.map((item) => {
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
