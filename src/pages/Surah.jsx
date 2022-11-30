import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import CustomAudio from "../components/CustomAudio";
import Archive from "../components/Archive";

const Surah = () => {
  let { nomor } = useParams();

  const [surah, setSurah] = useState();

  const [currentPlay, setCurrentPlay] = useState(null);

  const player = useRef(new Array());

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${nomor}`)
      .then((res) => {
        setSurah(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {};
  }, [nomor]);

  if (!surah) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Tunggu Sebentar...</h1>
      </div>
    );
  }

  const handlePlay = (e, index) => {
    setCurrentPlay(e.target.src.toString());

    if (currentPlay !== null && currentPlay !== undefined) {
      if (currentPlay !== e.target.src.toString()) {
        player.current.forEach((aud) => {
          aud.pause();
          aud.currentTime = 0;
        });

        player.current[index].play();
      }
    }
  };

  const autoPlayNext = (e, index) => {
    if (index < surah.ayahs.length - 1) {
      player.current[index + 1].play();
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-primary md:p-4">
      <h1 className="text-4xl font-semibold text-light">{surah.name}</h1>
      <div className="flex justify-between w-full px-4 my-8">
        <Link
          to={`/surah/${
            surah.number > 1 ? surah.number - 1 : (surah.number = 1)
          }`}
          className="px-4 py-2 bg-cyan-800 flex justify-center items-center text-light rounded-lg"
        >
          Sebelumnya
        </Link>
        <Link
          to={`/surah/${
            surah.number < 114 ? surah.number + 1 : (surah.number = 114)
          }`}
          className="px-4 py-2 bg-cyan-800 flex justify-center items-center text-light rounded-lg"
        >
          Selanjutnya
        </Link>
      </div>
      <div className="w-full flex flex-col gap-3 p-6">
        {surah.ayahs.map((item, i) => (
          <div
            className="w-full p-7 bg-light shadow-[0_9px_25px_0_rgba(59,55,55,0.1)] flex flex-col gap-8 rounded-md"
            key={item.number.inSurah}
          >
            <div className="w-full flex ">
              <CustomAudio
                source={item.audio.alafasy}
                refrence={(element) =>
                  element !== null && player.current.push(element)
                }
                playerI={player.current[i]}
                handlePlay={handlePlay}
                autoPlayNext={autoPlayNext}
                index={i}
              />
              <Archive />
            </div>

            <div className="w-full flex justify-end items-center gap-5">
              <p className="text-3xl font-arabic">{item.arab}</p>
              <h3 className="px-3 py-1 bg-primary rounded-full text-light ">
                {item.number.inSurah}
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              <p>{item.translation}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={"/"}
        className="fixed bottom-5 right-2 bg-light p-4 rounded-full shadow-xl"
      >
        <AiFillHome className="text-primary text-lg" />
      </Link>
    </main>
  );
};

export default Surah;
