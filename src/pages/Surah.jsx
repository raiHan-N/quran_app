import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import CustomAudio from "../components/CustomAudio";
import Archive from "../components/Archive";
import checkMode from "../utils/checkDarkMode";

const Surah = () => {
  let { nomor } = useParams();

  const mode = checkMode();

  const [surah, setSurah] = useState();
  console.log(surah);

  const [currentPlay, setCurrentPlay] = useState(null);

  const player = useRef([]);
  console.log(player.current);

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
    <main
      className={`w-full min-h-screen flex flex-col items-center ${
        mode === "dark" ? "bg-dark" : "bg-primary"
      }  md:p-4`}
    >
      <h1 className="text-4xl font-semibold text-light">{surah.name}</h1>
      <div className="flex justify-between w-full px-4 my-8">
        <Link
          to={`/surah/${
            surah.number > 1 ? surah.number - 1 : (surah.number = 1)
          }`}
          className={`px-4 py-2 ${
            mode === "dark" ? "bg-primary" : "bg-primary_dark"
          } flex justify-center items-center text-light rounded-lg`}
        >
          Sebelumnya
        </Link>
        <Link
          to={`/surah/${
            surah.number < 114 ? surah.number + 1 : (surah.number = 114)
          }`}
          className={`px-4 py-2 ${
            mode === "dark" ? "bg-primary" : "bg-primary_dark"
          } flex justify-center items-center text-light rounded-lg`}
        >
          Selanjutnya
        </Link>
      </div>
      <div className="w-full flex flex-col gap-3 p-6">
        {parseInt(nomor) !== 1 ? (
          <div className="w-full flex justify-center items-center gap-5 p-9 text-light">
            {surah.bismillah ? (
              <p className="text-4xl font-arabic">{surah.bismillah.arab} </p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {surah.ayahs.map((item, i) => (
          <div
            className={`w-full p-7 ${
              mode === "dark" ? "bg-card_dark" : "bg-light"
            }  shadow-[0_9px_25px_0_rgba(59,55,55,0.1)] flex flex-col gap-8 rounded-md`}
            key={item.number.inSurah}
          >
            <div className="w-full flex ">
              <CustomAudio
                source={item.audio.alafasy}
                refrence={(element) =>
                  element !== null && element !== undefined
                    ? player.current.push(element)
                    : (player.current = [])
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
              <h3
                className={`px-3 py-1 ${
                  mode === "dark" ? "bg-primary_dark" : "bg-primary"
                }  rounded-full text-light `}
              >
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
        className={`fixed bottom-5 right-2 ${
          mode === "dark" ? "bg-primary" : "bg-light"
        }  p-4 rounded-full shadow-xl`}
      >
        <AiFillHome
          className={` ${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          }  text-lg`}
        />
      </Link>
    </main>
  );
};

export default Surah;
