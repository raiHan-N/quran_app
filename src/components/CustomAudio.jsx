import React, { useState } from "react";
import { AiFillPlayCircle, AiFillStop } from "react-icons/ai";
import { useParams } from "react-router-dom";
import checkMode from "../utils/checkDarkMode";

export default function CustomAudio({
  source,
  refrence,
  playerI,
  handlePlay,
  autoPlayNext,
  index,
}) {
  const [playAud, setPlayAud] = useState(false);

  const mode = checkMode();

  const stopAudFunc = () => {
    playerI.pause();
    playerI.currentTime = 0;
    return setPlayAud(false);
  };

  const playAudFunc = (e) => {
    playerI.play();
    return setPlayAud(true);
  };

  const handlePlayFunc = (e, index) => {
    handlePlay(e, index);
    return setPlayAud(true);
  };

  return (
    <div className="w-full">
      <audio
        src={source}
        ref={refrence}
        onPlay={(e) => handlePlayFunc(e, index)}
        onEnded={(e) => {
          setPlayAud(false);
          autoPlayNext(e, index);
        }}
        onPause={() => setPlayAud(false)}
      ></audio>
      {playAud ? (
        <AiFillStop
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-3xl cursor-pointer`}
          onClick={stopAudFunc}
        />
      ) : (
        <AiFillPlayCircle
          className={`${
            mode === "dark" ? "text-primary_dark" : "text-primary"
          } text-3xl cursor-pointer`}
          onClick={playAudFunc}
        />
      )}
    </div>
  );
}
