import React, { useContext, useEffect, useState } from "react";
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
  const [likedData, setLikedData] = useState([]);

  useEffect(() => {
    const likeSave = localStorage.getItem("liked");
    if (!likeSave) {
      localStorage.setItem("liked", JSON.stringify(likedData));
    } else {
      setLikedData(JSON.parse(likeSave));
    }
  }, []);

  useEffect(() => {
    console.log(likedData);
    localStorage.setItem("liked", JSON.stringify(likedData));
    console.log(localStorage.getItem("liked"));
  }, [likedData]);

  const handleLikeData = (likeIndex) => {
    if (likedData.includes(likeIndex)) {
      setLikedData(likedData.filter((e) => e !== likeIndex));
      return;
    }
    setLikedData((prev) => [...likedData, likeIndex]);
  };

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

  const getLikedList = () => {
    let datas = [];
    data.filter((el, index) => {
      if (!likedData.includes(el.number)) {
        datas.push(el);
      }
    });
    // datas.unshift(likedData);
    likedData.map((el) => {
      datas.unshift(data[el - 1]);
    });
    return datas;
    // return filteredData;
  };

  const filteredData =
    likedData.length > 0
      ? getLikedList()
      : data.filter((e) => {
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
          {filteredData.length > 0
            ? filteredData.map((item, i) => {
                return (
                  <Card
                    title={item?.name}
                    nomor={item?.number}
                    arti={item?.translation}
                    key={i}
                    handleCard={handleCard}
                    likedData={handleLikeData}
                    likeIndex={i}
                    like={likedData}
                  />
                );
              })
            : data.map((item, i) => {
                return (
                  <Card
                    title={item?.name}
                    nomor={item?.number}
                    arti={item?.translation}
                    key={i}
                    handleCard={handleCard}
                    likedData={handleLikeData}
                    likeIndex={i}
                    like={likedData}
                  />
                );
              })}
        </div>
      </main>
    </>
  );
};

export default Home;
