import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillPlayCircle, AiFillStop } from "react-icons/ai";

const Surah = () => {
  let { nomor } = useParams();

  // const player = useRef(new Audio());

  const [surah, setSurah] = useState();

  // const [playAud, setPlayAud] = useState(false);

  // const handleAudio = () => {
  //   if (!playAud) {
  //     player.current.play().then((res) => console.log("gg"));
  //     setPlayAud(!playAud);
  //     return;
  //   }
  //   player.current.pause();
  //   player.current.currentTime = 0;
  //   setPlayAud(!playAud);
  // };

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${nomor}`)
      .then((res) => {
        setSurah(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [nomor]);

  if (!surah) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Tunggu Sebentar...</h1>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-primary ">
      <h1 className="text-4xl font-semibold text-light">{surah.name}</h1>
      <div className="flex justify-between w-full px-4 my-3">
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
        {surah.ayahs.map((item) => (
          <div
            className="w-full p-7 bg-light shadow-[0_9px_25px_0_rgba(59,55,55,0.1)] flex flex-col gap-8 rounded-md"
            key={item.number.inSurah}
          >
            {/* {playAud ? (
              <div>
                <audio src={item.audio.alafasy} ref={player}></audio>
                <AiFillStop onClick={handleAudio} />
              </div>
            ) : (
              <div>
                <audio src={item.audio.alafasy} ref={player}></audio>
                <AiFillPlayCircle onClick={handleAudio} />
              </div>
            )} */}

            <audio controls>
              <source src={item.audio.alafasy} />
            </audio>

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
        <AiFillHome className="text-primary" />
      </Link>
    </main>
  );
};

export default Surah;
