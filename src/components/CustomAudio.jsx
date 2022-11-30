import React, { useState, useEffect } from "react";
import { AiFillPlayCircle, AiFillStop } from "react-icons/ai";

export default function CustomAudio({
  source,
  refrence,
  playerI,
  handlePlay,
  autoPlayNext,
  index,
}) {
  const [playAud, setPlayAud] = useState(false);

  const stopAudFunc = () => {
    playerI.pause();
    playerI.currentTime = 0;
    return setPlayAud(false);
  };

  const playAudFunc = (e) => {
    console.log(e.target.id);
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
        <AiFillStop className="text-primary text-3xl" onClick={stopAudFunc} />
      ) : (
        <AiFillPlayCircle
          className="text-primary text-3xl"
          onClick={playAudFunc}
        />
      )}
    </div>
  );
}
