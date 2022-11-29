import axios from "axios";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillPlayCircle, AiFillStop } from "react-icons/ai";
import CustomAudio from "../components/CustomAudio";

const Surah = () => {
  let { nomor } = useParams();

  const [surah, setSurah] = useState();

  const player = useRef(new Array());
  // player.current = surah?.ayahs.map((e, i) => player.current[i] ?? createRef());

  const [playAud, setPlayAud] = useState(false);

  // const handleAudio = () => {
  //   if (!playAud) {
  //     player.current[0].play();
  //     setPlayAud(!playAud);
  //     return;
  //   }
  //   player.current[0].pause();
  //   player.current[0].currentTime = 0;
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

    return () => {};
  }, [nomor]);

  if (!surah) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Tunggu Sebentar...</h1>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-primary md:p-4">
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
        {surah.ayahs.map((item, i) => (
          <div
            className="w-full p-7 bg-light shadow-[0_9px_25px_0_rgba(59,55,55,0.1)] flex flex-col gap-8 rounded-md"
            key={item.number.inSurah}
          >
            {/* {playAud ? (
              <div>
                <audio
                  src={item.audio.alafasy}
                  ref={(element) =>
                    element !== null && player.current.push(element)
                  }
                ></audio>
                <AiFillStop
                  onClick={() => {
                    player.current[i].pause();
                    player.current[i].currentTime = 0;
                    return setPlayAud(!playAud);
                  }}
                />
              </div>
            ) : (
              <div>
                <audio
                  src={item.audio.alafasy}
                  ref={(element) =>
                    element !== null && player.current.push(element)
                  }
                ></audio>
                <AiFillPlayCircle
                  onClick={() => {
                    player.current[i].play();
                    return setPlayAud(!playAud);
                  }}
                />
              </div>
            )} */}

            {/* <div className="w-full">
              <audio
                src={item.audio.alafasy}
                ref={(element) =>
                  element !== null && player.current.push(element)
                }
              ></audio>
              {playAud ? (
                <AiFillStop
                  className="w-5"
                  onClick={() => {
                    player.current[i].pause();
                    player.current[i].currentTime = 0;
                    return setPlayAud(!playAud);
                  }}
                />
              ) : (
                <AiFillPlayCircle
                  className="w-5"
                  onClick={() => {
                    player.current[i].play();
                    return setPlayAud(!playAud);
                  }}
                />
              )}
            </div> */}

            <CustomAudio
              source={item.audio.alafasy}
              refrence={(element) =>
                element !== null && player.current.push(element)
              }
              playerI={player.current[i]}
            />

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
