import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Archive from "../components/Archive";
import checkMode from "../utils/checkDarkMode";
import { AiFillPlayCircle, AiFillStop, AiFillHome } from "react-icons/ai";
import player, {
  useTrackPlayerProgress,
  usePlaybackTrackChanged,
  usePlaybackState,
} from "react-web-track-player";

const Surah = () => {
  const { position, bufferedPosition, duration } = useTrackPlayerProgress();

  const currentTrack = usePlaybackTrackChanged();

  const playbackState = usePlaybackState();

  const [tracks, setTracks] = useState([]);

  const [lastIndex, setLastIndex] = useState(null);

  const [statusPlay, setStatusPlay] = useState(false);

  const [volumeCust, setVolumeCust] = useState(0.7);

  const [currentPlay, setCurrentPlay] = useState(null);

  const cardRef = useRef([]);

  const [archive, setArchive] = useState([]);

  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    // <!-- Will be updated every time a track change -->
    setCurrentPlay(currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    // <!-- Will be updated every time a playback state change -->
  }, [playbackState]);

  useEffect(() => {
    // <!-- Will be updated every time track position state change -->
    if (position === bufferedPosition && lastIndex !== null) {
      if (lastIndex < tracks.length) {
        handlePlay(lastIndex + 1);
      } else {
        setStatusPlay(false);
      }
    }
  }, [position, bufferedPosition, duration]);

  useEffect(() => {
    // console.log(lastIndex);
    if (lastIndex !== null) {
      if (lastIndex > tracks.length) {
        setLastIndex(null);
        setStatusPlay(false);
        return;
      } else {
        const track = [];
        track.push(tracks[lastIndex - 1]);
        player.add(track);
        player.play(0);
        setStatusPlay(true);
        const top = cardRef.current[lastIndex - 1].offsetTop;

        window.scrollTo({
          top: top - 50,
          behavior: "smooth",
        });
      }
    } else {
      setStatusPlay(false);
      player.reset();
    }
  }, [lastIndex]);

  async function handlePlay(index) {
    // <!-- After adding the tracks to the queue call this function with the track position -->
    setLastIndex(index);
    setStatusPlay(false);

    player.reset();
  }

  function handleReset() {
    setLastIndex(null);
    // player.reset();
  }

  const handleVolume = (e) => {
    setVolumeCust(e.target.value / 100);
    player.setVolume(volumeCust);
    return;
  };

  let { nomor } = useParams();

  const mode = checkMode();

  const [surah, setSurah] = useState();

  useEffect(() => {
    setLastIndex(null);

    player.reset();
    player.destroy();

    player.setupPlayer({
      capabilities: [
        [
          "play",
          async () => {
            await player.play();
          },
        ],
        [
          "pause",
          () => {
            player.pause();
          },
        ],
        [
          "previoustrack",
          async () => {
            await player.skipToPrevious();
          },
        ],
        [
          "nexttrack",
          async () => {
            await player.skipToNext();
          },
        ],
        [
          "stop",
          () => {
            player.reset();
          },
        ],
      ],
    });

    player.setVolume(volumeCust);
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${nomor}`)
      .then((res) => {
        setSurah(res.data);
        // <!-- Add tracks to the queue -->
        res.data.ayahs.forEach((ayah, index) => {
          setTracks((prev) => [
            ...prev,
            {
              id: index + 1,
              url: ayah.audio.alafasy,
              title: ayah.arab,
            },
          ]);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {};
  }, [nomor]);

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${nomor}/ayahs`)
      .then((res) => {
        setAyahs(res.data.map((e) => e.number.inQuran));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [nomor]);

  useEffect(() => {
    let top = cardRef.current[archive.inSurah - 1];
    if (top) {
      top = top.offsetTop;
    }
    window.scrollTo({
      top: top - 50,
      behavior: "smooth",
    });

    const surahStorage = localStorage.getItem("surah");
    if (!surahStorage && archive.length > -1) {
      localStorage.setItem("surah", JSON.stringify(archive));
    } else {
      setArchive(JSON.parse(surahStorage));
    }
  }, [nomor]);

  useEffect(() => {
    localStorage.setItem("surah", JSON.stringify(archive));
    const top = cardRef.current[archive.inSurah - 1]?.offsetTop;
    window.scrollTo({
      top: top - 50,
      behavior: "smooth",
    });
  }, [archive]);

  if (!surah) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1>Tunggu Sebentar...</h1>
      </div>
    );
  }

  const handleArchive = (no) => {
    if (archive === no) {
      setArchive([]);
      localStorage.removeItem("param");
      return;
    }
    localStorage.setItem("param", JSON.stringify(nomor));
    setArchive(no);
  };

  return (
    <main
      className={`w-full min-h-screen flex flex-col items-center ${
        mode === "dark" ? "bg-dark" : "bg-primary"
      }  md:p-4`}
    >
      <h1 className="text-4xl font-semibold text-light">{surah.name}</h1>

      <div className="flex justify-between w-full px-4 my-8">
        {surah.number > 1 ? (
          <a
            href={`/surah/${surah.number - 1}`}
            className={`px-4 py-2 ${
              mode === "dark" ? "bg-primary" : "bg-primary_dark"
            } flex justify-center mr-auto items-center text-light rounded-lg`}
          >
            Sebelumnya
          </a>
        ) : (
          <></>
        )}

        {surah.number < 114 ? (
          <a
            href={`/surah/${surah.number + 1}`}
            className={`px-4 py-2 ml-auto ${
              mode === "dark" ? "bg-primary" : "bg-primary_dark"
            } flex justify-center items-center text-light rounded-lg`}
          >
            Selanjutnya
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex flex-col gap-3 p-6">
        {parseInt(nomor) !== 1 ? (
          <div className="w-full flex justify-center items-center gap-5 p-9 text-light">
            {surah.bismillah ? (
              <div className="w-full flex flex-col items-center gap-3">
                <p className="text-4xl font-arabic">{surah.bismillah.arab} </p>
                <div className="w-50% flex gap-2 items-center self-start">
                  <input
                    type="range"
                    defaultValue={70}
                    min={0}
                    max={100}
                    onChange={handleVolume}
                    className="bg-light rounded-full h-2 appearance-none cursor-pointer "
                  />
                  {volumeCust == 0 ? (
                    <HiVolumeOff
                      className={`${
                        mode === "dark" ? "text-lightdark" : "text-light"
                      } text-3xl cursor-pointer`}
                      onClick={() => {
                        player.setVolume(0.7);
                        return setVolumeCust(0.7);
                      }}
                    />
                  ) : (
                    <HiVolumeUp
                      className={`${
                        mode === "dark" ? "text-lightdark" : "text-light"
                      } text-3xl cursor-pointer`}
                      onClick={() => {
                        player.setVolume(0);
                        return setVolumeCust(0);
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <>
            <div className="w-50% flex gap-2 items-center ">
              <input
                type="range"
                defaultValue={70}
                min={0}
                max={100}
                onChange={handleVolume}
                className="bg-light rounded-full h-2 appearance-none cursor-pointer "
              />
              {volumeCust == 0 ? (
                <HiVolumeOff
                  className={`${
                    mode === "dark" ? "text-lightdark" : "text-light"
                  } text-3xl cursor-pointer`}
                  onClick={() => {
                    player.setVolume(0.7);
                    return setVolumeCust(0.7);
                  }}
                />
              ) : (
                <HiVolumeUp
                  className={`${
                    mode === "dark" ? "text-lightdark" : "text-light"
                  } text-3xl cursor-pointer`}
                  onClick={() => {
                    player.setVolume(0);
                    return setVolumeCust(0);
                  }}
                />
              )}
            </div>
          </>
        )}

        {surah.ayahs.map((item, i) => (
          <div
            ref={(el) => (cardRef.current[i] = el)}
            className={`w-full p-7 ${
              mode === "dark" ? "bg-card_dark" : "bg-light"
            }  shadow-[0_9px_25px_0_rgba(59,55,55,0.1)] flex flex-col gap-8 rounded-md`}
            key={item.number.inSurah}
          >
            <div className="w-full flex justify-between text-primary text-lg font-medium">
              {statusPlay && i + 1 == lastIndex ? (
                <>
                  <AiFillStop
                    className={`${
                      mode === "dark" ? "text-primary_dark" : "text-primary"
                    } text-3xl cursor-pointer`}
                    onClick={() => handleReset()}
                  />
                  {position == 0 || position === duration
                    ? "0% "
                    : " " + Math.round((position / duration) * 100) + "% "}
                  |{" 100%"}
                </>
              ) : (
                <AiFillPlayCircle
                  className={`${
                    mode === "dark" ? "text-primary_dark" : "text-primary"
                  } text-3xl cursor-pointer`}
                  onClick={() => handlePlay(i + 1)}
                />
              )}
              <Archive
                no={item.number}
                handleArchive={handleArchive}
                archive={archive}
                ayahs={ayahs}
                nomor={item.number.inSurah}
              />
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
